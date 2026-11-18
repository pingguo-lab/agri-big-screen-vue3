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
      co2Data: [], //二氧化碳量数据
      co2Time: [],
    };
  },
  props: {
    cCo2Data: {
      type: Array,
      default: null,
    },
    cCo2Time: {
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
      this.co2Data = this.cCo2Data.slice(0, 9).reverse();
      this.co2Time = this.cCo2Time.slice(0, 9).reverse();
    },
    //显示图表数据
    showChartData() {
      //this.chartInstance=this.$echarts.init(this.$refs.curve,'chalk');
      let result = this.initChart();
      window.addEventListener("resize", function() {
        result.resize();
      });
      let initOption = {
        color: ["#d9efff", "#0575ff"],
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
          itemWidth: 15,
          itemHeight: 6,
          itemGap: 10,
          data: ["二氧化碳浓度"],
        },
        grid: {
          top: "20%",
          left: "4%",
          right: "10%",
          bottom: "1%",
          containLabel: true,
        },
        animation: true,
        animationDuration: function(idx) {
          // 越往后的数据延迟越大
          return idx * 300;
        },
        animationEasing: "cubicInOut",
        xAxis: {
          type: "category",
          name: "时刻",
          data: this.co2Time,
        },
        yAxis: {
          type: "value",
          name: "单位:ppm",
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
          },
        },
        series: [
          {
            name: "二氧化碳浓度",
            type: "bar",
            barWidth: "32%",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#d9efff",
                    },
                    {
                      offset: 0.8,
                      color: "#0575ff",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
              },
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.co2Data,
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
