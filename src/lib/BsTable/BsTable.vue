<template>
  <Table
    v-bind="$attrs"
    v-on="$listeners"
    :highlight-current-row="highlightCurrentRow"
    :stripe="stripe"
  >
    <slot />
  </Table>
</template>

<script>
import { Table } from "element-ui";
export default {
  components: {
    Table,
  },
  props: {
    highlightCurrentRow: {
      type: Boolean,
      default: true,
    },
    stripe: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
