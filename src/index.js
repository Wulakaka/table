import TslTable from "../packages/TslTable";
import { Checkbox, TableColumn as TslTableColumn } from "element-ui";
TslTableColumn.name = "TslTableColumn";
const components = [TslTable, TslTableColumn, Checkbox];
import "element-ui/lib/theme-chalk/index.css";
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
  TslTable,
  TslTableColumn,
};
