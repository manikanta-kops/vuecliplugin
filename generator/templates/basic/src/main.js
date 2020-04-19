import Vue from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";
// i18n-import-statement
Vue.config.productionTip = false;

const vueConfig = {
  router,
  store,
};
vueConfig.render = (h) => h(App);
const MY_APP = new Vue(vueConfig);
MY_APP.$mount("#app");
