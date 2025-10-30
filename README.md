# StratifyAi - AI-Powered Startup Advisor

StratifyAi is a modern web application that helps entrepreneurs build and grow successful startups using AI-powered insights, expert guidance, and actionable strategies.

## ✨ Features

- **AI Startup Adviser**: Get personalized advice and strategies using Google's Gemini AI
- **Interactive Chat**: Real-time AI chat with floating cursor animations
- **User Authentication**: Secure signup/login with Firebase (Email/Password & Google OAuth)
- **Modern UI/UX**: Beautiful animations with GSAP and Framer Motion
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Responsive Design**: Optimized for all devices
- **Startup Resources**: Tips, tools, and use cases for entrepreneurs

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP + Framer Motion
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 16 or higher)
- npm or yarn package manager
- Firebase project with Authentication and Firestore enabled
- Google Gemini API key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stratifyai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add:
   ```env
   # Gemini AI API Key
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here

   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

## 🔧 Firebase Setup

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Google Analytics (optional)

2. **Enable Authentication**
   - Navigate to Authentication → Sign-in method
   - Enable "Email/Password" provider
   - Enable "Google" provider
   - Add your domain to authorized domains

3. **Set up Firestore Database**
   - Go to Firestore Database
   - Create database in production mode
   - Choose your preferred location
   - Set up security rules (start with test mode for development)

4. **Get your config**
   - Go to Project Settings → General
   - Scroll down to "Your apps"
   - Click on web app icon
   - Copy the config object values to your `.env` file

## 🤖 Gemini AI Setup

1. **Get API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

2. **Enable Required APIs**
   - Go to Google Cloud Console
   - Enable "Generative Language API"

## 🏃‍♂️ Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The application should load with the home page

3. **Optional: Run backend server (if using proxy)**
   ```bash
   npm run server
   ```

## 📦 Build for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 Usage

1. **Home Page**: Explore startup tips, tools, and resources
2. **Sign Up**: Create an account using email or Google
3. **Login**: Access your account and personalized features
4. **AI Adviser**: Get startup advice from our AI consultant
5. **Chat**: Use the floating chatbot for quick questions

## 🔒 Security Rules (Firestore)

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎨 Customization

- **Colors**: Modify `tailwind.config.js` and CSS custom properties
- **Animations**: Adjust GSAP timelines in component files
- **Theme**: Update theme variables in `src/styles/theme.css`
- **Firebase**: Configure additional services as needed

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Auth Error**: Make sure authentication methods are enabled
2. **Gemini API Error**: Check API key and quota limits
3. **Build Errors**: Clear node_modules and reinstall dependencies
4. **CORS Issues**: Ensure domains are whitelisted in Firebase

### Getting Help

- Check the browser console for detailed error messages
- Verify all environment variables are set correctly
- Ensure Firebase project is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Google AI](https://ai.google.dev/) - AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [GSAP](https://greensock.com/) - Animations
- [Lucide](https://lucide.dev/) - Icons

---

Built with ❤️ for entrepreneurs and startup enthusiasts
