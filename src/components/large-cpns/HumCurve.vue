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
      airHumData: [], //空气湿度数据
      soilHumData: [], //土壤湿度数据
      humTime: [],
    };
  },
  props: {
    cAirHumData: {
      type: Array,
      default: null,
    },
    cSoilHumData: {
      type: Array,
      default: null,
    },
    cHumTime: {
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
        this.myChart = markRaw(this.$echarts.init(this.$refs.bar, "chalk"));
      }
      return this.myChart;
    },
    initTem() {
      this.airHumData = this.cAirHumData.slice(0, 10).reverse();
      this.soilHumData = this.cSoilHumData.slice(0, 10).reverse();
      this.humTime = this.cHumTime.slice(0, 10).reverse();
    },
    //显示图表数据
    showChartData() {
      //this.chartInstance=this.$echarts.init(this.$refs.curve,'chalk');
      let result = this.initChart();
      window.addEventListener("resize", function() {
        result.resize();
      });
      let initOption = {
        color: ["#FF1493", "#91CC75"],
        /*title:{
                    text:'湿度'
                },*/
        tooltip: {
          trigger: "axis",
        },

        legend: {
          right: 10,
          top: 0,
          itemWidth: 15,
          itemHeight: 6,
          itemGap: 10,
          data: ["空气湿度", "土壤湿度"],
        },
        grid: {
          top: "30%",
          left: "3%",
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
          data: this.humTime,
        },
        yAxis: {
          type: "value",
          name: "单位：%rh",
        },
        series: [
          {
            name: "空气湿度",
            type: "bar",
            barWidth: "25%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.airHumData,
          },
          {
            name: "土壤湿度",
            type: "bar",
            barWidth: "25%",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.soilHumData,
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
