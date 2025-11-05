import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      fontFamily: {
        montserrat: "Montserrat, sans-serif",
        arial: "Arial, sans-serif",
        inter: "Inter, sans-serif"
      },
      colors: {
        "primary": "#98B020",
        "gray-1": "#CCCCCC",
        "gray-2": "#F5F5F5",
        "gray-3": "#666666",
        "gray-4": "#333333",
        "gray-5": "#828282",
        "gray-6": "#999999",
        "gray-7": "#E9E9E9",
        "gray-8": "#F6F6F6",
        "gray-9": "#E5E5E5",
        "blue-bar": "#3399FF",
        "blue-flag": "#33D2C8",
        "white-90": "rgba(255, 255, 255, 0.9)",
        "green-tips": "#E8F79D",
      },
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "button": "0 0 10px #98B020",
      },
      zIndex: {
        'full': '1000',
      },
      transitionProperty: {
        "3s": ".3s all ease",
      },
      screens: {
        // Intervals
        "dv-full-desktop": { "max": "1920px", "min": "1600px" },
        "dv-lg-desktop": { "max": "1599px", "min": "1441px" },
        "dv-sm-desktop": { "max": "1440px", "min": "1367px" },
        "dv-lg-laptop": { "max": "1366px", "min": "1281px" },
        "dv-sm-laptop": { "max": "1280px", "min": "1200px" },
        "dv-full-tablet": { "max": "1199px", "min": "1078px" },
        "dv-lg-tablet": { "max": "1077px", "min": "1025px" },
        "dv-md-tablet": { "max": "1024px", "min": "821px" },
        "dv-sm-tablet": { "max": "820px", "min": "769px" },
        "dv-xsm-tablet": { "max": "768px", "min": "639px" },
        "dv-full-phone": { "max": "638px", "min": "431px" },
        "dv-lg-phone": { "max": "430px", "min": "391px" },
        "dv-md-phone": { "max": "390px", "min": "376px" },
        "dv-sm-phone": { "max": "375px", "min": "361px" },
        "dv-xsm-phone": { "max": "360px", "min": "321px" },

        // Custom BP (ex: cs-sm-device)

        "cs-min-xlg-desktop": { "min": "1550px" },
        "cs-min-lg-desktop": { "min": "1499px" },
        "cs-min-desktop": { "min": "1200px" },
        "cs-min-desktop-2": { "min": "1451px" },
        "cs-min-desktop-left-2": { "min": "1506px" },
        "cs-max-desktop": { "max": "1450px" },
        "cs-min-desktop-left": { "max": "1451px", "min": "1306px" },
        "cs-md-laptop": { "max": "1276px", "min": "1201px" },
        "cs-lg-tablet": { "max": "1199px", "min": "927px" },
        "cs-md-tablet": { "max": "926px", "min": "490px" },
        "cs-xmin-tablet": { "min": "981px" },
        "cs-md-min-tablet": { "min": "821px" },
        "cs-max-tablet": { "max": "926px" },
        "cs-min-tablet": { "min": "639px" },
        "cs-max-phone": { "max": "489px" },
        "cs-xsm-phone": { "max": "359px" },
        "cs-lg-phone": { "max": "430px", "min": "391px" },

        // Max widths
        "full-desktop": { "max": "1920px" },
        "lg-desktop": { "max": "1599px" },
        "sm-desktop": { "max": "1440px" },
        "lg-laptop": { "max": "1366px" },
        "sm-laptop": { "max": "1280px" },
        "full-tablet": { "max": "1199px" },
        "lg-tablet": { "max": "1077px" },
        "md-tablet": { "max": "1024px" },
        "xmd-tablet": { "max": "980px" },
        "sm-tablet": { "max": "820px" },
        "xsm-tablet": { "max": "768px" },
        "full-phone": { "max": "638px" },
        "lg-phone": { "max": "430px" },
        "md-phone": { "max": "390px" },
        "sm-phone": { "max": "375px" },
        "xsm-phone": { "max": "360px" },
        "xxsm-phone": { "max": "320px" },
      },
      backgroundImage: {
        "services": "url('/image/backgroundspa.png')",
      },
    },
  },
};
