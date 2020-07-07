const path = require("path");

exports.resolve = function(target) {
  return path.resolve(__dirname, target);
};
// 检查开发环境文件
exports.checkEnv = function(vars) {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === "development") {
    vars.forEach(v => {
      if (!process.env[v]) {
        console.error(
          `请在根目录定义.env.development.local文件定义${vars.join("")}变量`
        );
        process.exit(1);
      }
    });
  }
};
// 别名
exports.addAlias = function(chain) {
  chain.resolve.alias
    .set("@", exports.resolve("../src"))
    .set("@views", exports.resolve("../src/views"))
    .set("@store", exports.resolve("../src/store"))
    .set("@assets", exports.resolve("../src/assets"))
    .set("@router", exports.resolve("../src/router"))
    .set("@utils", exports.resolve("../src/utils"))
    .set("@service", exports.resolve("../src/services"))
    .set("@api", exports.resolve("../src/apis"))
    .set("@components", exports.resolve("../src/components"));
};
// 添加svg分割
exports.addSvgSpriteLoader = function(chain) {
  chain.module
    .rule("svg")
    .exclude.add(exports.resolve("../src/assets/svg"))
    .end();

  chain.module
    .rule("svg-sprite-loader")
    .test(/\.svg$/)
    .include.add(exports.resolve("../src/assets/svg")) // 处理svg目录
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({ symbolId: "icon-[name]" });
};
// 定义本地的.env.development
exports.addServer = function() {
  const {
    VUE_APP_DEV_SERVER_PORT,
    VUE_APP_DEV_SERVER_TARGET,
    VUE_APP_DEV_SERVER_MODULE
  } = process.env;
  const prefix = "/" + VUE_APP_DEV_SERVER_MODULE;
  return {
    port: VUE_APP_DEV_SERVER_PORT,
    proxy: {
      [prefix]: {
        changeOrigin: true,
        target: `${VUE_APP_DEV_SERVER_TARGET}${prefix}`,
        pathRewrite: { "^/api": "" }
      }
    }
  };
};
exports.addImageMinPlugins = function(chain) {
  chain
    .plugin("imagemin-webpack-plugin")
    .use(require("imagemin-webpack-plugin").default, [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: process.env.NODE_ENV !== "production",
        pngquant: {
          quality: "95-100"
        }
      }
    ]);
};
exports.addPxToVw = function (chain) {
  chain.module
    .rule('counselor-px-to-vw-loader')
    .test(/\.js$/)
    .exclude
    .add(/node_modules/)
    .loader('counselor-px-to-vw-loader')
}