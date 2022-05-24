<template>
  <TableColumn
    v-bind="$attrs"
    v-on="$listeners"
    :show-overflow-tooltip="showOverflowTooltip"
    :align="align"
  >
    <slot />
  </TableColumn>
</template>

<script>
import { TableColumn, Checkbox as ElCheckbox } from "element-ui";
import Vue from "vue";
Vue.use(ElCheckbox);

export default {
  name: "TslTableColumn",
  components: {
    TableColumn,
  },
  props: {
    showOverflowTooltip: {
      type: Boolean,
      default: true,
    },
    align: {
      type: String,
      default: "center",
    },
  },
};
</script>

<style lang="scss">
$theme: #7dffff;

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: $theme !important;
  border-color: $theme !important;
  border-radius: 4px !important;
}
</style>
