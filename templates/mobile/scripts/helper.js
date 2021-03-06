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
          `请在根目录定义.env.development.local文件定义${vars.join(
            ","
          )}变量：端口、地址、模块名称`
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
    .set("@pages", exports.resolve("../src/pages"))
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
  const FILE_RE = /\.(vue|js|ts|svg)$/;

  chain.module.rule("svg").issuer(file => !FILE_RE.test(file));
  chain.module
    .rule("svg-sprite")
    .test(/\.svg$/)
    .issuer(file => FILE_RE.test(file))
    .use("svg-sprite")
    .loader("svg-sprite-loader");
};
// 定义本地的.env.development
exports.addServer = function() {
  const {
    VUE_APP_DEV_SERVER_PORT,
    VUE_APP_DEV_SERVER_TARGET,
    VUE_APP_DEV_SERVER_MODULE
  } = process.env;
  return {
    disableHostCheck: true,
    port: VUE_APP_DEV_SERVER_PORT,
    overlay: false,
    proxy: {
      [VUE_APP_DEV_SERVER_MODULE]: {
        target: VUE_APP_DEV_SERVER_TARGET
      }
    }
  };
};
// 图片压缩
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
// px转换vw
exports.addPxToVw = function(chain) {
  chain.module
    .rule("px-to-vw")
    .test(/\.(js|vue|css)$/)
    .use("counselor-px-to-vw-loader")
    .loader("counselor-px-to-vw-loader");
};
// babel编译额外包
exports.addTranspileDependencies = function() {
  return ["counselor-mobile-ui", "counselor-sdk"];
};
// 生成babel配置
exports.genBabelImportConfig = function(params) {
  const config = {
    libraryName: "counselor-mobile-ui",
    libraryDirectory: "lib/es"
  };
  // 开发环境
  if (process.env.NODE_ENV === "development") {
    config.libraryDirectory = "packages";
  }
  if (process.env.NODE_ENV === "production") {
    config.style= true
  }

  return config
};
// cdn资源引入,忽略oss
exports.genExternals = function (config) {
  return Object.assign(config, {
    'OSS': 'OSS',
    'BMap': 'OSS',
    "wx": 'true',
    'mamp': 'true'
  })
}

exports.globalRegisterLess = function () {
  return {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        exports.resolve('../node_modules/counselor-mobile-ui/styles/index.less'),
      ]
    }
  }
}

