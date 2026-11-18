<template>
  <div class="border">
    <div class="chart-bar" ref="bar"></div>
  </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩
export default {
  data() {
    return {
      myChart: null,
      nhData: [], //空气湿度数据
      arrivedTime: [],
    };
  },
  props: {
    cNhData: {
      type: Array,
      default: null,
    },
    cArrivedTime: {
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
        this.myChart = markRaw(this.$echarts.init(this.$refs.bar, "chalk"));
      }
      return this.myChart;
    },
    initTem() {
      this.nhData = this.cNhData.slice(0, 10).reverse();
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
        title: {
          text: `${this.id}号鱼塘`,
          left: "center", //居中对齐
        },
        color: [
          new this.$echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#49a545",
              },
              { offset: 0.8, color: "#99cfcd" },
            ],
            false
          ),
        ],
        tooltip: {
          trigger: "axis",
        },

        legend: {
          right: 10,
          top: 0,
          itemWidth: 15,
          itemHeight: 6,
          itemGap: 10,
          data: ["氨氮含量"],
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "8%",
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
          data: this.arrivedTime,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} mg/L",
          },
        },
        series: [
          {
            name: "氨氮含量",
            type: "bar",
            barWidth: "25%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.nhData,
          },
        ],
      };
      result.setOption(initOption);
    },
  },
};
</script>
<style>
.chart-bar {
  width: 100%;
  height: 100%;
}
</style>
