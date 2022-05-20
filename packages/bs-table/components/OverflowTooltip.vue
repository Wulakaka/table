<template>
  <el-tooltip
    ref="tooltip"
    v-model="visibleTooltip"
    placement="bottom"
    :content="content"
    :disabled="disabled"
  >
    <div v-bind="$attrs" ref="content" @mouseenter="onMouseenter">
      {{ content }}
    </div>
  </el-tooltip>
</template>

<script>
// import { Tooltip } from 'element-ui';

export default {
  name: 'OverflowTooltip',
  // components: {
  //   'el-tooltip': Tooltip,
  // },
  inheritAttrs: false,
  props: {
    content: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      visibleTooltip: false,
      disabled: false,
    };
  },
  methods: {
    onMouseenter() {
      if (!this.$refs.tooltip) return;
      const child = this.$refs.content;
      // 由于tooltip 触发过$destroy，会清理它与其它实例的连接，解绑它的全部指令及事件监听器。
      if (!child) return;
      const range = document.createRange();
      range.setStart(child, 0);
      range.setEnd(child, child.childNodes.length);
      const rangeWidth = Math.floor(range.getBoundingClientRect().width);
      // 从文档中剥离范围
      range.detach();
      console.log(rangeWidth);
      console.log('offsetWidth', child.offsetWidth);
      console.log('scrollWidth', child.scrollWidth);
      if (
        rangeWidth > child.offsetWidth ||
        child.scrollWidth > child.offsetWidth
      ) {
        this.disabled = false;
      } else {
        // this.$refs.tooltip.$destroy();
        this.disabled = true;
      }
    },
    hideTooltip() {
      this.visibleTooltip = false;
    },
  },
};
</script>

<style scoped></style>
