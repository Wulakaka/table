<template>
  <div class="menu">
    <div class="menuItem" v-for="(item,index) in menuListOption" :key="index">
      <div>{{item.name}}</div>
      <ul>
        <li v-for="obj in item.children" :key="obj.name">
          <router-link :to="'/'+obj.address">{{obj.name}}</router-link>
        </li>
        <!-- <li>
          <router-link to="/echart_pie">饼图</router-link>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      menuListOption: [
        {
          name: '头部标题',
          children: [
            {
              name: '样式1',
              address: 'title1',
            },
            {
              name: '样式2',
              address: 'title2',
            },
            {
              name: '样式3',
              address: 'title3',
            },
            {
              name: '样式4',
              address: 'title4',
            },
            {
              name: '样式5',
              address: 'title5',
            }
          ],
        },
        {
          name: '按钮',
          children: [
            {
              name: '主要按钮',
              address: 'btn1',
            },
            {
              name: '跟随按钮',
              address: 'btn2',
            },
            {
              name: '描边主按钮',
              address: 'btn3',
            },
            {
              name: '描边跟随按钮',
              address: 'btn4',
            },
            {
              name: '图标按钮-主操作',
              address: 'btn5',
            },
            {
              name: '图标按钮-辅助操作',
              address: 'btn6',
            },
            {
              name: 'BLOCK按钮',
              address: 'btn7',
            },
          ],
        },
        {
          name: '底部导航',
          children: [
            {
              name: '组合样式',
              address: 'footer_bar',
            },
          ],
        },
        {
          name: '楼层控件',
          children: [
            {
              name: '基本样式',
              address: 'floor_directory',
            },
            {
              name: '带上下切换按钮样式',
              address: 'floor_directory1',
            },
          ],
        },
        {
          name: 'BsNumFlap 数字翻牌器',
          children: [
            {
              name: '基础翻牌器',
              address: 'numplap1',
            },
            {
              name: '网格翻牌器',
              address: 'numplap2',
            },
          ],
        },
        {
          name: 'BsCountDown 倒计时',
          children: [
            {
              name: '基础倒计时',
              address: 'countdown1',
            },
            {
              name: '模块化倒计时-基础',
              address: 'countdown2',
            },
            {
              name: '模块化倒计时-强调',
              address: 'countdown3',
            },
            {
              name: '日历倒计时-基础',
              address: 'countdown4',
            },
            {
              name: '日历倒计时-强调',
              address: 'countdown5',
            },
          ],
        },
        {
          name: 'BsListTraffic 通行列表',
          children: [
            {
              name: '图文左右-较长',
              address: 'list_traffic1',
            },
            {
              name: '图文左右-较短',
              address: 'list_traffic2',
            },
            {
              name: '图文上下-常规',
              address: 'list_traffic3',
            },
            {
              name: '图文上下-警告',
              address: 'list_traffic4',
            },
          ],
        },
        {
          name: 'BsInputSearch 智能空间搜索引擎',
          children: [
            {
              name: '基础搜索',
              address: 'inputsearch1',
            },
            {
              name: '基础搜索-输入联想',
              address: 'inputsearch2',
            },
            {
              name: '批量搜索',
              address: 'inputsearch3',
            },
            {
              name: '搜索搜索-不同关键词',
              address: 'inputsearch4',
            },
          ],
        },
        {
          name: '柱状图',
          children: [
            {
              name: '基本用法',
              address: 'echart_bar1',
            },
            {
              name: '多重柱状图',
              address: 'echart_bar2',
            },
            {
              name: '堆叠柱状图',
              address: 'echart_bar3',
            },
            {
              name: '滑块柱状图',
              address: 'echart_bar4',
            },
          ],
        },
        {
          name: '条形图',
          children: [
            {
              name: '基本用法',
              address: 'echart_vertical_bar1',
            },
            {
              name: '多重条形图',
              address: 'echart_vertical_bar2',
            },
            {
              name: '堆叠条形图',
              address: 'echart_vertical_bar3',
            },
            {
              name: '滑块条形图',
              address: 'echart_vertical_bar4',
            },
          ],
        },
        {
          name: '折线图',
          children: [
            {
              name: '基本用法',
              address: 'echart_line1',
            },
            {
              name: '平滑折线图',
              address: 'echart_line2',
            },
            {
              name: '多重折线图',
              address: 'echart_line3',
            },
          ],
        },
        {
          name: '饼图',
          children: [
            {
              name: '基本用法',
              address: 'echart_pie',
            },
            {
              name: '南丁格尔玫瑰图',
              address: 'echart_pie1',
            },
            {
              name: '多环基础样式',
              address: 'echart_pie3',
            },
            {
              name: '环形玫瑰图',
              address: 'echart_pie2',
            },
            {
              name: '多环衍生样式1',
              address: 'echart_pie4',
            },
            {
              name: '多环衍生样式2',
              address: 'echart_pie5',
            },
            {
              name: '多环衍生样式3',
              address: 'echart_pie6',
            },
            {
              name: '多环衍生样式4',
              address: 'echart_pie7',
            },
            {
              name: '单环图1',
              address: 'echart_pie8',
            },
            {
              name: '单环图2',
              address: 'echart_pie9',
            },
            {
              name: '单环图3',
              address: 'echart_pie10',
            },
          ],
        },
        {
          name: '标签',
          children: [
            {
              name: '样式1-1',
              address: 'sence_label1',
            },
            {
              name: '样式1-2',
              address: 'sence_label2',
            },
            {
              name: '样式1-3',
              address: 'sence_label3',
            },
            {
              name: '样式2-1',
              address: 'sence_label4',
            },
            {
              name: '样式2-2',
              address: 'sence_label5',
            },
            {
              name: '样式2-3',
              address: 'sence_label6',
            },
            {
              name: '样式3-1',
              address: 'sence_label7',
            },
            {
              name: '样式3-2',
              address: 'sence_label8',
            },
            {
              name: '样式3-3',
              address: 'sence_label9',
            },
          ]
        }
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.menu {
  background-color: white;
  height: 100%;
  width: 250px;
  border-right: 1px solid #eeeff1;
  padding: 5px;
  overflow-x: auto;
  overflow-y: scroll;
}

li {
  text-decoration: none;
  padding: 5px;
}
a {
  text-decoration: none;
}

/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接，鼠标在元素上按下还没有松开*/
a:active {
  text-decoration: none;
}
/* 获得焦点的时候 鼠标松开时显示的颜色*/
a:focus {
  text-decoration: none;
}

.menuItem {
  margin-top: 10px;
  div {
    margin-left: 10px;
    padding: 5px 0px;
  }

  div:hover {
    background-color: #eaeaec;
  }

  ul {
    margin-left: 20px;
    list-style: none;
  }

  li:hover {
    background-color: #eaeaec;
  }
}
</style>
