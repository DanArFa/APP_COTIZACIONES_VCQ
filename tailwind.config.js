/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        glass: {
          obsidian: '#1A1A1A',
          charcoal: '#2A2A2A',
          frost: '#F8F9FA',
          cyan: '#00D1FF',
          'cyan-glow': 'rgba(0, 209, 255, 0.2)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.5)',
        'glow-cyan': '0 0 20px rgba(0, 209, 255, 0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0, 209, 255, 0.4)',
      },
    },
  },
  plugins: [],
};
