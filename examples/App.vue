<template>
  <div class="app">
    <TestTable />
    <Selection />
    <Expand />
  </div>
</template>

<script>
import TestTable from "./components/TestTable";
import Selection from "./components/Selection";
import Expand from "./components/Expand";
export default {
  name: "App",
  components: {
    TestTable,
    Selection,
    Expand,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.app {
  background-color: #fafafa;
}
</style>
