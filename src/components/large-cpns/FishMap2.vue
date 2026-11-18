<template>
  <div class="echart-box">
    <div class="data-header">
      <div class="header-left">{{ fishTitle }} 24小时数据</div>
      <div class="header-right">
        <ul>
          <li>. 
            <div class="color color1"></div>
            <span @click="toggleValues('turbidity')">浊度</span>
          </li>
          <li>
            <div class="color color2"></div>
            <span @click="toggleValues('temperature')">水温度</span>
          </li>
          <li>
            <div class="color color3"></div>
            <span @click="toggleValues('oxygen')">水溶解氧</span>
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
      values: {
        turbidity: {
          current: [4, 5, 3, 6, 7],
          optimal: [6.8, 6.8, 6.8, 6.8, 6.8],
        },
        temperature: {
          current: [14, 20, 22, 23, 20],
          optimal: [20, 20, 20, 20, 20],
        },
        oxygen: {
          current: [1.5, 1.6, 2.0, 1.9, 3.7],
          optimal: [2, 4, 4, 4, 2],
        },
      },
      activeValue: "turbidity",
    };
  },
  created() {
    this.initTem();
  },
  mounted() {
    this.showChartData();
  },
  methods: {
    initChart() {
      if (this.myChart === null) {
        this.myChart = markRaw(this.$echarts.init(this.$refs.curve, "chalk"));
      }
      return this.myChart;
    },
    initTem() {},
    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", () => {
        result.resize();
      });
      let initOption = {
        legend: {
          type: "plain",
          top: 30,
          right: 20,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["0", "4", "8", "12", "16", "20", "24"],
        },
        yAxis: {
          type: "value",
          min: 0,
          // axisTick: { length: 10 },

          nameGap: 10,
          max: 26,
          interval: 5,
        },
        series: [
          {
            name: "当前值",
            data: this.values[this.activeValue].current,
            type: "line",
            areaStyle: {},
          },
          {
            name: "最佳值",
            data: this.values[this.activeValue].optimal,
            type: "line",
            areaStyle: {},
          },
        ],
      };
      result.setOption(initOption);
    },
    toggleValues(valueType) {
      this.activeValue = valueType;
      this.updateChartData();
    },
    updateChartData() {
      // Vue3/ECharts5：改为“按下标局部合并”，避免 getOption() 回灌导致的 series 结构异常
      this.myChart.setOption({
        series: [
          { data: this.values[this.activeValue].current },
          { data: this.values[this.activeValue].optimal },
        ],
      });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.chart-curve {
  position: relative;
  top: -20%;
  width: 100%;
  height: 130%;
}

.echart-box {
  width: 98%;
  height: 39%;
  border: 2px solid rgba(0, 88, 124, 0.5);
}

.data-header {
  width: 100%;
  padding: 1vh 0px 1vh 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
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
  z-index: 999;
}

.color {
  position: relative;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  z-index: 999;
}

.color1 {
  background-color: #1d9dff;
}

.color2 {
  background-color: #ff9f7f;
}

.color3 {
  background-color: #00ffa3;
}
</style>
