<template>
  <div class="bs-table">
    <TslTable :data="tableList" tsl theme="dark" height="400" stripe>
      <TslTableColumn type="selection" fixed />
      <TslTableColumn type="index" />
      <TslTableColumn prop="name" label="姓名" type="img" />
      <TslTableColumn
        prop="age"
        label="年龄"
        sortable
        :filters="testFilter"
        :filter-method="() => {}"
      />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" fixed="right" />
    </TslTable>
    <TslTable stripe :data="tableList" theme="light" height="400" border>
      <TslTableColumn type="selection" fixed />
      <TslTableColumn type="index" />
      <TslTableColumn prop="name" label="姓名" type="img" />
      <TslTableColumn
        prop="age"
        label="年龄"
        sortable
        :filters="testFilter"
        :filter-method="() => {}"
      />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" />
      <TslTableColumn prop="name" label="姓名" />
      <TslTableColumn prop="age" label="年龄" fixed="right" />
    </TslTable>
    <tsl-table :data="tableData" height="300" stripe>
      <tsl-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </tsl-table-column>
      <tsl-table-column label="商品 ID" prop="id"> </tsl-table-column>
      <tsl-table-column label="商品名称" prop="name"> </tsl-table-column>
      <tsl-table-column label="描述" prop="desc"> </tsl-table-column>
    </tsl-table>
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
      ],
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
        },
      ],
    };
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
