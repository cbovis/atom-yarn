module.exports = {
  extends: "airbnb-base",
  plugins: ["import", "classes"],
  globals: { atom: true, document: true },
  rules: {
    "no-console": "off",
    "classes/style": 2,
    "classes/super": 2,
    "classes/name": [2, "class", "method"],
    "classes/space": 2
  },
  settings: {
    "import/core-modules": ["atom"]
  }
};
