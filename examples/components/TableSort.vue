<template>
  <div>
    <tsl-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      stripe
    >
      <tsl-table-column prop="date" label="日期" sortable width="180">
      </tsl-table-column>
      <tsl-table-column prop="name" label="姓名" sortable width="180">
      </tsl-table-column>
      <tsl-table-column prop="address" label="地址" :formatter="formatter">
      </tsl-table-column>
    </tsl-table>
    <tsl-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      stripe
      theme="light"
    >
      <tsl-table-column prop="date" label="日期" sortable width="180">
      </tsl-table-column>
      <tsl-table-column prop="name" label="姓名" sortable width="180">
      </tsl-table-column>
      <tsl-table-column prop="address" label="地址" :formatter="formatter">
      </tsl-table-column>
    </tsl-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    formatter(row) {
      return row.address;
    },
  },
};
</script>
