module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7003b3",
        hoverPrimary: "#a931f399",
        secondary: "#c4adf4",
        primaryDark: "#33183f",
        undertext: "#aaaaaa",
        darkerWhite: "#F7F6F6",
        slightPurple: "rgba(112, 3, 179, 0.123)",
        faintPurple: '#c4adf486',
        tintedBackground: 'rgba(0,0,0,0.6)'
      },
      aspectRatio: {
        '4/3': '4 / 3',
        square: '1 / 1'
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      fontSize: {
        xxl: '3.5rem',
        xl: '3rem',
        lg: '2.5rem',
        mdl: '2.2rem',
        md: '1.5rem',
        sm: '1.3rem',
        xsm: '1.1rem',
        xxsm: '0.725rem',
        label: '0.625rem',
      },
      screens: {
        'xsm': '375px',
        'sm': '425px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        'xxl': '1555px'
      },
      fontWeight: {
        undertext: 100,
        descriptions: 300,
        normal: 400,
        titles: 600,
      },
    },
  },
  variants: {

  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}