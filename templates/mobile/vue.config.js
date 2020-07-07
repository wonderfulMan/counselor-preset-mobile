const {
  addAlias,
  addServer,
  addSvgSpriteLoader,
  checkEnv,
  addImageMinPlugins
} = require("./scripts/helper");

checkEnv([
  "VUE_APP_DEV_SERVER_PORT",
  "VUE_APP_DEV_SERVER_TARGET",
  "VUE_APP_DEV_SERVER_MODULE"
]);

module.exports = {
  chainWebpack: chain => {
    // alias
    addAlias(chain);
    // svg sprite
    addSvgSpriteLoader(chain);
    //  image
    addImageMinPlugins(chain);
  },
  devServer: addServer()
};
