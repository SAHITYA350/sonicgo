# 🦔 SONIC RUNNER ULTIMATE

The world's best Sonic endless runner game with premium features!

## ✨ Features

### 🎮 Core Gameplay
- **Smooth 60 FPS gameplay** on all devices
- **Double jump system** - Jump twice to dodge enemies and collect more rings
- **Speed boost power-ups** - Collect special Sonic icons for temporary speed boost
- **Dynamic difficulty** - Game speed increases progressively
- **Score multiplier system** - Chain enemy defeats for higher scores
- **Professional particle effects** and smooth animations

### 🦅 Enemies & Obstacles
- **Motobugs** - Classic ground enemies
- **Flying Birds** - Appear at higher difficulties for aerial challenges
- Intelligent spawning system that increases difficulty over time

### 📱 Mobile-First Design
- **Responsive UI** for all devices (Mobile, Tablet, Desktop)
- **Touch controls** with on-screen jump button
- **Orientation detection** - Auto-prompts to rotate phone in portrait mode
- **Optimized performance** for iOS and Android
- **Safe area support** for notched devices (iPhone X+)
- **No zoom on double-tap** for smooth mobile experience

### 🎨 Professional UI/UX
- **Animated main menu** with particle effects
- **Video player scene** (ready for integration)
- **Settings menu** (expandable for sound, difficulty, etc.)
- **Smooth transitions** between scenes
- **High-quality typography** with custom Sonic Mania font
- **Gradient backgrounds** with dynamic effects
- **Score tracking** with best score persistence

### 🎯 Premium Features
- Speed boost collectibles with visual feedback
- Double jump with particle effects
- Combo system with visual multiplier display
- Smooth parallax scrolling backgrounds
- Dynamic color changes during power-ups
- Professional game over screen with statistics

## 🚀 Setup & Installation

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Setup project structure:**
Create the following folder structure:
```
project-root/
├── src/
|   |--utils.ts
│   ├── main.ts
│   ├── kaplayCtx.ts
│   ├── entities.ts
│   └── style.css
├── public/
│   ├── graphics/
│   │   ├── chemical-bg.png
│   │   ├── platforms.png
│   │   ├── sonic.png
│   │   ├── ring.png
│   │   └── motobug.png
│   ├── fonts/
│   │   └── mania.ttf
│   ├── sounds/
│   │   ├── Destroy.wav
│   │   ├── Hurt.wav
│   │   ├── HyperRing.wav
│   │   ├── Jump.wav
│   │   └── Ring.wav
│   ├── bird.png
│   ├── sonic1.png
│   └── typescript.svg
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

3. **Copy your assets:**
- Place `bird.png` in the `public/` folder
- Place `sonic1.png` in the `public/` folder
- Ensure all graphics, fonts, and sounds are in their respective folders

4. **Run development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
```

6. **Preview production build:**
```bash
npm run preview
```

## 🎮 How to Play

### Desktop Controls
- **SPACE / Click** - Jump
- **SPACE (in air)** - Double Jump
- Jump on enemies to destroy them and earn bonus points
- Collect rings for points
- Collect Sonic icons for speed boost

### Mobile Controls
- **Tap JUMP button** - Jump
- **Tap again in air** - Double Jump
- Play in **landscape mode** for best experience
- The game will prompt you to rotate if in portrait mode

## 🎯 Game Mechanics

### Scoring System
- **+1 point** per ring collected
- **+10 points** for defeating first enemy
- **x2, x3, x4...** combo multiplier for consecutive enemy defeats
- Combo resets when touching ground
- Best score is automatically saved

### Power-Ups
- **Speed Boost** - Increases game speed temporarily (5 seconds)
  - Sonic turns golden during boost
  - Visual indicator shows remaining time

### Difficulty Progression
- Game speed increases every second
- Birds appear after 10 seconds
- Enemy spawn rate increases with speed
- Maximum challenge at 3000+ speed

## 📱 Device Compatibility

### Mobile Devices
- ✅ iPhone (all models including X, 11, 12, 13, 14, 15)
- ✅ iPad (all models)
- ✅ Android phones (all modern devices)
- ✅ Android tablets

### Desktop
- ✅ Windows PC
- ✅ Mac
- ✅ Linux
- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)

### Screen Resolutions
- Automatically scales to any resolution
- Maintains 16:9 aspect ratio
- Letterboxing for non-standard ratios

## 🛠️ Technical Stack

- **Game Engine**: Kaplay 3001.0.16
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Pure CSS with modern features
- **Graphics**: Sprite-based with sprite sheets
- **Audio**: Web Audio API via Kaplay

## 🎨 Customization

### Adding New Features
1. Edit `src/main.ts` for game logic
2. Edit `src/entities.ts` for new game objects
3. Edit `src/kaplayCtx.ts` for game configuration
4. Edit `src/style.css` for styling

### Adjusting Difficulty
In `src/main.ts`, modify:
- `gameSpeed` initial value (line ~120)
- `k.loop(1, () => gameSpeed += 50)` - speed increase rate
- Enemy spawn intervals in `spawnMotoBug()` and `spawnBird()`

### Changing Controls
In `src/kaplayCtx.ts`, modify the `buttons` object to add more keys

## 📄 Package Information

### Dependencies
```json
{
  "kaplay": "^3001.0.16"
}
```

### Dev Dependencies
```json
{
  "typescript": "~5.9.3",
  "vite": "^7.2.4"
}
```

## 🐛 Troubleshooting

### Game not loading
- Check console for errors
- Ensure all assets are in correct folders
- Run `npm install` again

### Mobile controls not working
- Ensure touch is enabled in kaplayCtx.ts
- Check that `touchToMouse: true` is set
- Clear browser cache

### Performance issues
- Close other applications
- Check if hardware acceleration is enabled in browser
- Try reducing particle effects in main.ts

### Orientation lock not working
- Some browsers don't support orientation lock
- Manual rotation prompt will still appear

## 🎉 Credits

Created with ❤️ using Kaplay game engine and modern web technologies.

Special features:
- Professional game design
- Mobile-first responsive approach
- Smooth 60 FPS gameplay
- Premium visual effects
- User-friendly interface for all devices

## 📝 License

This project is for educational and personal use.

---

**Enjoy the ultimate Sonic experience! 🦔💨**"# sonicgo" 
