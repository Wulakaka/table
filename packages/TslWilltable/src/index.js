import TslWilltable from "./components/Table.vue";

const install = (Vue) => {
  Vue.component(TslWilltable.name, TslWilltable);
};

/* 支持使用标签的方式引入 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export { install, TslWilltable };

export default TslWilltable;
