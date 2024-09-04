module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "reggae-one": ["Reggae One"],
      },
      dropShadow: {
        "3xl": "35px 35px 35px rgba(241, 3, 170,0.3)",
      },
      backgroundImage: {
        "Multi": "url('../src/assets/images/1.png')",
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
  },
  plugins: [],
};
