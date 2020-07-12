import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 组件样式规范
import 'counselor-mobile-ui/styles/global.less'
// less vars\mixin 使用 import 'counselor-mobile-ui/styles/index.less'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
