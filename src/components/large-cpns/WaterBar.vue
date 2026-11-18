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
      waterData: [], //雨量数据
      //steamData:[],  //蒸发量数据
      waterTime: [],
    };
  },
  props: {
    cWaterData: {
      type: Array,
      default: null,
    },
    /*cSteamData: {
        type: Array,
        default: null,
        },*/
    cWaterTime: {
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
      this.waterData = this.cWaterData.slice(0, 10).reverse();
      //this.steamData=this.cSteamData.slice(0,10).reverse();
      this.waterTime = this.cWaterTime.slice(0, 10).reverse();
    },
    //显示图表数据
    showChartData() {
      //this.chartInstance=this.$echarts.init(this.$refs.curve,'chalk');
      let result = this.initChart();
      window.addEventListener("resize", function() {
        result.resize();
      });
      let initOption = {
        color: ["#1f86ff", "#00FFFF"],
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
          //data:['雨量','蒸发量'],
          data: ["雨量"],
        },
        grid: {
          top: "25%",
          left: "3%",
          right: "6%",
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
          name: "小时",
          data: this.waterTime,
        },
        yAxis: {
          type: "value",
          name: "单位: mm",
        },
        series: [
          {
            name: "雨量",
            type: "line",
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.waterData,
            smooth: true,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "rgba(94,155,241, 0.5)" },
                    {
                      offset: 0.8,
                      color: "rgba(94,155,241, 0.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
          } /*,
                {
                    
                    barWidth:'30%',
                    name:'蒸发量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00FFFF'
                        }, {
                            offset: 1,
                            color: '#66CDAA'
                        }]),
                        }
                        },
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    data: this.steamData
 
                }*/,
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
