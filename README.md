# Krack the Kode
**Author:** Kuroonai  
**Version:** 1.0.0

## 🎮 About the Game

Krack the Kode is an engaging number-guessing puzzle game inspired by classic code-breaking games like Mastermind. Players must guess a secret numerical code by using logic and deduction based on color-coded feedback.

## 🎯 Game Features

### Single Player Mode
- Guess a randomly generated 4-8 digit code
- Configurable code length and maximum tries
- No penalty for wrong guesses
- Scoring system that rewards quick solving
- Carry forward base points between rounds

### Two Player Mode (Coming Soon)
- Players set codes for each other
- Turn-based gameplay
- Competitive scoring

### Visual Feedback System
- 🟢 **Green**: Correct digit in correct position
- 🟡 **Yellow**: Correct digit in wrong position
- 🔴 **Red**: Digit not in the code

### Game Features
- **Undo System**: 3 undos per round
- **Life Bar**: Visual representation of remaining tries
- **Dynamic Music**: Background music that intensifies based on remaining tries
- **Sound Effects**: Click sounds, victory fanfare, and failure sounds
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Portrait & Landscape**: Optimized for both orientations

## 📊 Scoring System

- **Base Points**: 1000 points per solved puzzle
- **Tries Bonus**: 200 points for each remaining try
- **Time Bonus**: Up to 1000 points based on solving speed
- **Continuous Play**: Option to carry forward score to next round

## 🚀 Quick Start

### Local Development

1. **Clone or download the project files**

2. **Install dependencies** (optional, for development server):
```bash
npm install
```

3. **Start the game**:

   **Option A - Using npm (recommended)**:
   ```bash
   npm start
   ```
   Then open your browser to `http://localhost:8080`

   **Option B - Direct file access**:
   Simply open `index.html` in your web browser

   **Option C - Using Python** (if you have Python installed):
   ```bash
   # Python 3
   python -m http.server 8080
   
   # Python 2
   python -m SimpleHTTPServer 8080
   ```

4. **For live development** (auto-refresh on changes):
```bash
npm run dev
```

## 🎮 How to Play

1. **Start the Game**: Choose Single Player from the main menu
2. **Make a Guess**: Use the number pad to enter your guess
3. **Submit**: Press "Submit Guess" to check your code
4. **Analyze Feedback**: 
   - Green = correct position
   - Yellow = correct number, wrong position
   - Red = number not in code
5. **Keep Guessing**: Use logic to narrow down the correct code
6. **Win**: Find the code before running out of tries!

## ⚙️ Settings

Access settings from the main menu to customize:
- **Code Length**: 4-8 digits
- **Maximum Tries**: 6-15 attempts
- **Sound**: Toggle sound effects
- **Music**: Toggle background music
- **Duplicates**: Allow/disallow duplicate digits in the code

## 📱 Mobile App Deployment

### Android/iOS via WebView

The game is web-based and can be easily wrapped in a WebView for mobile deployment:

1. **Android**: Use Android Studio to create a WebView app
2. **iOS**: Use Xcode to create a WKWebView app
3. **Cross-platform**: Consider using Capacitor or Cordova

### Progressive Web App (PWA)

The game includes PWA support with:
- `manifest.json` for app metadata
- `service-worker.js` for offline play
- Responsive design for all screen sizes

To install as PWA on mobile:
1. Open the game in Chrome/Safari
2. Tap "Add to Home Screen"
3. The game will install as a standalone app

## 🎨 Customization

### Themes
Edit `styles.css` to customize colors:
```css
:root {
    --primary-color: #6C63FF;
    --secondary-color: #FF6B6B;
    --success-color: #4CAF50;
    /* ... etc */
}
```

### Audio
Replace the audio generation in `game.js` with actual audio files:
1. Add `.mp3` files to an `audio/` folder
2. Update the audio initialization code
3. Use HTML5 Audio API instead of Web Audio API

## 🔧 Project Structure

```
krack-the-kode/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── game.js            # Game logic and functionality
├── manifest.json      # PWA configuration
├── service-worker.js  # Offline functionality
├── package.json       # Project dependencies
└── README.md         # This file
```

## 🌐 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Future Enhancements

- [ ] Complete Two-Player mode implementation
- [ ] Add difficulty levels
- [ ] Implement hints system
- [ ] Add achievements and badges
- [ ] Create tournament mode
- [ ] Add more sound themes
- [ ] Implement color themes
- [ ] Add statistics tracking
- [ ] Create daily challenges
- [ ] Add social sharing features

## 🐛 Known Issues

- Two-player mode is partially implemented
- Audio files need to be added (currently using generated sounds)
- Icons for PWA need to be created

## 📄 License

MIT License - Feel free to modify and distribute

## 🤝 Contributing

Feel free to fork and submit pull requests for improvements!

## 📧 Contact

For questions or suggestions, contact Kuroonai

---

Enjoy cracking the code! 🎯🔓
