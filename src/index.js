/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zhao.xiaokai
 * @Date: 2022-04-19 12:36:35
 * @LastEditors: zhao.xiaokai
 * @LastEditTime: 2022-05-13 16:57:15
 */
import BsTable from "../packages/bs-table/index";
import './layout';

const components = [
  BsTable
];

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$ELEMENT = {
    size: opts.size || "",
    zIndex: opts.zIndex || 2000,
  };
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.0.1",
  install,
  BsTable
};
