import TslTableColumn from "../TslTable/src/tsl-table-column";

TslTableColumn.install = function (Vue) {
  Vue.component(TslTableColumn.name, TslTableColumn);
};

export default TslTableColumn;
