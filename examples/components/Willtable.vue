<template>
  <div class="page-content white">
    <TslWilltable
      ref="willtable"
      v-model="data"
      :columns="columns"
      :max-height="maxHeight"
      :cell-style="cellStyle"
    ></TslWilltable>
  </div>
</template>

<script>
const tableData = require("../assets/willtableData.json");
export default {
  name: "TestWilltable",

  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 40,
          fixed: true,
        },
        {
          title: "序号",
          key: "sid",
          fixed: true,
          type: "number",
          width: 100,
        },
        {
          title: "预警时间",
          key: "date",
          type: "date",
          width: 200,
        },
        {
          title: "开门次数",
          key: "count",
          width: 200,
        },
        {
          title: "所属小区",
          key: "village",
          width: 300,
          type: "select",
          options: [
            {
              value: "汤臣一品",
              label: "汤臣一品",
            },
            {
              value: "汤臣一品1",
              label: "汤臣一品1",
            },
            {
              value: "汤臣一品2",
              label: "汤臣一品2",
            },
            {
              value: "汤臣一品3",
              label: "汤臣一品3",
            },
          ],
        },

        {
          title: "楼栋号",
          key: "building",
          width: 400,
        },
        {
          title: "所属居委",
          key: "committee",
          width: 400,
        },
      ],
      data: [],
      maxHeight: 400,
    };
  },
  mounted() {
    this.getData();
    // this.maxHeight = 800;
  },
  methods: {
    getData() {
      console.log(tableData);
      this.$refs.willtable.setData(tableData);
    },
    cellStyle({ rowIndex }) {
      return rowIndex % 2 ? { background: "#f7f7fe" } : { background: "white" };
    },
  },
};
</script>

<style scoped lang="scss">
.page-content {
  padding: 20px;
  &.white {
    background: #fafafa;
  }
}
</style>
