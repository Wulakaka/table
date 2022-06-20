export default {
  methods: {
    selectionChange() {
      const { states } = this.store;
      const selection = this.store.states.showData.filter(
        (item, index) => states.dataStatusList[index].checked
      );
      this.$emit("selection-change", selection);
      if (states.dataStatusList.every((item) => item.checked)) {
        this.$refs.theader.checkedAll = true;
        this.$refs.fixedTheader.checkedAll = true;
        this.$refs.theader.isIndeterminate = false;
        this.$refs.fixedTheader.isIndeterminate = false;
      } else {
        this.$refs.theader.checkedAll = false;
        this.$refs.fixedTheader.checkedAll = false;
        if (states.dataStatusList.some((item) => item.checked)) {
          this.$refs.theader.isIndeterminate = true;
          this.$refs.fixedTheader.isIndeterminate = true;
        } else {
          this.$refs.theader.isIndeterminate = false;
          this.$refs.fixedTheader.isIndeterminate = false;
        }
      }
    },
  },
};
