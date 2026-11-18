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
      doData: [], // 溶解氧数据
      doRatioData: [], // 溶氧比数据
      doTime: [],
    };
  },
  props: {
    cDo: {
      type: Array,
      default: null,
    },
    cDoRatio: {
      type: Array,
      default: null,
    },
    cDoTime: {
      type: Array,
      default: null,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.initTem();
  },

  mounted() {
    this.showChartData();
    this.startInterval();
    console.log("DoChart mounted with props:", this.cDo, this.cDoRatio, this.cDoTime);
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
      this.doData = this.cDo.slice(0, 10).reverse();
      this.doRatioData = this.cDoRatio.slice(0, 10).reverse();
      this.doTime = this.cDoTime.slice(0, 10).reverse();
    },
    //显示图表数据
    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", function() {
        result.resize();
      });

      let initOption = {
        color: ["#84adea", "#6fab25", "#009AFD"],
        title: {
          text: `${this.id}号鱼塘`,
          left: "center", //居中对齐
        },
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
          data: ["溶解氧", "溶氧比"],
        },
        grid: {
          top: "25%",
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
          data: this.doTime,
        },

        yAxis: [
          {
            type: "value",
            name: "溶解氧",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: false,
            },
            axisLabel: {
              formatter: "{value} mg/L",
            },
          },
          {
            type: "value",
            name: "溶氧比",
            position: "right",
            alignTicks: true,
            splitLine: {
              show: true,
            },
            axisLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "溶解氧",
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.doData,
          },
          {
            name: "溶氧比",
            type: "line",
            lineStyle: {
              normal: {
                type: "dotted",
              },
            },
            xAxisIndex: 0,
            yAxisIndex: 1,
            data: this.doRatioData,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "rgba(100, 190, 49, 0.75)" },
                    {
                      offset: 0.8,
                      color: "rgba(100, 190, 49, 0.1)",
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
