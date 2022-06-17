<template>
  <tsl-willtable
    ref="willtable"
    :columns="columns"
    v-model="data"
    :maxHeight="maxHeight"
    :disabled="disabled"
    :showIcon="showIcon"
    :cellStyle="cellStyle"
    :cellClassName="cellClassName"
    :rowHeight="28"
  />
</template>

<script>
export default {
  name: "WillTable",
  data() {
    return {
      features: [
        {
          label: "显示数据类型icon",
          checked: true,
          handleChange: (checked) => {
            this.showIcon = checked;
          },
        },
        {
          label: "显示行多选",
          checked: true,
          handleChange: (checked) => {
            if (checked) {
              this.columns.unshift({
                type: "selection",
                width: 40,
                fixed: true,
              });
            } else {
              this.columns.shift();
            }
          },
        },
        {
          label: "固定列（序号、姓名）",
          checked: true,
          handleChange: (checked) => {
            this.columns.forEach((col) => {
              if (["sid", "name"].includes(col.key)) {
                col.fixed = checked;
              }
            });
          },
        },
        {
          label: "启用筛选与过滤（序号、姓名、日期）",
          checked: false,
          handleChange: (checked) => {
            this.columns.forEach((col) => {
              if (["sid", "name", "date"].includes(col.key)) {
                this.$set(col, "action", checked);
              }
            });
          },
        },
        {
          label: "禁止整表操作",
          checked: false,
          handleChange: (checked) => {
            this.disabled = checked;
          },
        },
        {
          label: "禁止序号操作",
          checked: false,
          handleChange: (checked) => {
            this.columns.some((col) => {
              if (col.key === "sid") {
                this.$set(col, "disabled", checked);
                return true;
              }
              return false;
            });
          },
        },
        {
          label: "自定义单元格样式",
          checked: false,
          handleChange: (checked) => {
            if (checked) {
              this.cellStyle = ({ rowIndex, columnIndex }) => {
                if (rowIndex % 2 === 1 && columnIndex % 2 === 0) {
                  return {
                    color: "#67C23A",
                  };
                }
              };
            } else {
              this.cellStyle = () => {};
            }
          },
        },
        {
          label: "自定义单元格类名",
          checked: false,
          handleChange: (checked) => {
            if (checked) {
              this.cellClassName = ({ rowIndex, columnIndex }) => {
                if (rowIndex % 2 === 0 && columnIndex % 2 === 1) {
                  return {
                    customChanged: true,
                  };
                }
              };
            } else {
              this.cellClassName = () => {};
            }
          },
        },
      ],
      columns: [],
      columnsData: [
        {
          type: "selection",
          width: 40,
          fixed: true,
        },
        {
          title: "序号",
          key: "sid",
          fixed: true,
          type: "number",
          width: 100,
        },
        {
          title: "姓名",
          key: "name",
          fixed: true,
          width: 120,
        },
        {
          title: "日期",
          key: "date",
          type: "date",
          width: 100,
        },
        {
          title: "工作岗位",
          key: "email",
          width: 300,
          type: "select",
          options: [
            {
              value: "Web前端开发",
              label: "Web前端开发",
            },
            {
              value: "Java开发",
              label: "Java开发",
            },
            {
              value: "Python开发",
              label: "Python开发",
            },
            {
              value: "Php开发",
              label: "Php开发",
            },
          ],
        },
        {
          title: "月份",
          key: "month",
          type: "month",
          width: 100,
        },
        {
          title: "地址",
          key: "address",
          width: 200,
        },
        {
          title: "标题",
          key: "title",
          width: 300,
        },
        {
          title: "内容",
          key: "paragraph",
          width: 300,
        },
        {
          title: "链接",
          key: "url",
          width: 200,
        },
        {
          title: "ip",
          key: "ip",
          width: 200,
          validate: (value) => {
            const pattern =
              /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g;
            return pattern.test(value);
          },
        },
        {
          title: "总金额",
          key: "sum",
          width: 200,
        },
        {
          title: "ID",
          key: "id",
          width: 200,
        },
        {
          title: "色值",
          key: "color",
          width: 200,
        },
      ],
      data: [],
      showIcon: true,
      disabled: false,
      maxHeight: 800,
      cellStyle: () => {},
      cellClassName: () => {},
    };
  },
  mounted() {
    this.getList();
    this.maxHeight = document.documentElement.clientHeight - 200;
  },
  methods: {
    getList() {
      axios
        .get("https://demo.kevinmint.com/1.json")
        .then((res) => {
          this.columns = this.columnsData;
          this.$refs.willtable.setData(res.data.list);
        })
        .catch(() => {});
    },
    getErrorRows() {
      console.log(this.$refs.willtable.getErrorRows());
    },
    getChangeData() {
      console.log(this.$refs.willtable.getChangeData());
    },
    // cellStyle({ rowIndex, columnIndex }) {
    //   if (rowIndex === 1) {
    //     return {
    //       color: 'red',
    //     };
    //   }
    //   if (columnIndex === 5) {
    //     return {
    //       color: 'green',
    //     };
    //   }
    // },
    add() {
      const obj = {};
      obj.id = new Date().getTime();
      this.columns.forEach((item) => {
        if (item.key) {
          obj[item.key] = "";
        }
      });
      this.$refs.willtable.addItem(obj);
    },
    remove() {
      this.$refs.willtable.removeItems(
        "sid",
        this.selection.map((s) => s.sid)
      );
    },
    linkGithub() {
      window.open("https://github.com/KevinMint55/vue-willtable", "_blank");
    },
  },
};
</script>

<style scoped></style>
