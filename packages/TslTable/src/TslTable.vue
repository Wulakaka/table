<template>
  <Table
    ref="table"
    class="tsl-table"
    :class="[theme]"
    v-bind="$attrs"
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
    v-on="$listeners"
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
  mounted() {
    // 调整滚动条宽
    this.$refs.table.layout.gutterWidth = 8;
    // 包装筛选事件
    this.wrapFilterClick(this.$refs.table.$refs.tableHeader);
    this.wrapFilterClick(this.$refs.table.$refs.fixedTableHeader);
    this.wrapFilterClick(this.$refs.table.$refs.rightFixedTableHeader);
    this.proxyFunctions();
  },
  methods: {
    proxyFunctions() {
      const el = this.$refs.table;
      for (const key in el) {
        if (
          Object.hasOwnProperty.call(el, key) &&
          typeof el[key] === "function"
        ) {
          this[key] = this[key] || el[key];
        }
      }
    },
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
    wrapFilterClick(el) {
      if (!el) return;
      const originHandler = el.handleFilterClick;
      el.handleFilterClick = (...args) => {
        originHandler(...args);
        // 在筛选框上增加类名
        Object.values(el.filterPanels).forEach((el) => {
          const themeClassName = `tsl_${this.theme}`;
          if (!Array.from(el.$el.classList).includes(themeClassName)) {
            el.$el.classList.add(themeClassName);
          }
        });
      };
    },
  },
};
</script>

<style lang="scss">
@use "sass:math";
$primary: (
  dark: #70d9d9,
  light: #6266ea,
);
$colors: (
  dark: (
    //  table
    background: #222222,
    table-background: #222222,
    header-cell-background: #141414,
    header-cell-color: #cccccc,
    header-cell-border-color: #222222,
    body-row-background: #1b1b1b,
    body-row-hover-background: #272d2d,
    body-row-checked-background: #272f2f,
    body-cell-color: #eeeeee,
    table-shadow: #fafafa,
    scrollbar-color: change-color(#cccccc, $alpha: 0.2),
    filter-icon: url("assets/icon-filter-dark.svg"),
    table-border-color: #666666,
    // checkbox
    checkbox:
      (
        color: map-get($primary, "dark"),
        inner-after-color: #333333,
        radius: 2px,
      ),
    checkbox-color: map-get($primary, "dark"),
    checkbox-inner-after-color: #333333,
    // filterPanel
    filter-panel:
      (
        background: #181818,
        color: #eeeeee,
        border: 1px solid rgba(255, 255, 255, 0.1),
        radius: 0,
        button-primary-background:
          linear-gradient(271.51deg, #7dffff 1.97%, #9affdb 99.89%),
      ),
  ),
  light: (
    //  table
    background: transparent,
    table-background: #fafafa,
    header-cell-background: #f2f2f9,
    header-cell-color: #333,
    header-cell-border-color: change-color(#6266ea, $alpha: 0.1),
    body-row-background: #fefefe,
    body-row-hover-background: #f1f1f9,
    body-row-checked-background: #f1f1f9,
    body-cell-color: #666,
    table-shadow: #222222,
    scrollbar-color: change-color(#999999, $alpha: 0.2),
    filter-icon: url("assets/icon-filter-light.svg"),
    table-border-color: change-color(map-get($primary, "light"), $alpha: 0.2),
    // checkbox
    checkbox:
      (
        color: map-get($primary, "light"),
        inner-after-color: white,
        radius: 4px,
      ),
    checkbox-color: map-get($primary, "light"),
    checkbox-inner-after-color: white,
    // filterPanel
    filter-panel:
      (
        background: white,
        color: #333333,
        border: 1px solid white,
        radius: 16px,
        button-primary-background:
          linear-gradient(134.03deg, #8286ef 14.88%, #4d52e2 84.04%),
      ),
  ),
);

@mixin table($theme) {
  &.el-table {
    background: map-get($colors, $theme, "background");

    &::before {
      background-color: map-get($colors, $theme, "table-background");
    }

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
        border-bottom: 1px solid
          map-get($colors, $theme, "header-cell-border-color");
        box-sizing: border-box;
        padding: 6px 0 5px;
        .cell {
          line-height: 36px;
        }
      }

      .el-table-column--selection .cell {
        padding-left: 14px;
      }
    }

    .body-row {
      background: transparent;

      .body-cell {
        background: transparent;
        border-top: 2px solid map-get($colors, $theme, "table-background");
        border-bottom: 2px solid map-get($colors, $theme, "table-background");
        color: map-get($colors, $theme, "body-cell-color");
        font-family: "DIN", Arial, "Microsoft YaHei";

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

    .el-table__expanded-cell {
      background-color: map-get($colors, $theme, "header-cell-background");
      border-bottom: 2px solid map-get($colors, $theme, "table-background");
    }

    th.el-table__cell > .cell.highlight {
      color: map-get($primary, $theme);
    }

    .ascending .sort-caret.ascending {
      border-bottom-color: #333333;
    }

    .descending .sort-caret.descending {
      border-top-color: #333333;
    }

    .el-table__expand-icon {
      color: #999999;
      $size: 16px;
      font-size: $size;
      & > .el-icon {
        margin-left: math.div(-$size, 2);
        margin-top: math.div(-$size, 2);
      }
    }
    .el-icon-arrow-right:before {
      content: "";
    }

    .el-table__column-filter-trigger {
      background-image: map-get($colors, $theme, "filter-icon");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 17px;

      i {
        &::before {
          content: "";
        }

        width: 13px;
      }
    }

    &.el-table--border {
      border-color: map-get($colors, $theme, "table-border-color");

      &::after,
      &::before {
        background-color: map-get($colors, $theme, "table-border-color");
      }

      .el-table__fixed-right::before,
      .el-table__fixed::before {
        background-color: map-get($colors, $theme, "table-border-color");
      }
    }

    &.el-table--border .header-row .el-table__cell,
    &.el-table--border .body-row .el-table__cell,
    .el-table__body-wrapper
      .el-table--border.is-scrolling-left
      ~ .el-table__fixed {
      border-radius: 0;
      border-right: 1px solid map-get($colors, $theme, "table-border-color");
      border-color: map-get($colors, $theme, "table-border-color");
      border-top-width: 0;
      border-bottom-width: 1px;
    }
  }
  @include checkbox($theme);
}

@mixin checkbox($theme) {
  .el-checkbox {
    .el-checkbox__inner {
      border-radius: map-get($colors, $theme, "checkbox", "radius");
      background-color: map-get(
        $colors,
        $theme,
        "checkbox",
        "inner-after-color"
      );
      border: 1px solid #cccccc;

      &:hover {
        border-color: map-get($colors, $theme, "checkbox", "color");
      }

      &::after {
        border-color: map-get($colors, $theme, "checkbox", "inner-after-color");
      }
    }

    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: map-get($colors, $theme, "checkbox", "color");
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: map-get($colors, $theme, "checkbox", "color");
      border-color: map-get($colors, $theme, "checkbox", "color");
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      background-color: map-get(
        $colors,
        $theme,
        "checkbox",
        "inner-after-color"
      );
    }

    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: map-get($colors, $theme, "checkbox", "color");
      border-color: map-get($colors, $theme, "checkbox", "color");
    }

    .el-checkbox__input.is-focus .el-checkbox__inner {
      border-color: map-get($colors, $theme, "checkbox", "color");
    }
  }
}

.tsl-table {
  &.dark {
    @include table("dark");
  }

  &.light {
    @include table("light");
  }
}

@mixin filterPanel($theme) {
  &.tsl_#{$theme} {
    border-radius: map-get($colors, $theme, "filter-panel", "radius");
    background: map-get($colors, $theme, "filter-panel", "background");
    border: map-get($colors, $theme, "filter-panel", "border");
    @include checkbox($theme);
    min-width: 320px;

    .el-table-filter__checkbox-group label.el-checkbox {
      line-height: 40px;
      margin: 0;
      padding: 0 10px;
      border-radius: 4px;
      color: map-get($colors, $theme, "filter-panel", "color");

      &:hover {
        background-color: change-color(map-get($primary, $theme), $alpha: 0.1);
        color: map-get($primary, $theme);

        .el-checkbox__inner {
          border-color: map-get($primary, $theme);
        }
      }
    }

    .el-table-filter__bottom {
      border: none;
      display: flex;
      flex-direction: row-reverse;
      padding: 0 24px 24px;
      $size: (
        dark: "small",
        light: "normal",
      );

      button {
        &:first-child {
          @include button($theme, map-get($size, $theme), false);
          @include button-primary($theme);
          margin-left: 14px;
        }

        &:nth-child(2) {
          @include button($theme, map-get($size, $theme));
          @include button-plain($theme);
        }
      }
    }
  }
}

@mixin button-primary($theme) {
  color: map-get($colors, $theme, "filter-panel", "background");
  background: map-get(
    $colors,
    $theme,
    "filter-panel",
    "button-primary-background"
  );
}

@mixin button-plain($theme) {
  color: map-get($primary, $theme);
  background: map-get($colors, $theme, "filter-panel", "background");
}

@mixin button($theme, $size, $border: true) {
  box-sizing: border-box;
  @if ($size == "normal") {
    height: 32px;
    width: 88px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 32px;
    @if ($border) {
      line-height: 30px;
      border-style: solid;
      border-width: 1px;
    }
  }
  @if ($size == "small") {
    height: 24px;
    width: 48px;
    border-radius: 2px;
    font-size: 12px;
    line-height: 24px;
    @if ($border) {
      line-height: 22px;
      border-style: solid;
      border-width: 1px;
    }
  }
}

.el-table-filter {
  @include filterPanel("dark");
  @include filterPanel("light");
}
</style>
