# Stealth Chat Calculator 🔢💬

A secret chat application disguised as a functional calculator. Perfect for discreet communication with real-time messaging via Firebase.

## Features ✨

- **Fully Functional Calculator** - Works exactly like a real calculator
- **Secret Access Codes** - Enter `80085` or `1234` + `=` to access chat
- **Real-time Messaging** - Instant synchronization between users
- **Stealth Mode** - Automatically reverts to calculator when tab loses focus
- **Emergency Clear** - Instantly delete all chat history
- **Mobile Responsive** - Works perfectly on desktop and mobile devices

## Quick Setup 🚀

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Realtime Database**:
   - Go to Realtime Database → Create Database
   - Choose your region
   - Start in **test mode** for development

4. Get your configuration:
   - Project Settings → General → Your Apps
   - Add a web app
   - Copy the `firebaseConfig` object

### 2. Configure the Application

1. Open `firebase-config.js`
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    databaseURL: "https://your-project-id-default-rtdb.firebaseio.com/",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### 3. Firebase Security Rules

For development, set these rules in Firebase Console → Realtime Database → Rules:

```json
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
```

## How to Use 🎯

### Calculator Mode
- Functions as a normal calculator
- Supports basic arithmetic: `+`, `-`, `×`, `/`
- Keyboard support for all operations
- Press `C` or `Escape` to clear

### Secret Chat Access
- **User 1**: Enter `80085` and press `=`
- **User 2**: Enter `1234` and press `=`
- Both codes lead to the same chat room

### Chat Features
- Real-time messaging
- Messages show with timestamps
- **Clear All** button instantly deletes all chat history
- **Calculator** button returns to calculator mode
- **Auto-stealth**: Switches back to calculator when tab loses focus

## Deployment Options 🌐

### GitHub + Netlify (Recommended)

1. **Upload to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/stealth-chat-calculator.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Deploy settings: Build command: (leave empty), Publish directory: `/`
   - Your app will be live instantly

### Other Hosting Options

- **GitHub Pages**: Enable in repository settings
- **Vercel**: Connect GitHub repo for automatic deployment
- **Firebase Hosting**: Use `firebase deploy` after setup
- **Any static host**: Upload files directly

## File Structure 📁

```
stealth-chat-calculator/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Calculator and chat functionality
├── firebase-config.js  # Firebase setup (configure this)
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

## Technical Details ⚙️

### Calculator Features
- Expression evaluation with security validation
- Support for parentheses and decimal numbers
- Error handling for invalid expressions
- Keyboard and mouse input support

### Chat System
- Firebase Realtime Database integration
- Real-time message synchronization
- User identification system
- Message persistence and history

### Security Features
- Input sanitization to prevent code injection
- Firebase security rules for data protection
- Stealth mode for privacy protection

## Troubleshooting 🔧

### Common Issues

**1. "Firebase not connected" message:**
- Check your Firebase configuration in `firebase-config.js`
- Ensure Realtime Database is enabled in Firebase Console
- Verify your database URL is correct

**2. Messages not syncing:**
- Check Firebase security rules
- Ensure both users are using the same chat codes
- Check browser console for connection errors

**3. Calculator not working:**
- JavaScript might be disabled
- Check browser console for errors
- Try refreshing the page

### Browser Console Logs

The app provides helpful console messages:
- "Firebase initialized successfully" - Configuration is correct
- "Connected to Firebase Realtime Database" - Ready for chat
- Error messages will guide you to solutions

## Privacy & Security 🔒

### Development vs Production

**Development (Current Setup):**
- Open read/write access for testing
- Suitable for personal use between trusted users

**For Production Use:**
- Implement Firebase Authentication
- Restrict database rules to authenticated users
- Consider additional encryption for sensitive messages

### Stealth Features

- Uses calculator icon and title
- Automatically reverts to calculator on focus loss
- No obvious chat indicators in calculator mode
- Emergency clear function for quick history deletion

## Support 💬

If you encounter issues:

1. Check the browser console for error messages
2. Verify Firebase configuration and database rules
3. Ensure your Firebase project has Realtime Database enabled
4. Test with a simple calculator operation first

---

**⚠️ Important:** This application is designed for personal use. For production deployments with sensitive data, implement proper authentication and encryption.
