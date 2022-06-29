<template>
  <div>
    <tsl-table :data="tableData" stripe style="width: 100%">
      <tsl-table-column type="expand">
        <template #default="props">
          <div
            style="
              display: grid;
              grid-template-columns: auto 1fr auto 1fr;
              grid-gap: 20px;
              padding-left: 62px;
            "
          >
            <div style="color: #999999">商品名称</div>
            <div style="color: #666666">{{ props.row.name }}</div>
            <div style="color: #999999">所属店铺</div>
            <div style="color: #666666">{{ props.row.shop }}</div>
            <div style="color: #999999">商品 ID</div>
            <div style="color: #666666">{{ props.row.id }}</div>
            <div style="color: #999999">店铺 ID</div>
            <div style="color: #666666">{{ props.row.shopId }}</div>
            <div style="color: #999999">商品分类</div>
            <div style="color: #666666">{{ props.row.category }}</div>
            <div style="color: #999999">店铺地址</div>
            <div style="color: #666666">{{ props.row.address }}</div>
            <div style="color: #999999">商品描述</div>
            <div style="color: #666666">{{ props.row.desc }}</div>
          </div>
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
  name: "TableExpand",
  data() {
    return {
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

<style></style>
