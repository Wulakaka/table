<template>
  <div class="bs-table">
    <Table :data="tableList">
      <TableColum type="selection" />
      <TableColum type="index" />
      <TableColum prop="name" label="姓名" type="img" />
      <TableColum
        prop="age"
        label="年龄"
        :filters="testFilter"
        :filter-method="() => {}"
      />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
    </Table>
  </div>
</template>

<script>
import Table from "./Table.vue";
import TableColum from "./TableColum.vue";
import { Checkbox } from "element-ui";

export default {
  components: {
    Table,
    TableColum,
    // eslint-disable-next-line vue/no-unused-components
    ElCheckbox: Checkbox,
  },

  data() {
    return {
      tableList: [
        { name: "张三", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
        { name: "张三1", age: 18 },
        { name: "张三2", age: 18 },
        { name: "张三3", age: 18 },
      ],
      testFilter: [
        { text: "张三11111111111111", value: "张三1" },
        { text: "张三222222222222222", value: "张三2" },
        { text: "张三11111111111111", value: "张三1" },
        { text: "张三222222222222222", value: "张三2" },
        { text: "张三11111111111111", value: "张三1" },
        { text: "张三222222222222222", value: "张三2" },
      ],
    };
  },
};
</script>

<style lang="scss">
.bs-table {
  margin: 0 auto;
  width: 90%;
}
</style>
