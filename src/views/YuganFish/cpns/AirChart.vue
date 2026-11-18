<template>
  <div class="border">
    <div class="chart-curve" ref="curve"></div>
  </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩
export default {
  data() {
    return {
      myChart: null,
      airTemData: [], //空气温度数据
      airHumData: [], //土壤温度数据
      arrivedTime: [],
    };
  },
  props: {
    cAirTem: {
      type: Array,
      default: null,
    },
    cAirHum: {
      type: Array,
      default: null,
    },
    cArrivedTime: {
      type: Array,
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
      this.airTemData = this.cAirTem.slice(0, 10).reverse();
      this.airHumData = this.cAirHum.slice(0, 10).reverse();
      this.arrivedTime = this.cArrivedTime.slice(0, 10).reverse();
    },
    //显示图表数据
    showChartData() {
      //this.chartInstance=this.$echarts.init(this.$refs.curve,'chalk');
      let result = this.initChart();
      window.addEventListener("resize", function() {
        result.resize();
      });
      let initOption = {
        color: ["#f9675b", "#4e95f5", "#009AFD"],
        tooltip: {
          trigger: "axis",
        },
        label: {
          show: false,
          position: "top",
          color: "#fff",
        },
        legend: {
          right: 10,
          top: 0,
          data: ["空气温度", "空气湿度"],
        },
        grid: {
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "1%",
          containLabel: true,
        },
        animation: true,
        animationDuration: 1500,
        animationEasing: "cubicInOut",
        xAxis: {
          type: "category",
          data: this.arrivedTime,
        },
        yAxis: [
          {
            type: "value",
            name: "空气温度",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: false,
            },
            axisLabel: {
              formatter: "{value}℃",
            },
          },
          {
            type: "value",
            name: "空气湿度",
            position: "right",
            alignTicks: true,
            splitLine: {
              show: true,
            },
            axisLabel: {
              formatter: "{value}%rh",
            },
            axisLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "空气温度",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.airTemData,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "rgba(232, 190, 49, 0.3)" },
                    {
                      offset: 0.8,
                      color: "rgba(232, 190, 49, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            smooth: true,
          },
          {
            name: "空气湿度",
            type: "line",
            lineStyle: {
              normal: {
                type: "dotted",
              },
            },
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: this.airHumData,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,

                  [
                    { offset: 0, color: "rgba(14,107,213, 0.7)" },
                    {
                      offset: 0.8,
                      color: "rgba(14,107,213, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            smooth: true,
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
