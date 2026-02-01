# Valentine's Day Treasure Hunt 💝

A romantic single-page treasure hunt web app with 4 sequential interactive steps.

## 🎯 Features

1. **Initial Question**: "Will you be my Valentine?" with a dodging "No" button and growing "Yes" button
2. **Wordle Game**: Guess romantic 5-letter words to unlock the next step
3. **Interactive Love Letter**: Animated letter that reveals through mini-interactions
4. **Final Reveal**: Photo montage with heartfelt message

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3107](http://localhost:3107)

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

All customizable content is in the `data/` folder:

### 1. Love Letter Content
Edit `data/love-letter.ts` to personalize the letter sections.

### 2. Final Message
Update `config.finalMessage` in `data/config.ts` with your heartfelt message.

### 3. Photos
1. Add your photos to `/public/photos/` as `01.jpg`, `02.jpg`, `03.jpg`, etc.
2. Update the `photos` array in `data/config.ts` to match your files.

### 4. Wordle Words
Edit `data/wordle-words.ts` to add or change romantic words (must be 5 letters).

### 5. Messages
Customize encouragement messages in `data/messages.ts`.

## 📂 Project Structure

```
valentine-fun/
├── app/                    # Next.js app router
├── components/
│   ├── steps/             # Main step components
│   ├── wordle/            # Wordle game components
│   ├── ui/                # Reusable UI components
│   └── providers/         # State management
├── lib/
│   ├── wordle/            # Wordle logic
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Utility functions
├── data/                  # 📝 CUSTOMIZE HERE
│   ├── config.ts          # Main configuration
│   ├── wordle-words.ts    # Romantic words
│   ├── love-letter.ts     # Letter content
│   └── messages.ts        # UI messages
├── types/                 # TypeScript definitions
└── public/
    └── photos/            # 📸 ADD YOUR PHOTOS HERE
```

## 🎮 How to Play

1. Answer the initial question (try clicking "No" 😉)
2. Play Wordle with romantic words
3. Interact with the love letter:
   - Click to reveal first section
   - Scroll to reveal second section
   - Hover over the heart for third section
   - Type "love" to unlock final section
4. Enjoy the photo montage and final message!

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **State**: React Context + useReducer
- **Persistence**: LocalStorage

## 🎨 Color Palette

- Purple: `#a855f7` (Primary)
- Pink: `#ec4899` (Accent)
- Mauve: `#c4b5d6` (Soft accent)
- Blush: `#ffc9d4` (Soft accent)

## 📝 State Persistence

Progress is automatically saved to localStorage. To reset:

```javascript
localStorage.removeItem('valentine-hunt-state');
```

Or open DevTools → Application → Local Storage → Delete `valentine-hunt-state`

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Deploy!

```bash
npm run build
```

## 📱 Responsive Design

Fully responsive and works on:
- Desktop
- Tablet
- Mobile (touch-enabled)

## ♿ Accessibility

- Keyboard navigation
- ARIA labels
- Respects `prefers-reduced-motion`

## 🐛 Troubleshooting

### Photos not showing?
- Make sure photos are in `/public/photos/`
- Check file names match the `photos` array in `data/config.ts`
- Supported formats: JPG, PNG, WEBP

### LocalStorage not persisting?
- Check browser privacy settings
- Ensure localStorage is enabled
- Try a different browser

### Wordle not accepting words?
- Words must be exactly 5 letters
- Words must be in the valid word list (`lib/wordle/wordList.ts`)

## 📄 License

MIT - Created with ❤️ for Valentine's Day

## 💡 Tips

- Test on mobile before sharing
- Add personal photos for the best experience
- Customize the love letter to make it truly special
- The "No" button will dodge 😄 - it's a feature!

---

Made with love using Claude Code ❤️
