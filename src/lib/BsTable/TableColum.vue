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
import { TableColumn } from "element-ui";
export default {
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

<style lang="scss"></style>
