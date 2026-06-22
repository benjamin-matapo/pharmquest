import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d4aa',
        danger: '#ff6b6b',
        warning: '#ffa500',
        success: '#00c851',
        darkPanel: '#1a2332',
        deepTeal: '#0d4f4f',
        midnightBlue: '#0a1628',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 170, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 170, 0.8)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.1)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.05)' },
          '56%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pageTurnLeft: {
          '0%': { transform: 'perspective(1200px) rotateY(0deg)', transformOrigin: 'left center' },
          '100%': { transform: 'perspective(1200px) rotateY(-180deg)', transformOrigin: 'left center' },
        },
        pageTurnRight: {
          '0%': { transform: 'perspective(1200px) rotateY(180deg)', transformOrigin: 'right center' },
          '100%': { transform: 'perspective(1200px) rotateY(0deg)', transformOrigin: 'right center' },
        },
      },
      animation: {
        glowPulse: 'glowPulse 2s ease-in-out infinite',
        slideIn: 'slideIn 0.5s ease-out',
        slideOut: 'slideOut 0.5s ease-out',
        confettiFall: 'confettiFall 3s linear infinite',
        heartbeat: 'heartbeat 1.2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        pageTurnLeft: 'pageTurnLeft 0.8s ease-in-out forwards',
        pageTurnRight: 'pageTurnRight 0.8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
