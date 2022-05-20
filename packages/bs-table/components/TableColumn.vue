<template>
  <div>
    <el-checkbox
      v-if="
        th.type === 'selection' &&
        dataStatusList[yIndex + store.states.visibleRowStartIndex]
      "
      v-model="
        dataStatusList[yIndex + store.states.visibleRowStartIndex].checked
      "
      size="mini"
      @change="selectionChange"
    ></el-checkbox>
    <div v-else-if="th.type === 'pic'" class="bs-css-pic">
      <el-image
        :src="tr[th.key]"
        fit="cover"
        :style="imageStyle(th)"
        :preview-src-list="[tr[th.key]]"
      />
    </div>
    <OverflowTooltip
      v-else
      class="bs-cell-content"
      :style="{ 'max-width': `${columnsWidth[xIndex]}px` }"
      :content="format(tr[th.key], th.type, th.format)"
    ></OverflowTooltip>
  </div>
</template>

<script>
import { Checkbox, Image } from 'element-ui';
import OverflowTooltip from './OverflowTooltip';

export default {
  components: {
    'el-checkbox': Checkbox,
    'el-image': Image,
    OverflowTooltip,
  },
  props: {
    store: {
      required: true,
    },
    th: {
      type: Object,
      default() {
        return {};
      },
    },
    tr: {
      type: Object,
      default() {
        return {};
      },
    },
    yIndex: {
      type: Number,
      default: 0,
    },
    xIndex: {
      type: Number,
      default: 0,
    },
    columnsWidth: {
      type: Array,
      default: () => [],
    },
    cellClassName: {
      type: [Object, Function],
      default: () => () => ({}),
    },
    cellStyle: {
      type: [Object, Function],
      default: () => () => ({}),
    },
    allShow: Boolean,
  },
  computed: {
    imageStyle() {
      return (th) => {
        const { width, height, radius } = th.picStyle;
        return {
          width,
          'border-radius': radius,
          height,
        };
      };
    },
    dataStatusList() {
      return this.store.states.dataStatusList;
    },
  },
  methods: {
    selectionChange() {
      this.$emit('selectionChange');
    },

    format(value, type, format = true) {
      if (!format) return value;
      if (!value) return;
      if (type === 'number') {
        if (!parseInt(value, 10)) {
          return value;
        }
        return parseInt(value, 10).toLocaleString();
      }
      return value;
    },
  },
};
</script>
