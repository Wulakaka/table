<template>
  <div class="bs-table">
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
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 50]"
      :page-size="size"
      background
      layout="prev, pager, next"
      :total="400"
    />
  </div>
</template>

<script>
import { Table, Pagination } from "element-ui";
export default {
  components: {
    Table,
    Pagination,
  },

  props: {
    stripe: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNum: {
      type: Number,
      default: 1,
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
    page: {
      get() {
        return this.pageNum;
      },
      set() {
        return this.$emit("update:pageNum");
      },
    },
    size: {
      get() {
        return this.pageSize;
      },
      set() {
        return this.$emit("update:pageSize");
      },
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
    handleSizeChange(size) {
      console.log(size);
      this.pageSize = size;
      this.pageNum = 1;
    },
    handleCurrentChange(page) {
      this.pageNum = page;
    },
  },
};
</script>

<style lang="scss">
$theme: #7dffff;
$bg: rgba(0, 0, 0, 0.6);
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
      border-radius: 2px 0 0 2px;
    }
    &:last-child {
      border-radius: 0 2px 2px 0;
    }
  }
  /*底部下边框*/
  &::before {
    height: 0px !important;
  }
}
.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background: rgba(112, 217, 217, 0.2) !important;
}
.el-pagination {
  margin-top: 37.7px;
  text-align: end;
  .font {
    font-family: "DIN" !important;
    font-weight: 400 !important;
    text-align: center !important; /* 黑白灰/ccc */
    color: #ccc !important;
  }
  &__total {
    @extend .font;
  }
  &.is-background {
    .el-pager li {
      @extend .font;
      background-color: $bg !important;
    }
    button {
      color: #fafafa !important;
      background-color: transparent !important;
    }
  }
}
.el-select {
  &-dropdown__item.selected {
    color: $theme !important;
  }
}
</style>
