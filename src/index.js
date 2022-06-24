import TslTable from "../packages/TslTable";
import TslTableColumn from "../packages/TslTableColumn";
import TslWilltable from "../packages/TslWilltable/src";
import { Checkbox } from "element-ui";
import TslElTable from "../packages/table";
import TslElTableColumn from "../packages/table-column";
import TslTooltip from "../packages/tooltip";
import "../packages/styles/index.scss";

const components = [
  TslTable,
  TslTableColumn,
  Checkbox,
  TslWilltable,
  TslElTable,
  TslElTableColumn,
  TslTooltip,
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
  TslTable,
  TslTableColumn,
  TslWilltable,
  TslElTable,
  TslElTableColumn,
  TslTooltip,
};
