<template>
  <div class="page">
    <BsTable />
  </div>
</template>

<script>
import BsTable from "./lib/BsTable/index.vue";

export default {
  name: "App",
  components: {
    BsTable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  width: 100vw;
  background-color: rgb(23, 21, 21);
  border: 1px solid red;
}
</style>
