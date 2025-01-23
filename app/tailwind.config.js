/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      // Define color palette for the application
      colors: {
        primary: '#3b82f6', // Blue for primary links and buttons
        secondary: '#1e40af', // Darker blue for navigation bars and active states

        // Bullish (Increasing Price)
        bullishLight: '#86efac', // Lighter green for small gains
        bullishMedium: '#34d399', // Medium green for moderate gains
        bullishDark: '#10b981', // Darker green for strong growth (used for larger price increase)
        
        // Bearish (Decreasing Price)
        bearishLight: '#fca5a5', // Light red for minor losses
        bearishMedium: '#ef4444', // Standard red for moderate losses
        bearishDark: '#b91c1c', // Dark red for significant losses
        
        // Neutral & Cautionary Colors
        caution: '#fbbf24', // Yellow-orange for neutral or uncertain prices
        background: '#f9fafb', // Background color
        surface: '#ffffff', // White for cards and containers
        text: '#1f2937', // Text color for readability
        muted: '#9ca3af', // Muted text for secondary information
        border: '#d1d5db', // Border color for input fields and dividers
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean and modern sans-serif font
      },
      spacing: {
        '128': '32rem', // For larger spacing
        '144': '36rem',
      },
      screens: {
        sm: '480px', // Small screens (Mobile)
        md: '768px', // Medium screens (Tablets)
        lg: '1024px', // Large screens (Laptops)
        xl: '1280px', // Extra large screens (Desktops)
      },
    },
  },
  plugins: [],
}
