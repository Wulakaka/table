<template>
  <div class="bs-table">
    <TslTable :data="tableList">
      <TslTableColumn type="selection" />
      <TslTableColumn type="index" />
      <TslTableColumn prop="name" label="姓名" type="img" />
      <TslTableColumn
        prop="age"
        label="年龄"
        :filters="testFilter"
        :filter-method="() => {}"
      />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
    </TslTable>
  </div>
</template>

<script>
export default {
  name: "TestTable",
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

<style scoped></style>
