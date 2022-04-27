<template>
  <div>
    <Table :data="tableList" highlight-current-row>
      <table-column
        prop="name"
        label="姓名"
        :filters="testFilter"
        :filter-method="test"
      ></table-column>
      <table-column prop="age" label="年龄"></table-column>
    </Table>
    <div>----------------------------------------------</div>
    <BsTable :data="tableList">
      <BsTableColum prop="name" label="姓名" />
      <BsTableColum prop="age" label="年龄" />
    </BsTable>
  </div>
</template>

<script>
import { Table, TableColumn } from "element-ui";

import BsTable from "./lib/BsTable/BsTable.vue";
import BsTableColum from "./lib/BsTable/BsTableColum.vue";

export default {
  name: "App",
  components: {
    Table,
    TableColumn,
    BsTable,
    BsTableColum,
  },
  data() {
    return {
      tableList: [
        {
          name: "张三",
          age: 18,
        },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
      ],
      testFilter: [
        {
          text: "张三1",
          value: "张三1",
        },
        { text: "张三2", value: "张三2" },
      ],
    };
  },
  methods: {
    test(value, row, column) {
      console.log(value, row, column);
      const property = column["property"];
      return value === row[property];
    },
  },
};
</script>

<style lang="scss" scoped></style>
