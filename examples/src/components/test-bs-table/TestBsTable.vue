<template>
  <div class="page">
    <bs-table
      class="test"
      ref="testTableRef"
      :columns="columns"
      :maxHeight="maxHeight"
      :rowHeight="0.96"
    />
  </div>
</template>

<script>
import { columnsData } from "./model";
export default {
  components: {
  },
  data() {
    return {
      columns: [],
      maxHeight: 16,
    };
  },
  methods: {},
  mounted() {
    this.columns = columnsData;
    const url =
      "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";

    this.$refs.testTableRef.setData([
      { name: "张三", address: "背景", index: 1, pic: url },
      { name: "张三2", address: "背景2", index: 2, pic: url },
      { name: "张三211", address: "背景2", index: 3, pic: url },
      { name: "张三4", address: "背景2", index: 4, pic: url },
      { name: "张三1", address: "背景2", index: 5, pic: url },
      { name: "张三1", address: "背景2", index: 6, pic: url },
      { name: "张三1", address: "背景2", index: 7, pic: url },
      { name: "张三1", address: "背景2", index: 8, pic: url },
      { name: "张三1", address: "背景2", index: 9, pic: url },
      { name: "张三1", address: "背景2", index: 10, pic: url },

      {
        name: "战三哇",
        address: "背景2",
        index: 2,
        pic: url,
      },
    ]);

    this.maxHeight = (document.documentElement.clientHeight - 200) / 15;
  },
};
</script>
<style lang="scss" scoped>
.page {
	height: 100vh;
	width: 100vw;
	background-color: #222;
	overflow: hidden;
	.test {
		margin: 0 auto;
		margin-top: 30px;
		width: 90vw;
	}
}
</style>
