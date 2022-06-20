<template>
  <div class="content">
    <TslWilltable
      ref="willtable"
      v-model="data"
      :columns="columns"
      :max-height="maxHeight"
      :cell-style="cellStyle"
      show-icon
    ></TslWilltable>
    <div class="colored" style="height: 100px"></div>
  </div>
</template>

<script>
const tableData = require("../assets/willtableData.json");
export default {
  name: "TestWilltable",

  data() {
    return {
      // columns: [],
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
          width: 100,
        },
        {
          title: "开门次数",
          key: "count",
          width: 100,
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
          width: 200,
        },
        {
          title: "所属居委",
          key: "committee",
          width: 300,
        },
      ],
      data: [],
      maxHeight: 800,
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
      return rowIndex % 2 ? { background: "#f7f7fe" } : {};
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 1000px;
  margin: auto;
}

.colored {
  background: mix(white, #6266ea, 95);
}
</style>
