module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["@vue/standard", "plugin:zx/custom"],
  rules: {},
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
