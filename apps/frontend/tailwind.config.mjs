/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
  ],
  darkMode: "media",
  prefix: "",
  theme: {
    extend: {
      colors: {
        "primary": "#ffffff",
        "default": "#f3f3f3",
        "background": "#484848",
        "foreground": "#f3f3f3",
        "destructive": "#ea9999"
      }
    }
  }
};

// Using this because tailwind based design are messed up in shadow dom
// https://github.com/tailwindlabs/tailwindcss/discussions/3768#discussioncomment-1218745
const { replaceTailwindUnit, toEM, toPX } = require("tailwind-unit-replace");

module.exports = replaceTailwindUnit({
  exclude: ["fontFamily"],
  replacer: toEM // or `toPX` to convert to pixel (16-based)
})(config);
