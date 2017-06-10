module.exports = {
  extends: "airbnb-base",
  plugins: ["import"],
  globals: { atom: true },
  rules: {
    "no-console": "off"
  },
  settings: {
    "import/core-modules": ["atom"]
  }
};
