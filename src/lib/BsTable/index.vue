<template>
  <div class="bs-table">
    <Table :data="tableList">
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
      <TableColum prop="name" label="姓名" />
      <TableColum prop="age" label="年龄" />
    </Table>
  </div>
</template>

<script>
import Table from "./Table.vue";
import TableColum from "./TableColum.vue";
export default {
  components: {
    Table,
    TableColum,
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
