import Vue from "vue";
import VueRouter from "vue-router";
import { routes as componentRoutes } from "../utils/components";
Vue.use(VueRouter);

const routes = [
  ...componentRoutes,
  {
    path: "/",
    redirect: componentRoutes[0].path,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
