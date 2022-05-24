import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import TslTable from "../src/index";

Vue.config.productionTip = false;
Vue.use(TslTable);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
