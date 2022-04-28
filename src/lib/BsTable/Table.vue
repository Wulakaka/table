<template>
  <Table
    v-bind="$attrs"
    v-on="$listeners"
    height="400"
    :row-class-name="setRowClass"
    header-row-class-name="transparent"
    header-cell-class-name="transparent head-row"
    :row-style="rowStyle"
    :cell-style="cellStyle"
  >
    <slot />
  </Table>
</template>

<script>
import { Table } from "element-ui";
export default {
  components: {
    Table,
  },
  props: {
    stripe: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    transparent() {
      return {
        background: "transparent",
      };
    },
    rowStyle() {
      return {
        height: "48px",
      };
    },
    cellStyle() {
      return {
        padding: 0,
      };
    },
  },
  methods: {
    setRowClass({ row, rowIndex }) {
      console.log(row, rowIndex % 2);
      let classes = "row";
      if (this.stripe) {
        classes =
          rowIndex % 2 ? classes + " row__stripe" : classes + " transparent";
      }
      return classes;
    },
  },
};
</script>

<style lang="scss">
.el-table {
  background-color: transparent !important;
  .el-table__expanded-cell {
    background-color: transparent !important;
  }
  th.el-table__cell {
    background-color: transparent !important;
  }
  tbody {
    background-color: transparent;
  }
  .head-row {
    font-family: "Microsoft YaHei";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    color: #cccccc;
  }
  .row {
    height: 48px;
    padding: 0;
    font-family: "DIN", Arial, "Microsoft YaHei";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #eeeeee;
  }
  .row__stripe {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  .transparent {
    background-color: transparent;
  }
  /*头部下边框*/
  thead tr th.is-leaf {
    border: 0px solid #ebeef5 !important;
    border-right: none;
  }
  thead tr th:nth-last-of-type(2) {
    border-right: 0px solid #ebeef5 !important;
  }

  /*表格内下边框*/
  &__row > td {
    border-color: transparent !important;
    /*border-collapse: collapse和border-radius不兼容,border需要在td/th上面设置,改动需要手动刷新*/
    &:first-child {
      border-radius: 10px 0 0 10px;
    }
    &:last-child {
      border-radius: 0 10px 10px 0;
    }
  }
  /*底部下边框*/
  &::before {
    height: 0px !important;
  }
  .el-table__row:hover {
    color: black;
  }
}
</style>
