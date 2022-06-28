<template>
  <div
    class="tsl-table"
    :class="[
      {
        'tsl-table--fit': fit,
        'tsl-table--striped': stripe,
        'tsl-table--border': border || isGroup,
        'tsl-table--hidden': isHidden,
        'tsl-table--group': isGroup,
        'tsl-table--fluid-height': maxHeight,
        'tsl-table--scrollable-x': layout.scrollX,
        'tsl-table--scrollable-y': layout.scrollY,
        'tsl-table--enable-row-hover': !store.states.isComplex,
        'tsl-table--enable-row-transition':
          (store.states.data || []).length !== 0 &&
          (store.states.data || []).length < 100,
      },
      tableSize ? `tsl-table--${tableSize}` : '',
      tableTheme ? `tsl-table--${tableTheme}` : '',
    ]"
    @mouseleave="handleMouseLeave($event)"
  >
    <!--  列内容  -->
    <div ref="hiddenColumns" class="hidden-columns"><slot></slot></div>
    <!--  显示表头  -->
    <div
      v-if="showHeader"
      ref="headerWrapper"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="tsl-table__header-wrapper"
    >
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : '',
        }"
      >
      </table-header>
    </div>
    <!--  表体  -->
    <div
      ref="bodyWrapper"
      class="tsl-table__body-wrapper"
      :class="[
        layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none',
      ]"
      :style="[bodyHeight]"
    >
      <table-body
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
          width: bodyWidth,
        }"
      >
      </table-body>
      <div
        v-if="!data || data.length === 0"
        ref="emptyBlock"
        class="tsl-table__empty-block"
        :style="emptyBlockStyle"
      >
        <span class="tsl-table__empty-text">
          <slot name="empty">{{ emptyText || t("el.table.emptyText") }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        ref="appendWrapper"
        class="tsl-table__append-wrapper"
      >
        <slot name="append"></slot>
      </div>
    </div>
    <!--  合计行  -->
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      ref="footerWrapper"
      v-mousewheel="handleHeaderFooterMousewheel"
      class="tsl-table__footer-wrapper"
    >
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : '',
        }"
      >
      </table-footer>
    </div>
    <!--  如果有左侧冻结列  -->
    <div
      v-if="fixedColumns.length > 0"
      ref="fixedWrapper"
      v-mousewheel="handleFixedMousewheel"
      class="tsl-table__fixed"
      :style="[
        {
          width: layout.fixedWidth ? layout.fixedWidth + 'px' : '',
        },
        fixedHeight,
      ]"
    >
      <div
        v-if="showHeader"
        ref="fixedHeaderWrapper"
        class="tsl-table__fixed-header-wrapper"
      >
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
        ></table-header>
      </div>
      <div
        ref="fixedBodyWrapper"
        class="tsl-table__fixed-body-wrapper"
        :style="[
          {
            top: layout.headerHeight + 'px',
          },
          fixedBodyHeight,
        ]"
      >
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{
            width: bodyWidth,
          }"
        >
        </table-body>
        <div
          v-if="$slots.append"
          class="tsl-table__append-gutter"
          :style="{ height: layout.appendHeight + 'px' }"
        ></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        ref="fixedFooterWrapper"
        class="tsl-table__fixed-footer-wrapper"
      >
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
        ></table-footer>
      </div>
    </div>
    <!--  如果有右侧冻结列  -->
    <div
      v-if="rightFixedColumns.length > 0"
      ref="rightFixedWrapper"
      v-mousewheel="handleFixedMousewheel"
      class="tsl-table__fixed-right"
      :style="[
        {
          width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
          right: layout.scrollY
            ? (border ? layout.gutterWidth : layout.gutterWidth || 0) + 'px'
            : '',
        },
        fixedHeight,
      ]"
    >
      <div
        v-if="showHeader"
        ref="rightFixedHeaderWrapper"
        class="tsl-table__fixed-header-wrapper"
      >
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
        ></table-header>
      </div>
      <div
        ref="rightFixedBodyWrapper"
        class="tsl-table__fixed-body-wrapper"
        :style="[
          {
            top: layout.headerHeight + 'px',
          },
          fixedBodyHeight,
        ]"
      >
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{
            width: bodyWidth,
          }"
        >
        </table-body>
        <div
          v-if="$slots.append"
          class="tsl-table__append-gutter"
          :style="{ height: layout.appendHeight + 'px' }"
        ></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        ref="rightFixedFooterWrapper"
        class="tsl-table__fixed-footer-wrapper"
      >
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth,
          }"
        ></table-footer>
      </div>
    </div>
    <!--  如果有右侧冻结列  -->
    <div
      v-if="rightFixedColumns.length > 0"
      ref="rightFixedPatch"
      class="tsl-table__fixed-right-patch"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px',
      }"
    ></div>
    <div
      v-show="resizeProxyVisible"
      ref="resizeProxy"
      class="tsl-table__column-resize-proxy"
    ></div>
  </div>
</template>

<script type="text/babel">
// import ElCheckbox from "element-ui/packages/checkbox";
import { debounce, throttle } from "throttle-debounce";
import {
  addResizeListener,
  removeResizeListener,
} from "element-ui/src/utils/resize-event";
import Mousewheel from "element-ui/src/directives/mousewheel";
import Locale from "element-ui/src/mixins/locale";
import Migrating from "element-ui/src/mixins/migrating";
import { createStore, mapStates } from "./store/helper";
import TableLayout from "./table-layout";
import TableBody from "./table-body";
import TableHeader from "./table-header";
import TableFooter from "./table-footer";
import { parseHeight } from "./util";

let tableIdSeed = 1;

export default {
  name: "TslElTable",

  directives: {
    Mousewheel,
  },
  components: {
    TableHeader,
    TableFooter,
    TableBody,
    // ElCheckbox,
  },

  mixins: [Locale, Migrating],

  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true,
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {},

    showHeader: {
      type: Boolean,
      default: true,
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true,
    },

    indent: {
      type: Number,
      default: 16,
    },

    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: "hasChildren",
          children: "children",
        };
      },
    },

    lazy: Boolean,

    load: Function,

    theme: {
      type: String,
      default: "dark",
    },
  },

  methods: {
    getMigratingConfig() {
      return {
        events: {
          expand: "expand is renamed to expand-change",
        },
      };
    },
    // 设置当前选中行
    setCurrentRow(row) {
      this.store.commit("setCurrentRow", row);
    },
    // 切换选中
    toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected, false);
      this.store.updateAllSelected();
    },
    // 切换展开行
    toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansionAdapter(row, expanded);
    },
    // 清空选择项
    clearSelection() {
      this.store.clearSelection();
    },
    // 清空筛选
    clearFilter(columnKeys) {
      this.store.clearFilter(columnKeys);
    },
    // 清空排序
    clearSort() {
      this.store.clearSort();
    },
    // 鼠标移出
    handleMouseLeave() {
      this.store.commit("setHoverRow", null);
      if (this.hoverState) this.hoverState = null;
    },
    // 更新纵向滚动
    updateScrollY() {
      const changed = this.layout.updateScrollY();
      if (changed) {
        this.layout.notifyObservers("scrollable");
        this.layout.updateColumnsWidth();
      }
    },
    // 在冻结列鼠标滚动
    handleFixedMousewheel(event, data) {
      const bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        const currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (
          data.pixelY > 0 &&
          bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop
        ) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },

    // 在表头和表底滚动鼠标
    handleHeaderFooterMousewheel(event, data) {
      const { pixelX, pixelY } = data;
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },

    // 同步滚动位置
    // TODO 使用 CSS transform
    syncPostion: throttle(20, function () {
      const { scrollLeft, scrollTop, offsetWidth, scrollWidth } =
        this.bodyWrapper;
      const {
        headerWrapper,
        footerWrapper,
        fixedBodyWrapper,
        rightFixedBodyWrapper,
      } = this.$refs;
      if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
      if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
      if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
      if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
      const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
      if (scrollLeft >= maxScrollLeftPosition) {
        this.scrollPosition = "right";
      } else if (scrollLeft === 0) {
        this.scrollPosition = "left";
      } else {
        this.scrollPosition = "middle";
      }
    }),

    // 添加滚动监听
    bindEvents() {
      this.bodyWrapper.addEventListener("scroll", this.syncPostion, {
        passive: true,
      });
      if (this.fit) {
        addResizeListener(this.$el, this.resizeListener);
      }
    },

    // 解绑滚动监听
    unbindEvents() {
      this.bodyWrapper.removeEventListener("scroll", this.syncPostion, {
        passive: true,
      });
      if (this.fit) {
        removeResizeListener(this.$el, this.resizeListener);
      }
    },

    // resize监听
    resizeListener() {
      if (!this.$ready) return;
      let shouldUpdateLayout = false;
      const el = this.$el;
      const { width: oldWidth, height: oldHeight } = this.resizeState;

      const width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      const height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },

    // 更新高度和宽度
    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
    },

    // 排序
    sort(prop, order) {
      this.store.commit("sort", { prop, order });
    },

    // 切换全选
    toggleAllSelection() {
      this.store.commit("toggleAllSelection");
    },
  },

  computed: {
    // 表格size
    tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },
    // 表格主题
    tableTheme() {
      return this.theme;
    },

    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },

    // height变更或最大高变更或左侧固定数大于0或右侧固定数大于0
    shouldUpdateHeight() {
      return (
        this.height ||
        this.maxHeight ||
        this.fixedColumns.length > 0 ||
        this.rightFixedColumns.length > 0
      );
    },

    // 样式-表体宽,减去滚动条宽度之后的宽
    bodyWidth() {
      const { bodyWidth, scrollY, gutterWidth } = this.layout;
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + "px" : "";
    },

    // 样式-表体高
    bodyHeight() {
      const { headerHeight = 0, bodyHeight, footerHeight = 0 } = this.layout;
      if (this.height) {
        return {
          height: bodyHeight ? bodyHeight + "px" : "",
        };
      } else if (this.maxHeight) {
        const maxHeight = parseHeight(this.maxHeight);
        if (typeof maxHeight === "number") {
          return {
            "max-height":
              maxHeight -
              footerHeight -
              (this.showHeader ? headerHeight : 0) +
              "px",
          };
        }
      }
      return {};
    },

    // 样式-表体有固定列时的高
    fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight
            ? this.layout.fixedBodyHeight + "px"
            : "",
        };
      } else if (this.maxHeight) {
        let maxHeight = parseHeight(this.maxHeight);
        if (typeof maxHeight === "number") {
          maxHeight = this.layout.scrollX
            ? maxHeight - this.layout.gutterWidth
            : maxHeight;
          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }
          maxHeight -= this.layout.footerHeight;
          return {
            "max-height": maxHeight + "px",
          };
        }
      }
      return {};
    },

    // 样式-有固定列时的整体高度
    fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0,
          };
        }
        return {
          bottom:
            this.layout.scrollX && this.data.length
              ? this.layout.gutterWidth + "px"
              : "",
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight
              ? this.layout.tableHeight + "px"
              : "",
          };
        }
        return {
          height: this.layout.viewportHeight
            ? this.layout.viewportHeight + "px"
            : "",
        };
      }
    },

    // 样式-无数据样式
    emptyBlockStyle() {
      if (this.data && this.data.length) return null;
      let height = "100%";
      if (this.layout.appendHeight) {
        height = `calc(100% - ${this.layout.appendHeight}px)`;
      }
      return {
        width: this.bodyWidth,
        height,
      };
    },

    ...mapStates({
      selection: "selection",
      columns: "columns",
      tableData: "data",
      fixedColumns: "fixedColumns",
      rightFixedColumns: "rightFixedColumns",
    }),
  },

  watch: {
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value);
      },
    },

    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value);
      },
    },

    currentRowKey: {
      immediate: true,
      handler(value) {
        if (!this.rowKey) return;
        this.store.setCurrentRowKey(value);
      },
    },

    data: {
      immediate: true,
      handler(value) {
        this.store.commit("setData", value);
      },
    },

    expandRowKeys: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.store.setExpandRowKeysAdapter(newVal);
        }
      },
    },
  },

  created() {
    this.tableId = "tsl-table_" + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
  },

  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    this.doLayout();

    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight,
    };

    // init filters
    this.store.states.columns.forEach((column) => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit("filterChange", {
          column,
          values: column.filteredValue,
          silent: true,
        });
      }
    });

    this.$ready = true;
  },

  destroyed() {
    this.unbindEvents();
  },

  data() {
    const { hasChildren = "hasChildren", children = "children" } =
      this.treeProps;
    this.store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // TreeTable 的相关配置
      indent: this.indent,
      lazy: this.lazy,
      lazyColumnIdentifier: hasChildren,
      childrenColumnName: children,
    });
    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader,
    });
    return {
      layout,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null,
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: "left",
    };
  },
};
</script>
