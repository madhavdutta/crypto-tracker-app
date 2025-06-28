/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        crypto: {
          bitcoin: '#F7931A',
          ethereum: '#627EEA',
          gain: '#10B981',
          loss: '#EF4444',
          neutral: '#6B7280'
        }
      },
      backgroundImage: {
        'crypto-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'glass-portfolio': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'bitcoin-gradient': 'linear-gradient(135deg, #F7931A 0%, #FF8C00 100%)',
        'ethereum-gradient': 'linear-gradient(135deg, #627EEA 0%, #4169E1 100%)',
        'market-gradient': 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
      },
      animation: {
        'price-update': 'priceUpdate 0.3s ease-in-out',
        'chart-draw': 'chartDraw 1.5s ease-out',
        'portfolio-balance': 'portfolioBalance 0.5s ease-out',
        'crypto-pulse': 'cryptoPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        priceUpdate: {
          '0%': { transform: 'scale(1)', backgroundColor: 'transparent' },
          '50%': { transform: 'scale(1.05)', backgroundColor: 'rgba(16, 185, 129, 0.1)' },
          '100%': { transform: 'scale(1)', backgroundColor: 'transparent' }
        },
        chartDraw: {
          '0%': { strokeDasharray: '0 1000' },
          '100%': { strokeDasharray: '1000 0' }
        },
        portfolioBalance: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        cryptoPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(102, 126, 234, 0.8)' }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
