<template>
  <div
    class="bs-tbody"
    :class="{
      fixed,
      scrollY,
      empty: showData.length === 0,
    }"
    :style="{
      top: fixed ? `${store.states.theaderHeight}px` : '',
    }"
  >
    <div
      v-for="(trFixed, yFixedIndex) in rowFixedData"
      :key="yFixedIndex + 'yFixedIndex'"
      class="bs-tr bs-tr__fixed"
      :class="{ 'row-fixed__last': yFixedIndex === rowFixedNum - 1 }"
      :style="[{ top: yFixedIndex * store.states.rowHeight + 'px' }]"
    >
      <div
        v-for="(thFixed, xFixedIndex) in columns"
        v-show="thFixed.fixed || allShow"
        :key="xFixedIndex + 'fixedx'"
        class="bs-td"
        :title="trFixed[thFixed.key]"
        :style="
          styleObj(
            trFixed,
            thFixed,
            yFixedIndex + store.states.visibleRowStartIndex,
            xFixedIndex,
            columnsWidth
          )
        "
        :class="
          columnClass(
            trFixed,
            thFixed,
            yFixedIndex + store.states.visibleRowStartIndex,
            xFixedIndex
          )
        "
        :data-key="thFixed.key"
        @mouseenter="
          multiSelect(
            $event,
            xFixedIndex,
            yFixedIndex + store.states.visibleRowStartIndex,
            thFixed.type
          )
        "
        @mousedown.prevent="
          selectCell(
            $event,
            xFixedIndex,
            yFixedIndex + store.states.visibleRowStartIndex,
            thFixed.type
          )
        "
      >
        <TableColumn
          key="fixed"
          :tr="trFixed"
          :th="thFixed"
          :store="store"
          :y-index="yFixedIndex"
          :x-index="xFixedIndex"
          :columns-width="columnsWidth"
          :cell-class-name="cellClassName"
          @selectionChange="selectionChange"
        />
      </div>
    </div>

    <!-- 下面是不固定的 -->
    <div
      :style="{
        width: `${store.states.tableWidth}px`,

        height: `${
          showData.length ? showData.length * store.states.rowHeight : 80
        }px`,
        transform: `translate3d(
          -${fixed ? 0 : store.states.tableBodyLeft}px,
          -${store.states.tableBodyTop}px,
          0
        )`,
      }"
    >
      <div
        v-for="(tr, yIndex) in domData"
        :key="yIndex"
        class="bs-tr"
        :style="trTransform(yIndex, false)"
      >
        <div
          v-for="(th, xIndex) in columns"
          v-show="th.fixed || allShow"
          :key="xIndex"
          class="bs-td"
          :style="
            styleObj(
              tr,
              th,
              yIndex + store.states.visibleRowStartIndex,
              xIndex,
              columnsWidth
            )
          "
          :class="
            columnClass(
              tr,
              th,
              yIndex + store.states.visibleRowStartIndex,
              xIndex
            )
          "
          :data-key="th.key"
          @mouseenter="
            multiSelect(
              $event,
              xIndex,
              yIndex + store.states.visibleRowStartIndex,
              th.type
            )
          "
          @mousedown.prevent="
            selectCell(
              $event,
              xIndex,
              yIndex + store.states.visibleRowStartIndex,
              th.type
            )
          "
        >
          <TableColumn
            key="not-fixed"
            :tr="tr"
            :th="th"
            :store="store"
            :y-index="yIndex"
            :x-index="xIndex"
            :columns-width="columnsWidth"
            :cell-class-name="cellClassName"
            @selectionChange="selectionChange"
          />
        </div>
      </div>
      <div v-if="showData.length === 0 && !fixed" class="bs-empty-block">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import TableColumn from './TableColumn.vue';

export default {
  components: {
    TableColumn,
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    rowFixedNum: {
      type: Number,
    },
    rowFixedData: {
      type: Array,
    },
    allShow: Boolean,
    columnsWidth: {
      type: Array,
      default: () => [],
    },
    cellStyle: {
      type: [Object, Function],
      default: () => () => ({}),
    },
    cellClassName: {
      type: [Object, Function],
      default: () => () => ({}),
    },
    store: {
      required: true,
      type: Object,
    },
    scrollY: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    trTransform({ rowFixedNum }) {
      return (index, isFixed) => {
        const { visibleRowStartIndex, rowHeight } = this.store.states;
        const baseNum = isFixed ? 0 : rowFixedNum + visibleRowStartIndex;
        let y = (index + baseNum) * rowHeight;

        return {
          transform: `translate3d(
            0,
            ${y}px,
            0
          )`,
        };
      };
    },
    rowHeight() {
      return this.store.states.rowHeight;
    },
    columns() {
      return this.store.states.columns;
    },

    showData() {
      return this.store.states.showData;
    },
    domData({ rowFixedNum }) {
      const { domData } = this.store.states;
      return domData.slice(rowFixedNum);
    },
  },

  methods: {
    selectionChange() {
      this.$parent.selectionChange();
    },
    multiSelect(e, x, y, columnType) {
      this.store.multiSelect(e, x, y, columnType);
    },
    selectCell(e, x, y, type) {
      this.$parent.selectCell(e, x, y, type);
    },

    styleObj(row, column, rowIndex, columnIndex, columnsWidth) {
      return {
        width: `${columnsWidth[columnIndex]}px`,
        height: `${this.rowHeight}px`,
        justifyContent: column.align,
        ...this.cellStyle({
          row,
          column,
          rowIndex,
          columnIndex,
        }),
      };
    },
    columnClass(row, column, rowIndex, columnIndex) {
      return {
        disabled: column.disabled,
        selection: column.type === 'selection',
        error: !this.store.verify(column, row[column.key], rowIndex),
        checked: this.store.states.dataStatusList[rowIndex].checked,
        // 扩展自定义类名
        ...this.cellClassName({
          row,
          column,
          rowIndex,
          columnIndex,
        }),
      };
    },
  },
};
</script>

<style lang="scss">
.bs-tbody {
  position: relative;
  font-size: 12px;
  overflow: hidden;
  user-select: none;
  > div {
    position: relative;
  }

  &.fixed {
    position: absolute;
    left: 0;
    box-shadow: 0 5px 20px rgba(160, 160, 160, 0.6);
    background-color: #000 !important;
    overflow-x: hidden;
    user-select: none;
    z-index: 2;
  }
  &.scrollY {
    padding-bottom: 8px;
  }
  .row-fixed__last {
    box-shadow: 0 10px 8px rgba(160, 160, 160, 0.2);
    background-color: #000;
  }
  .bs-tr {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    &__fixed {
      position: absolute;
      z-index: 3;
      background-color: #000;
    }
    &:nth-child(2n) {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 2px;
    }
  }

  .bs-td {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 0;
    &.selection {
      justify-content: center;
    }

    &.disabled {
      color: #c5c5c5;
    }

    &.error {
      background-color: #ff4c42 !important;
    }

    &.checked {
      background-color: change-color(#7dffff, $alpha: 0.06);
    }
  }
}

.bs-cell-content {
  width: 100%;
  text-indent: 4px;
  font-family: 'DIN', 'Aria', 'Microsoft YaHei';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

// 数据为空
.bs-empty-block {
  position: relative;
  z-index: 9;
  font-size: 14px;
  padding: 30px;
  text-align: center;
  color: #909399;
}
</style>
