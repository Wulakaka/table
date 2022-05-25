<template>
  <TableColumn v-bind="$attrs" v-on="$listeners">
    <slot />
  </TableColumn>
</template>

<script>
import { TableColumn } from "element-ui";

export default {
  name: "TslTableColumn",
  components: {
    TableColumn,
  },
};
</script>

<style lang="scss"></style>
