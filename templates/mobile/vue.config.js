const {
  addAlias,
  addServer,
  addSvgSpriteLoader,
  checkEnv,
  addPxToVw,
  addTranspileDependencies,
  // genExternals,
  globalRegisterLess,
} = require("./scripts/helper");

checkEnv([
  "VUE_APP_DEV_SERVER_PORT",
  "VUE_APP_DEV_SERVER_TARGET",
  "VUE_APP_DEV_SERVER_MODULE"
]);
/**
 *   VUE_APP_DEV_SERVER_PORT: 8080
 *   VUE_APP_DEV_SERVER_TARGET: http://102.123.123.123:8080
 *   VUE_APP_DEV_SERVER_MODULE: 'wec-counselor-apps'
 */
module.exports = {
  chainWebpack: chain => {
    // alias
    addAlias(chain);
    // svg sprite
    addSvgSpriteLoader(chain);
    //  image
    // pxtovw
    addPxToVw(chain)
  },
  transpileDependencies: addTranspileDependencies(),
  devServer: addServer(),
  // configureWebpack: config => {
  //   // externals
  //   genExternals(config)
  // },
  pluginOptions: {
    ...globalRegisterLess()
  }
};
