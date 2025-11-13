# 🔐 Classical Cipher Toolkit

A beautiful, interactive web application for exploring and experimenting with classical cryptography algorithms. Built with **Next.js 15**, **Tailwind CSS**, and **Framer Motion**.

## 🌟 Features

- **7 Classical Ciphers** implemented and ready to use:
  - Caesar Cipher
  - Monoalphabetic Cipher
  - Playfair Cipher
  - Hill Cipher
  - Vigenère Cipher
  - One-Time Pad
  - Rail Fence Cipher

- **🎬 Step-by-Step Visualization**: Watch encryption happen letter by letter with detailed explanations
- **📊 Frequency Analysis**: 
  - Real-time letter frequency analysis
  - Side-by-side input/output comparison
  - English frequency reference for cryptanalysis
  - Visual bar charts with percentages
- **Interactive UI** with smooth animations
- **Real-time encryption/decryption**
- **Educational content** - learn how each cipher works
- **Mobile responsive** design
- **Clean, modern interface** with gradient backgrounds and smooth transitions
- **Auto-play visualization** with play/pause controls

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cipher-toolkit
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
/app
  /page.tsx                    # Home page with cipher cards
  /layout.tsx                  # Root layout
  /globals.css                 # Global styles
  /ciphers
      /caesar/page.tsx         # Caesar cipher tool
      /mono/page.tsx           # Monoalphabetic cipher tool
      /playfair/page.tsx       # Playfair cipher tool
      /vigenere/page.tsx       # Vigenère cipher tool
      /hill/page.tsx           # Hill cipher tool
      /otp/page.tsx            # One-Time Pad tool
      /rail/page.tsx           # Rail Fence cipher tool

/components
   CipherCard.tsx              # Animated card component
   CipherLayout.tsx            # Reusable layout for cipher pages
   TextArea.tsx                # Custom textarea component
   Input.tsx                   # Custom input component
   Button.tsx                  # Custom button component

/lib
   /ciphers
      caesar.ts                # Caesar cipher implementation
      mono.ts                  # Monoalphabetic cipher implementation
      playfair.ts              # Playfair cipher implementation
      vigenere.ts              # Vigenère cipher implementation
      hill.ts                  # Hill cipher implementation
      otp.ts                   # One-Time Pad implementation
      rail.ts                  # Rail Fence cipher implementation
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)

## 🔧 How to Use

1. **Home Page**: Browse through the available ciphers displayed as interactive cards
2. **Select a Cipher**: Click on any cipher card to open its tool page
3. **Enter Text**: Type or paste your plaintext or ciphertext
4. **Enter Key**: Provide the appropriate key for the cipher
5. **Encrypt/Decrypt**: Click the respective button to see the result
6. **Learn**: Read the "How it works" section to understand the algorithm

## 📖 Cipher Descriptions

### Caesar Cipher
Shifts each letter by a fixed number of positions in the alphabet. Simple but weak against frequency analysis.

### Monoalphabetic Cipher
Maps each letter to a unique substitute letter using a 26-letter key.

### Playfair Cipher
Encrypts pairs of letters (digraphs) using a 5×5 matrix constructed from a keyword.

### Hill Cipher
Uses matrix multiplication to encrypt blocks of letters. Based on linear algebra.

### Vigenère Cipher
A polyalphabetic cipher that uses a keyword to shift letters by different amounts.

### One-Time Pad
The only theoretically unbreakable cipher when used correctly. Requires a truly random key as long as the message.

### Rail Fence Cipher
A transposition cipher that writes text in a zigzag pattern across multiple rails.

## 🎯 Recent Enhancements

- [x] **Step-by-step visualization** of encryption process with auto-play
- [x] **Frequency analysis tools** with side-by-side comparison
- [x] **Visual progress tracking** for each encryption step
- [x] **Interactive controls** (play, pause, next, previous, reset)

## 🚀 Future Enhancements

- [ ] Brute force attack demonstrations for Caesar cipher
- [ ] Dark mode support
- [ ] Export/Import functionality
- [ ] Cipher strength comparison tool
- [ ] Historical context and timeline for each cipher
- [ ] Pattern detection tools
- [ ] Cipher chaining demonstrations

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project for educational purposes.

## 🙏 Acknowledgments

Built as an educational tool to help students understand classical cryptography.

---

**Made with ❤️ using Next.js and Tailwind CSS**
