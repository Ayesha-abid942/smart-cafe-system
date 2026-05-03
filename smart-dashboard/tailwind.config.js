module.exports = {
  content: [
    "./src/*/.{js,jsx,ts,tsx}", // Ye line lazmi hai taaki Tailwind ko pata chale kahan apply hona hai
  ],
  theme: {
    extend: {
      colors: {
        // Aapke dashboard ke specific colors
        'dark-bg': '#0d0f1a',
        'card-bg': '#161929',
        'accent-purple': '#7f00ff',
        'accent-pink': '#ff549d',
        'accent-cyan': '#00d2ff',
      },
      backgroundImage: {
        // Gradients jo aapke login aur cards mein use ho rahe hain
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
