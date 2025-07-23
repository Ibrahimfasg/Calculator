# Stealth Chat Calculator

## Overview

This project is a unique stealth communication application that disguises a real-time chat system as a fully functional calculator. The application uses Firebase Realtime Database for instant messaging synchronization and employs secret access codes to enter chat mode while maintaining the appearance of a standard calculator.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a client-side web architecture pattern with real-time database integration:

- **Frontend**: Vanilla HTML, CSS, and JavaScript with responsive design
- **Backend**: Firebase Realtime Database for data persistence and synchronization
- **Authentication**: Code-based access system (80085 or 1234)
- **Deployment**: Static web application suitable for any web server

## Key Components

### Calculator Interface
- Fully functional calculator with standard arithmetic operations
- Clean, modern UI with gradient backgrounds and smooth animations
- Mobile-responsive design with touch-friendly buttons
- Display validation and error handling

### Chat System
- Real-time messaging with Firebase integration
- Multi-user support with distinct user channels
- Message persistence and synchronization
- Emergency chat history deletion functionality

### Stealth Features
- Secret code access (80085 for user1, 1234 for user2)
- Automatic reversion to calculator mode on tab focus loss
- Disguised UI that appears as a standard calculator app
- Calculator icon and title for browser tabs

### Firebase Integration
- Modular Firebase SDK v10.12.2 imports
- Realtime Database for message storage and synchronization
- Connection status monitoring
- Global Firebase API exposure for main application

## Data Flow

1. **Calculator Mode**: User interactions update display through DOM manipulation
2. **Secret Access**: Special codes trigger mode transition to chat interface
3. **Chat Initialization**: Firebase connection established, message listeners attached
4. **Real-time Messaging**: Messages pushed to Firebase, synchronized across all connected clients
5. **Stealth Protection**: Window focus events trigger automatic mode switching

## External Dependencies

### Firebase Services
- **Firebase App**: Core Firebase initialization
- **Realtime Database**: Message storage and real-time synchronization
- **CDN Delivery**: Firebase modules loaded via Google's CDN

### Configuration Requirements
- Firebase project with Realtime Database enabled
- Test mode security rules for development
- Custom firebaseConfig object with project credentials

## Deployment Strategy

### Static Hosting
- No server-side requirements
- Compatible with GitHub Pages, Netlify, Vercel, or any static hosting
- Single-page application with client-side routing

### Security Considerations
- Firebase security rules should be configured for production
- Code-based authentication is minimal - consider upgrading for production use
- Input validation prevents basic code injection in calculator

### Setup Process
1. Create Firebase project and enable Realtime Database
2. Copy Firebase configuration to firebase-config.js
3. Deploy static files to hosting platform
4. Configure Firebase security rules for production environment

The architecture prioritizes simplicity and stealth while maintaining real-time functionality through Firebase's robust infrastructure.