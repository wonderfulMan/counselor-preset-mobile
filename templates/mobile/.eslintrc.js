module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    wx: true,
    mamp: true,
    OSS: true,
    BMapLib: true
  },
  extends: ["@vue/standard", "plugin:zx/custom"],
  rules: {},
  plugins: ['babel'],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    'zx/comma-spacing': 0,
    'zx/component-name-hyphenation': 0,
    'no-unused-expressions': 0,
    'babel/no-unused-expressions': 1,
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
