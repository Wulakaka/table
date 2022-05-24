<template>
  <Table
    class="tsl-table"
    :class="[theme]"
    v-bind="$attrs"
    v-on="$listeners"
    row-class-name="body-row"
    cell-class-name="body-cell"
    header-row-class-name="header-row"
    header-cell-class-name="header-cell"
    :stripe="theme === 'dark' ? true : stripe"
  >
    <slot />
  </Table>
</template>

<script>
import { Table } from "element-ui";
export default {
  name: "TslTable",
  components: {
    Table,
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: "dark",
    },
    stripe: {
      type: Boolean,
      default: false,
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
      this.$emit("size-change", size);
    },
    handleCurrentChange(page) {
      this.$emit("current-change", page);
    },
  },
};
</script>

<style lang="scss">
$primary: (
  dark: #70d9d9,
  light: #6266ea,
);
$colors: (
  dark: (
    //  table
    table-background: #222222,
    header-cell-background: rgba(0, 0, 0, 0.4),
    header-cell-color: #cccccc,
    body-row-background: rgba(0, 0, 0, 0.2),
    body-row-hover-background: #272d2d,
    body-cell-color: #eeeeee,
    // checkbox
    checkbox-color: map-get($primary, "dark"),
    checkbox-inner-after-color: #333333,
  ),
  light: (
    //  table
    table-background: transparent,
    header-cell-background: change-color(#6266ea, $alpha: 0.04),
    header-cell-color: #333,
    body-row-background: rgba(255, 255, 255, 0.9),
    body-row-hover-background: #f1f1f9,
    body-cell-color: #666,
    // checkbox
    checkbox-color: map-get($primary, "light"),
    checkbox-inner-after-color: white,
  ),
);

@mixin theme($theme) {
  &.el-table {
    background: map-get($colors, $theme, "table-background");
    tr {
      background: transparent;
      th.el-table__cell.gutter {
        background: transparent;
      }
    }

    .header-row {
      background: map-get($colors, $theme, "header-row-background");
      .header-cell {
        background: map-get($colors, $theme, "header-cell-background");
        color: map-get($colors, $theme, "header-cell-color");
        border-color: transparent;
        padding: 6px 0;
      }
    }
    &.el-table--striped .el-table__body tr.el-table__row--striped {
      td.el-table__cell {
        background: map-get($colors, $theme, "body-row-background");
      }
      &:hover {
        td.el-table__cell {
          background: map-get($colors, $theme, "body-row-hover-background");
        }
      }
    }
    .body-row {
      background: transparent;
      .body-cell {
        background: transparent;
        border-color: transparent;
        color: map-get($colors, $theme, "body-cell-color");
      }

      &:hover .body-cell {
        background: map-get($colors, $theme, "body-row-hover-background");
      }
    }
  }

  .el-checkbox {
    .el-checkbox__inner {
      border-radius: 4px;
      &:hover {
        border-color: map-get($colors, $theme, "checkbox-color");
      }
      &::after {
        border-color: map-get($colors, $theme, "checkbox-inner-after-color");
      }
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: map-get($colors, $theme, "checkbox-color");
      border-color: map-get($colors, $theme, "checkbox-color");
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      background-color: map-get($colors, $theme, "checkbox-inner-after-color");
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: map-get($colors, $theme, "checkbox-color");
      border-color: map-get($colors, $theme, "checkbox-color");
    }
  }
}

.tsl-table {
  &.dark {
    @include theme("dark");
  }
  &.light {
    @include theme("light");
  }
}

//$theme: #7dffff;
//$bg: rgba(0, 0, 0, 0.6);
//.el-table {
//  background-color: transparent !important;
//  .el-table__expanded-cell {
//    background-color: transparent !important;
//  }
//  th.el-table__cell {
//    background-color: transparent !important;
//  }
//  tbody {
//    background-color: transparent;
//  }
//  .head-row {
//    font-family: "Microsoft YaHei";
//    font-style: normal;
//    font-weight: 700;
//    font-size: 16px;
//    color: #cccccc;
//  }
//  .row {
//    height: 48px;
//    padding: 0;
//    font-family: "DIN", Arial, "Microsoft YaHei";
//    font-style: normal;
//    font-weight: 400;
//    font-size: 14px;
//    color: #eeeeee;
//  }
//  .row__stripe {
//    background: rgba(255, 255, 255, 0.1);
//    border-radius: 10px;
//  }
//  .transparent {
//    background-color: transparent;
//  }
//  /*头部下边框*/
//  thead tr th.is-leaf {
//    border: 0px solid #ebeef5 !important;
//    border-right: none;
//  }
//  thead tr th:nth-last-of-type(2) {
//    border-right: 0px solid #ebeef5 !important;
//  }
//
//  /*表格内下边框*/
//  &__row > td {
//    border-color: transparent !important;
//    /*border-collapse: collapse和border-radius不兼容,border需要在td/th上面设置,改动需要手动刷新*/
//    &:first-child {
//      border-radius: 2px 0 0 2px;
//    }
//    &:last-child {
//      border-radius: 0 2px 2px 0;
//    }
//  }
//  /*底部下边框*/
//  &::before {
//    height: 0px !important;
//  }
//}
//.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
//  background: rgba(112, 217, 217, 0.2) !important;
//}
//.el-pagination {
//  margin-top: 37.7px;
//  text-align: end;
//  .font {
//    font-family: "DIN" !important;
//    font-weight: 400 !important;
//    text-align: center !important; /* 黑白灰/ccc */
//    color: #ccc !important;
//  }
//  &__total {
//    @extend .font;
//  }
//  &.is-background {
//    .el-pager li {
//      @extend .font;
//      background-color: $bg !important;
//    }
//    button {
//      color: #fafafa !important;
//      background-color: transparent !important;
//    }
//  }
//}
//.el-select {
//  &-dropdown__item.selected {
//    color: $theme !important;
//  }
//}
</style>
