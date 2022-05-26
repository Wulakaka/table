import TslTableColumn from "../TslTable/src/tsl-table-column";

console.log(TslTableColumn);
TslTableColumn.install = function (Vue) {
  Vue.component(TslTableColumn.name, TslTableColumn);
};

export default TslTableColumn;
