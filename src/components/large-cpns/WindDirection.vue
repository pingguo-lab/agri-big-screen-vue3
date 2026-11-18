<template>
  <div>
    <div class="chart-curve" ref="curve"></div>
  </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩
export default {
  data() {
    return {
      myChart: null,
      windDirectionData: 0, //方向数据后台返回可能不是这样的数据形式，需要对数据进行处理做一下数据映射
    };
  },
  props: {
    cwindDirectionData: {
      type: Number,
      default: null,
    },
  },
  created() {
    this.initTem();
  },
  mounted() {
    this.showChartData();
    this.startInterval();
  },
  methods: {
    startInterval: function() {
      if (this.timeId) {
        clearInterval(this.timeId);
      }
      this.timeId = setInterval(() => {
        this.initTem();
        this.showChartData();
      }, 1000);
    },
    initChart() {
      if (this.myChart === null) {
        this.myChart = markRaw(this.$echarts.init(this.$refs.curve, "chalk"));
      }
      return this.myChart;
    },
    initTem() {
      this.windDirectionData = this.cwindDirectionData;
    },
    //显示图表数据
    showChartData() {
      //this.chartInstance=this.$echarts.init(this.$refs.curve,'chalk');
      let result = this.initChart();
      window.addEventListener("resize", function() {
        result.resize();
      });
      let initOption = {
        series: [
          {
            name: "方向表",
            type: "gauge",
            radius: "70%",
            /*大分隔线样式设置*/
            splitLine: {
              distance: 0,
              length: 12,
              lineStyle: {
                color: "#00bfff",
              },
            },
            /*小分隔线样式设置*/
            axisTick: {
              show: false,
              distance: 0,
              length: 8,
              lineStyle: {
                color: "#00bfff",
              },
            },
            /*最外层圆弧样式设置*/
            axisLine: {
              lineStyle: {
                color: [[1, "#00bfff"]],
                width: 5,
              },
            },
            /*指针样式设置*/
            pointer: {
              itemStyle: {
                color: "#00bfff",
              },
            },
            detail: {
              show: false,
              formatter: "{value}°",
            },
            title: {
              show: false,
            },
            startAngle: 90,
            splitNumber: 8,
            endAngle: 450,
            min: 0,
            max: 360,
            /*标签样式设置*/
            axisLabel: {
              fontSize: 12,
              distance: -33,
              color: "#fff",
              formatter: function(value) {
                if (value === 0) {
                  return "北";
                } else if (value === 45) {
                  return "东北";
                } else if (value === 90) {
                  return "东";
                } else if (value === 135) {
                  return "东南";
                } else if (value === 180) {
                  return "南";
                } else if (value === 225) {
                  return "西南";
                } else if (value === 270) {
                  return "西";
                } else if (value === 315) {
                  return "西北";
                }
              },
            },
            data: [
              {
                value: this.windDirectionData,
              },
            ],
          },
        ],
      };
      result.setOption(initOption);
    },
  },
};
</script>
<style>
.chart-curve {
  width: 100%;
  height: 100%;
}
</style>
