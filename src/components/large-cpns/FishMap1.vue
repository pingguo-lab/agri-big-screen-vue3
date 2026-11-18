<template>
  <div class="echart-box">
    <div class="data-header">
      <div class="header-left">{{ fishTitle }} 水体环境指标分析</div>
      <div class="header-right">
        <ul>
          <li>
            <div class="color color2"></div>
            <span @click="showCurrentData">当前</span>
          </li>
          <li>
            <div class="color color1"></div>
            <span @click="showBestData">最佳</span>
          </li>
          <li>
            <div class="color color3"></div>
            <span @click="showWarningData">警戒</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="chart-curve" ref="curve"></div>
  </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩
export default {
  props: {
    fishTitle: {
      type: String,
      default: "鱼塘 - 01",
    },
  },
  data() {
    return {
      myChart: null,
      dataBJ: [
        [3, 20, 56, 1, 18, 6, 5, 3],
        [20, 11, 21, 2, 34, 9, 7, 7],
        [3, 7, 63, 1, 14, 5, 5, 9],
      ],
      currentData: [3, 20, 56, 1, 18, 6, 5, 3],
      bestData: [20, 11, 21, 2, 34, 9, 7, 7],
      warningData: [3, 7, 63, 1, 14, 5, 5, 9],
      lineStyle: {
        width: 1,
        opacity: 0.5,
      },
    };
  },
  mounted() {
    this.showChartData();
  },
  methods: {
    initChart() {
      // 初始化
      if (this.myChart === null) {
        this.myChart = markRaw(this.$echarts.init(this.$refs.curve, "chalk"));
      }
      return this.myChart;
    },
    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", () => {
        result.resize();
      });
      let initOption = {
        radar: {
          indicator: [
            { name: "水温", max: 40 },
            { name: "氨氮", max: 25 },
            { name: "浊度", max: 60 },
            { name: "余氯", max: 70 },
            { name: "溶解氧", max: 40 },
            { name: "电导率", max: 70 },
            { name: "水质盐度", max: 50 },
            { name: "PH值", max: 14 },
          ],
          shape: "circle",
          splitNumber: 5,
          axisName: {
            color: "rgb(255, 255, 255)",
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
              ].reverse(),
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.5)",
            },
          },
        },
        series: [
          {
            name: "Beijing",
            type: "radar",
            lineStyle: this.lineStyle,
            data: this.dataBJ,
            symbol: "none",
            itemStyle: {},
            areaStyle: {
              opacity: 0.1,
            },
          },
        ],
      };

      result.setOption(initOption);
    },
    showCurrentData() {
      this.dataBJ = [this.currentData];
      this.setChartDataBackgroundColor("yellow"); // 设置背景颜色为黄色
    },
    showBestData() {
      this.dataBJ = [this.bestData];
      this.setChartDataBackgroundColor("green"); // 设置背景颜色为绿色
    },
    showWarningData() {
      this.dataBJ = [this.warningData];
      this.setChartDataBackgroundColor("red"); // 设置背景颜色为红色
    },
    setChartDataBackgroundColor(color) {
      this.showChartData(); // 更新雷达图数据

      // 设置数据区域的背景颜色
      this.myChart.setOption({ series: [{ areaStyle: { color: color, opacity: 0.6 } }] });
    },
  },
};
</script>
<style scoped>
.chart-curve {
  width: 100%;
  height: 90%;
}

.echart-box {
  width: 98%;
  height: 58%;
  margin: 0 0 1% 0;
  border: 2px solid rgba(0, 88, 124, 0.5);
}

.data-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  height: 27px;
}

.header-left {
  margin: 0px 0px 0px 5px;
  color: white;
}

.header-right ul {
  display: flex;
}

.header-right ul li {
  display: flex;
  list-style: none;
  align-items: center;
  margin: 0px 5px;
  color: white;
}

.color {
  width: 10px;
  height: 2px;
  margin: 0px 5px;
}

.color1 {
  background-color: #38f286;
}

.color2 {
  background-color: #f29420;
}

.color3 {
  background-color: #d2230f;
}
</style>
