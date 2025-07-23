// Global variables
let currentUser = null;
let chatChannel = null;
let messageListener = null;

// Calculator functionality
function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display.value === '0') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '0';
}

function deleteLast() {
    const display = document.getElementById('display');
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculate() {
    const display = document.getElementById('display');
    const expression = display.value;
    
    // Check for secret codes
    if (expression === '80085') {
        enterChat('user1', 'Your Secret Chat');
        return;
    } else if (expression === '1234') {
        enterChat('user2', 'Your Secret Chat');
        return;
    }
    
    try {
        // Replace × with * for calculation
        const sanitizedExpression = expression.replace(/×/g, '*');
        
        // Basic validation to prevent code injection
        if (/^[0-9+\-*/.() ]+$/.test(sanitizedExpression)) {
            const result = Function('"use strict"; return (' + sanitizedExpression + ')')();
            display.value = result.toString();
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Tab visibility detection for stealth mode
document.addEventListener('visibilitychange', function() {
    if (document.hidden && currentUser) {
        exitChat();
    }
});

// Window focus/blur detection as backup
window.addEventListener('blur', function() {
    if (currentUser) {
        setTimeout(() => {
            if (!document.hasFocus()) {
                exitChat();
            }
        }, 100);
    }
});

// Chat functionality
function enterChat(userId, title) {
    currentUser = userId;
    chatChannel = 'secret_chat';
    
    document.getElementById('calculator-mode').classList.remove('active');
    document.getElementById('chat-mode').classList.add('active');
    document.getElementById('chat-title').textContent = title;
    
    // Clear calculator display
    clearDisplay();
    
    // Initialize chat
    loadMessages();
    
    // Focus on message input
    document.getElementById('message-text').focus();
}

function exitChat() {
    // Clean up chat listener
    if (messageListener && window.firebase) {
        messageListener();
        messageListener = null;
    }
    
    currentUser = null;
    chatChannel = null;
    
    document.getElementById('chat-mode').classList.remove('active');
    document.getElementById('calculator-mode').classList.add('active');
    
    // Clear message input
    document.getElementById('message-text').value = '';
}

function loadMessages() {
    if (!window.firebase || !window.database) {
        document.getElementById('messages').innerHTML = 
            '<div class="empty-state">Firebase not connected. Please check your configuration.</div>';
        return;
    }
    
    const messagesRef = window.firebase.ref(window.database, `chats/${chatChannel}/messages`);
    
    // Remove existing listener if any
    if (messageListener) {
        messageListener();
    }
    
    messageListener = window.firebase.onValue(messagesRef, (snapshot) => {
        const messages = snapshot.val();
        displayMessages(messages);
    }, (error) => {
        console.error('Error loading messages:', error);
        document.getElementById('messages').innerHTML = 
            '<div class="empty-state">Error loading messages. Please check your connection.</div>';
    });
}

function displayMessages(messages) {
    const messagesContainer = document.getElementById('messages');
    
    if (!messages) {
        messagesContainer.innerHTML = '<div class="empty-state">No messages yet. Start the conversation!</div>';
        return;
    }
    
    const messageArray = Object.entries(messages).map(([key, message]) => ({
        id: key,
        ...message
    }));
    
    // Sort by timestamp
    messageArray.sort((a, b) => a.timestamp - b.timestamp);
    
    messagesContainer.innerHTML = '';
    
    messageArray.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.userId === currentUser ? 'sent' : 'received'}`;
        
        const messageTime = new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageDiv.innerHTML = `
            <div class="message-bubble">${escapeHtml(message.text)}</div>
            <div class="message-time">${messageTime}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    if (!window.firebase || !window.database || !currentUser) {
        alert('Chat not available. Please check your connection.');
        return;
    }
    
    const messageInput = document.getElementById('message-text');
    const messageText = messageInput.value.trim();
    
    if (!messageText) return;
    
    // Disable send button temporarily
    const sendBtn = document.getElementById('send-btn');
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<div class="loading"></div>';
    
    const messagesRef = window.firebase.ref(window.database, `chats/${chatChannel}/messages`);
    
    const newMessage = {
        text: messageText,
        userId: currentUser,
        timestamp: Date.now()
    };
    
    window.firebase.push(messagesRef, newMessage)
        .then(() => {
            messageInput.value = '';
            messageInput.focus();
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        })
        .finally(() => {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send';
        });
}

function clearAllChats() {
    if (!window.firebase || !window.database) {
        alert('Chat not available. Please check your connection.');
        return;
    }
    
    if (!confirm('Are you sure you want to delete ALL chat history? This cannot be undone!')) {
        return;
    }
    
    const chatRef = window.firebase.ref(window.database, `chats/${chatChannel}`);
    
    window.firebase.remove(chatRef)
        .then(() => {
            console.log('All messages cleared successfully');
            // Messages will automatically update due to the listener
        })
        .catch((error) => {
            console.error('Error clearing messages:', error);
            alert('Failed to clear messages. Please try again.');
        });
}

// Enter key support for sending messages
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('message-text').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Keyboard support for calculator
document.addEventListener('keydown', function(e) {
    if (currentUser) return; // Don't handle calculator keys in chat mode
    
    const key = e.key;
    
    if (/[0-9]/.test(key)) {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('×');
    } else if (key === '/') {
        e.preventDefault();
        appendToDisplay('/');
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
});
