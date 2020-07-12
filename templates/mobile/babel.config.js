module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ],
    [
      "import",
      {
        libraryName: "counselor-mobile-ui",
        libraryDirectory: "lib/es",
        style: true
      },
      "counselor-mobile-ui"
    ],
    '@babel/plugin-proposal-throw-expressions',
    [
      '@babel/plugin-proposal-pipeline-operator',
      { 'proposal': 'minimal' },
    ],
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
  ]
};
