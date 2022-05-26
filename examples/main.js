import Vue from "vue";
import App from "./App.vue";
import TslTable from "../lib/tsl-table.umd";
import "../lib/tsl-table.css";
import ElementUI from "element-ui";

Vue.config.productionTip = false;
Vue.use(TslTable);
Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
