import Vue from "vue";
import router from "./router/router.js";

import {
  BsTable,
} from "../../lib/tslbstb";
// import "../src/assets/scss/reset.scss";
// import 'element-ui/lib/theme-chalk/index.css';
import "../../lib/tslbstb.css";
import './layout'
import App from "./App";

Vue.use(BsTable);


new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
