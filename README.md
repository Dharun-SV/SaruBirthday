# 🎉 Happy Birthday Saru! 🎉

A beautiful and interactive React web app created for your girlfriend's birthday celebration with multiple fun games and activities!

## 🌟 Features

### 🏠 Home Page
- Animated welcome message with confetti effects
- Heartfelt birthday greeting
- Navigation to all games
- Special love message

### 🎮 4 Fun Games/Activities

#### 1. 🧠 Memory Game
- Classic memory matching game with birthday emojis
- Track your moves
- Win celebration with score display
- Difficulty: 16 cards (8 pairs)

#### 2. ❓ Birthday Trivia
- 5 questions about your girlfriend
- Interactive quiz with progress tracking
- Score display with personalized messages
- Perfect score celebration

#### 3. 😊 Emoji Match - Your Qualities
- Discover beautiful qualities represented by emojis
- 6 unique qualities to reveal
- Engaging flip animation
- Celebratory completion screen

#### 4. 💘 Love Calculator
- Fun love percentage calculator
- Personalized messages based on percentage
- Visual love bar
- Special romantic messages

## 🛠️ Technology Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **React Router** - Page navigation
- **Vite** - Fast build tool
- **CSS3** - Modern styling with animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd Saru_Bday
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to:
```
http://localhost:5173/
```

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 📝 Customization Guide

### Change the Name
Open `src/pages/Home.tsx` and update:
- Line 13: Change "Saru" to her name
- Update any other personal references

### Update Trivia Questions
Edit `src/pages/Game2.tsx` and modify the `triviaQuestions` array with:
- Her favorite color
- Her favorite food
- Her favorite activities
- Any personal questions

### Add More Emojis to Memory Game
In `src/pages/Game1.tsx`, modify the `emojis` array to add more card pairs.

### Personalize Messages
Search and replace text throughout the pages:
- Home page greeting
- Love calculator messages
- Game descriptions
- Special message content

## 📂 Project Structure

```
Saru_Bday/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Main landing page
│   │   ├── Home.css
│   │   ├── Game1.tsx         # Memory game
│   │   ├── Game1.css
│   │   ├── Game2.tsx         # Trivia quiz
│   │   ├── Game2.css
│   │   ├── Game3.tsx         # Emoji match
│   │   ├── Game3.css
│   │   ├── Game4.tsx         # Love calculator
│   │   └── Game4.css
│   ├── App.tsx               # Main app component with routing
│   ├── App.css
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## 🎨 Color Scheme

The app uses a beautiful purple gradient theme:
- Primary Gradient: `#667eea` to `#764ba2`
- Accent Colors: 
  - Gold: `#ffd93d`
  - Green: `#6bcf7f`
  - Red: `#ff6b6b`

## 🎯 Tips for Best Experience

1. **Mobile Friendly**: The app is responsive and works on all devices
2. **Customize Further**: Edit the messages and questions to make it more personal
3. **Add Photos**: You can add image URLs to make it even more special
4. **Share the Link**: Deploy to Vercel or Netlify to share with her!

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder on Netlify
```

## 💡 Future Enhancements

- Add photo gallery
- Add countdown timer to her next birthday
- Add music/sound effects
- Add more games
- Add personalized birthday message video
- Add drawing game

## 💕 Special Notes

This web app is designed to make your girlfriend's birthday extra special with:
- Interactive fun games
- Personalized messages
- Beautiful animations
- A heartfelt love message

Feel free to customize every aspect to make it perfectly suited to her!

## 📞 Support

If you need any help customizing or enhancing this app, feel free to modify any of the files!

---

**Made with ❤️ for your special someone!**

Happy Birthday Saru! 🎉🎉🎉
