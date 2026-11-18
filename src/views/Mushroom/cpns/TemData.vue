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
      TemDatas:[],
      TemTimes:[],
    };
  },
  props: {
    TemData: {
      type: Array,
      default: null,
    },
    TemTime: {
      type: Array,
      default: null,
    },
  },
  created() {
    this.initTem();
  },
  watch: {
    HumData(newval, oldval) {
      console.log(newval);
      
     this.initTem(),
      this.myChart.resize();
      this.showChartData();
    },
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
      this.TemDatas = this.TemData;
      this.TemTimes = this. TemTime
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
          data: ["温度"],
        },
        grid: {
          top: "20%",
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
          // name: "分",
          axisLabel: {
      formatter: '{value} 分'
    },
          data: this.TemTimes,
        },
        yAxis: {
          type: "value",
          name: "单位:°C",
          axisLabel: {
      formatter: '{value} °C'
    },
          
        },
        series: [
          {
            name: "温度",
            type: "line",
            smooth: true,
            data: this.TemDatas,
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
