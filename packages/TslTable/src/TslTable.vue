<template>
  <Table
    ref="table"
    class="tsl-table"
    :class="[theme]"
    v-bind="$attrs"
    v-on="$listeners"
    :row-class-name="getRowClassName"
    :cell-class-name="
      (payload) => mergeClass(payload, cellClassName, 'body-cell')
    "
    :header-row-class-name="
      (payload) => mergeClass(payload, headerRowClassName, 'header-row')
    "
    :header-cell-class-name="
      (payload) => mergeClass(payload, headerCellClassName, 'header-cell')
    "
    @selection-change="handleSelectionChange"
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
    rowClassName: {
      type: [String, Function],
      required: false,
      default: "",
    },
    cellClassName: {
      type: [String, Function],
      required: false,
      default: "",
    },
    headerRowClassName: {
      type: [String, Function],
      required: false,
      default: "",
    },
    headerCellClassName: {
      type: [String, Function],
      required: false,
      default: "",
    },
  },
  data() {
    return {
      multipleSelection: [],
    };
  },
  computed: {
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
  mounted() {
    // 调整滚动条宽
    this.$refs.table.layout.gutterWidth = 8;
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
      this.multipleSelection = val;
    },
    getCustomClass(propClass, payload) {
      if (propClass) {
        if (typeof propClass === "string") {
          return propClass;
        } else {
          if (typeof propClass === "function") {
            return propClass(payload);
          }
        }
      }
      return "";
    },
    mergeClass(payload, propClass, defaultClassName) {
      const customClass = this.getCustomClass(propClass, payload);
      return `${defaultClassName} ${customClass}`;
    },
    getRowClassName({ row, rowIndex }) {
      const classes = ["body-row"];
      if (this.multipleSelection.includes(row)) {
        classes.push("checked-row");
      }
      const customClass = this.getCustomClass(this.rowClassName, {
        row,
        rowIndex,
      });
      if (customClass) classes.push(customClass);

      return classes.join(" ");
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
    header-cell-background: #141414,
    header-cell-color: #cccccc,
    body-row-background: #1b1b1b,
    body-row-hover-background: #272d2d,
    body-row-checked-background: #272f2f,
    body-cell-color: #eeeeee,
    table-shadow: #fafafa,
    scrollbar-color: change-color(#cccccc, $alpha: 0.2),
    // checkbox
    checkbox-color: map-get($primary, "dark"),
    checkbox-inner-after-color: #333333,
  ),
  light: (
    //  table
    table-background: #fafafa,
    header-cell-background: #f2f2f9,
    header-cell-color: #333,
    body-row-background: #fefefe,
    body-row-hover-background: #f1f1f9,
    body-row-checked-background: #f1f1f9,
    body-cell-color: #666,
    table-shadow: #222222,
    scrollbar-color: change-color(#999999, $alpha: 0.2),
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
        border-bottom: 2px solid map-get($colors, $theme, "table-background");
        padding: 6px 0;
      }
    }

    .body-row {
      background: transparent;

      .body-cell {
        background: transparent;
        border-top: 2px solid map-get($colors, $theme, "table-background");
        border-bottom: 2px solid map-get($colors, $theme, "table-background");
        color: map-get($colors, $theme, "body-cell-color");
        &:first-child {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:last-child {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }

      &:hover .body-cell {
        background: map-get($colors, $theme, "body-row-hover-background");
      }

      &.hover-row .body-cell {
        background: map-get($colors, $theme, "body-row-hover-background");
      }

      &.current-row .body-cell {
        background: map-get($colors, $theme, "body-row-hover-background");
      }

      &.checked-row .body-cell {
        background: map-get($colors, $theme, "body-row-checked-background");
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

      &.hover-row {
        td.el-table__cell {
          background: map-get($colors, $theme, "body-row-hover-background");
        }
      }

      &.current-row .body-cell {
        background: map-get($colors, $theme, "body-row-hover-background");
      }

      &.checked-row .body-cell {
        background: map-get($colors, $theme, "body-row-checked-background");
      }
    }

    .el-table__body-wrapper {
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: map-get($colors, $theme, "table-color");
      }
      &::-webkit-scrollbar-corner {
        background-color: transparent;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: map-get($colors, $theme, "scrollbar-color");
        border-radius: 4px;
      }
    }

    .el-table__fixed-right::before,
    .el-table__fixed::before {
      background-color: transparent;
    }

    .el-table__fixed-right-patch {
      background-color: map-get($colors, $theme, "table-background");
    }

    .el-table--border th.el-table__cell,
    .el-table__fixed-right-patch {
      border-color: map-get($colors, $theme, "table-background");
    }

    .el-table__fixed,
    .el-table__fixed-right {
      box-shadow: 0 0 20px
        change-color(map-get($colors, $theme, "table-shadow"), $alpha: 0.12);
    }

    .el-table__fixed-body-wrapper {
      .body-row {
        .body-cell {
          background: map-get($colors, $theme, "table-background");
        }

        &:hover .body-cell {
          background: map-get($colors, $theme, "body-row-hover-background");
        }

        &.hover-row .body-cell {
          background: map-get($colors, $theme, "body-row-hover-background");
        }

        &.current-row .body-cell {
          background: map-get($colors, $theme, "body-row-hover-background");
        }

        &.checked-row .body-cell {
          background: map-get($colors, $theme, "body-row-checked-background");
        }
      }
    }
  }

  .el-checkbox {
    .el-checkbox__inner {
      border-radius: 4px;
      background-color: map-get($colors, $theme, "checkbox-inner-after-color");
      border: 1px solid #cccccc;

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

    .el-checkbox__input.is-focus .el-checkbox__inner {
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
