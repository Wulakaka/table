import Vue from "vue";
import App from "./App.vue";
import TslTable from "../src/index";
import ElementUI from "element-ui";

Vue.config.productionTip = false;
Vue.use(TslTable);
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
