<template>
  <div
    ref="dropdown"
    v-clickoutside="openDropdown"
    class="bs-dropdown-wrapper"
    :class="{ active: parseInt(dropdown.index) >= 0 }"
    :style="{
      top: `${$parent.$refs.wrapper.offsetTop + store.states.theaderHeight}px`,
      left: left,
    }"
  >
    <div class="bs-sort">
      <span
        :class="{ active: dropdown.sort == 'ascending' }"
        @click="sort('ascending')"
        >升序</span
      >
      <span
        :class="{ active: dropdown.sort == 'descending' }"
        @click="sort('descending')"
        >降序</span
      >
    </div>
    <div class="bs-filter">
      <div v-if="false" class="title">名称<span>（计数）</span></div>
      <ul class="content">
        <li v-for="(item, key) in dropdown.list" :key="key">
          <el-checkbox
            v-model="item.checked"
            size="mini"
            style="margin-right: 2px"
          >
          </el-checkbox>
          <p>
            <span :title="key">{{ key }}</span>
            <i v-if="false">（{{ item.count }}）</i>
          </p>
        </li>
      </ul>
      <div class="btns">
        <span @click="openDropdown">取消</span>
        <span @click="handleFilter">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Checkbox } from 'element-ui';
import clickoutside from '../directives/clickoutside';

export default {
  directives: { clickoutside },
  components: {
    'el-checkbox': Checkbox,
  },
  props: {
    columnsWidth: {
      type: Array,
      default: () => [],
    },
    fixedCount: [String, Number],
    value: {
      type: Object,
      default: () => ({}),
    },
    store: {
      required: true,
    },
  },
  data() {
    return {
      left: 0,
    };
  },
  computed: {
    dropdown() {
      return this.store.states.dropdown;
    },
  },
  watch: {
    'dropdown.index': {
      handler(val) {
        if (!val) return;
        let left;
        if (this.dropdown.index < this.fixedCount) {
          left =
            this.store.states.tableBodyLeft +
            this.columnsWidth
              .filter((item, index) => index <= this.dropdown.index)
              .reduce((sum, item) => sum + item, 0);
        } else {
          left = this.columnsWidth
            .filter((item, index) => index <= this.dropdown.index)
            .reduce((sum, item) => sum + item, 0);
        }
        this.$nextTick(() => {
          left =
            left -
            this.$refs.dropdown.offsetWidth +
            this.$parent.$refs.wrapper.offsetLeft -
            this.store.states.tableBodyLeft;
          if (left < this.$parent.$refs.wrapper.offsetLeft) {
            left = this.$parent.$refs.wrapper.offsetLeft;
          }
          this.left = `${left}px`;
        });
      },
    },
  },
  methods: {
    openDropdown() {
      this.store.openDropdown();
    },
    sort(type) {
      this.store.sort(type);
    },
    handleFilter() {
      let haveChecked = false;
      Object.keys(this.dropdown.list).forEach((key) => {
        if (this.dropdown.list[key].checked) {
          haveChecked = true;
        }
      });
      if (!haveChecked) {
        return this.resetFilter();
      }
      this.store.handleFilter();
      this.$parent.handleResize();
    },
    resetFilter() {
      this.store.resetFilter();
      this.$parent.handleResize();
    },
  },
};
</script>

<style lang="scss">
.bs-dropdown-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  min-width: 320px;
  opacity: 0;
  transform: rotateX(90deg);
  transform-origin: top center;
  transition: transform 0.3s;
  border-radius: 2px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(54px);
  overflow-y: auto;

  &.active {
    opacity: 1;
    transform: rotateX(0);
  }
}

.bs-sort {
  margin-left: 24px;
  margin-top: 24px;
  display: flex;
  font-family: 'Microsoft YaHei';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  span {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 4px 8px;
    transition: all 0.3s;
    &.active {
      color: #bdffff;
    }
    &:hover {
      color: #bdffff;
    }
    &:before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 2px;
    }
    &:first-child {
      &:before {
        background: url('../assets/ascending.png') center center no-repeat;
        background-size: contain;
      }
    }
    &:last-child {
      &:before {
        background: url('../assets/descending.png') center center no-repeat;
        background-size: contain;
      }
    }
  }
}

.bs-filter {
  padding: 4px;
  .title {
    font-size: 13px;
    padding: 2px 6px;
  }
  .content {
    margin-top: 25px;
    margin-left: 13px;
    margin-bottom: 4px;

    overflow-y: auto;
    max-height: 300px;

    li {
      width: 295px;
      height: 40px;

      display: flex;
      align-items: center;
      padding: 12px;
      &:hover {
        color: #bdffff;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
      }
    }
    p {
      display: flex;
      margin-left: 12px;
      span {
        display: inline-block;
        max-width: 200px;
        font-family: 'Microsoft YaHei';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .btns {
    margin-top: 26px;
    margin-right: 24px;
    margin-bottom: 28px;
    font-size: 13px;

    text-align: end;
    font-family: 'Microsoft YaHei';
    font-style: normal;
    font-weight: 400;
    span {
      display: inline-block;
      cursor: pointer;
      transition: all 0.5s;
      padding: 0 4px;
      border-radius: 2px;
      &:hover {
        color: #bdffff;
      }
      &:first-child {
        color: #7dffff;
        border: 1px solid #7dffff;
      }
      &:last-child {
        background: linear-gradient(271.51deg, #7dffff 1.97%, #9affdb 99.89%);
        color: #333333;
        margin-left: 16px;
      }
    }
  }
}
</style>
