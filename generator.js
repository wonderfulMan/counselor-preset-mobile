module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    sideEffects: [
      "*.css",
      "*.vue"
    ],
    dependencies: {
      "dayjs": "^1.8.29",
      "counselor-mobile-ui": "latest",
      "lodash-es": "^4.17.15",
      "vant": "2.9.0",
      "vue": "^2.6.11",
      "vue-router": "^3.2.0",
      "vuex": "^3.4.0"
    },
    devDependencies: {
      "@babel/plugin-proposal-class-properties": "^7.4.4",
      "@babel/plugin-proposal-do-expressions": "^7.2.0",
      "@babel/plugin-proposal-export-default-from": "^7.2.0",
      "@babel/plugin-proposal-export-namespace-from": "^7.2.0",
      "@babel/plugin-proposal-function-bind": "^7.2.0",
      "@babel/plugin-proposal-nullish-coalescing-operator": "^7.4.4",
      "@babel/plugin-proposal-optional-chaining": "^7.2.0",
      "@babel/plugin-proposal-pipeline-operator": "^7.3.2",
      "@babel/plugin-proposal-throw-expressions": "^7.2.0",
      "@vue/cli-plugin-babel": "^4.4.0",
      "@vue/cli-plugin-eslint": "^4.4.0",
      "@vue/cli-service": "^4.4.0",
      "@vue/eslint-config-standard": "^5.1.2",
      "babel-eslint": "^10.1.0",
      "babel-plugin-import": "^1.13.0",
      "counselor-px-to-vw-loader": "^1.0.1",
      "eslint": "^6.7.2",
      "eslint-plugin-import": "^2.22.0",
      "eslint-plugin-node": "^11.1.0",
      "eslint-plugin-promise": "^4.2.1",
      "eslint-plugin-standard": "^4.0.1",
      "eslint-plugin-zx": "^1.1.0",
      "imagemin-webpack-plugin": "^2.4.2",
      "less": "^3.0.4",
      "less-loader": "^5.0.0",
      "lint-staged": "^9.5.0",
      "postcss-import": "^12.0.1",
      "postcss-url": "^8.0.0",
      "stylelint": "^13.6.1",
      "stylelint-config-zx": "^1.0.0",
      "svg-sprite-loader": "^5.0.0",
      "vue-template-compiler": "^2.6.11"
    },
    "husky": {
      "hooks": {
        "pre-commit": "type vue-cli-service >/dev/null 2>&1;if [ $? -eq 0 ]; then lint-staged; else exit 0; fi",
        "commit-msg": "type commitlint >/dev/null 2>&1;if [ $? -eq 0 ]; then commitlint -e $HUSKY_GIT_PARAM; else exit 0; fi"
      }
    },
    "lint-staged": {
      "*.{js,vue}": [
        "yarn lint",
        "git add"
      ],
      "*.{vue,css}": [
        "stylelint --fix",
        "git add"
      ]
    }
  });


  api.render('./templates/mobile')
  // 无效
  // api.render('./templates/mobile/scripts/helper.js')
  // 上面的方式不能拷贝隐藏文件
  api.render({
    '.browserslistrc': './templates/mobile/.browserslistrc',
    '.editorconfig': './templates/mobile/.editorconfig',
    '.eslintrc.js': './templates/mobile/.eslintrc.js',
    '.gitignore': './templates/mobile/.gitignore',
    '.eslintignore': './templates/mobile/.eslintignore',
    '.nvmrc': './templates/mobile/.nvmrc',
    '.postcssrc.js': './templates/mobile/.postcssrc.js',
    '.env.development.local': './templates/mobile/.env.development.local'
  })
  api.postProcessFiles((files) => {
    delete files['src/components/HelloWorld.vue']
    delete files['src/assets/logo.png']
    delete files['public/favicon.ico']
  })
}