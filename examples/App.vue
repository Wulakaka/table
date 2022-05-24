<template>
  <div class="page">
    <TestTable />
  </div>
</template>

<script>
import TestTable from "./components/TestTable";

export default {
  name: "App",
  components: {
    TestTable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.page {
  background-color: rgb(23, 21, 21);
  border: 1px solid red;
}
</style>
