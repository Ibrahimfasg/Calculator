// Firebase configuration and initialization
// This file sets up Firebase for the stealth chat application

// Import Firebase modules from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getDatabase, ref, onValue, push, remove } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js';

// Firebase configuration - Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyACWYvQMMaxid4Kxrkfl1e5y0uIRbvhuzY",
  authDomain: "calculator-94d55.firebaseapp.com",
  databaseURL: "https://calculator-94d55-default-rtdb.firebaseio.com",
  projectId: "calculator-94d55",
  storageBucket: "calculator-94d55.firebasestorage.app",
  messagingSenderId: "394865626330",
  appId: "1:394865626330:web:b1504c82b00bd522e6a9e3",
  measurementId: "G-RQDBHM5JWH"
};
let app;
let database;

try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Realtime Database
    database = getDatabase(app);
    
    console.log('Firebase initialized successfully');
    
    // Make Firebase functions available globally for the main script
    window.firebase = {
        ref,
        onValue,
        push,
        remove
    };
    
    window.database = database;
    
    // Test database connection
    const testRef = ref(database, '.info/connected');
    onValue(testRef, (snapshot) => {
        if (snapshot.val() === true) {
            console.log('Connected to Firebase Realtime Database');
        } else {
            console.log('Disconnected from Firebase Realtime Database');
        }
    });
    
} catch (error) {
    console.error('Firebase initialization error:', error);
    
    // Provide fallback functionality
    window.firebase = null;
    window.database = null;
    
    // Show user-friendly error message
    setTimeout(() => {
        if (document.getElementById('messages')) {
            document.getElementById('messages').innerHTML = 
                '<div class="empty-state">Firebase configuration required. Please check README.md for setup instructions.</div>';
        }
    }, 1000);
}

// Database security rules for reference (to be set in Firebase Console)
/*
{
  "rules": {
    "chats": {
      "secret_chat": {
        ".read": true,
        ".write": true,
        "messages": {
          "$messageId": {
            ".validate": "newData.hasChildren(['text', 'userId', 'timestamp'])"
          }
        }
      }
    }
  }
}
*/

// Export for potential module usage
export { app, database };
