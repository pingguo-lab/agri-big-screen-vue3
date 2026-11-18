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
      lightData: [], //光照强度数据
      lightTime: [],
      number: 0, // 播放所在下标
      timer: null,
    };
  },
  props: {
    cLightData: {
      type: Array,
      default: null,
    },
    cLightTime: {
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
      this.lightData = this.cLightData.slice(0, 10).reverse();
      this.lightTime = this.cLightTime.slice(0, 10).reverse();
    },
    //显示图表数据
    showChartData() {
      //this.chartInstance=this.$echarts.init(this.$refs.curve,'chalk');
      let result = this.initChart();
      window.addEventListener("resize", function() {
        result.resize();
      });
      let initOption = {
        color: ["#FFD700", "#FE007F"],
        tooltip: {
          trigger: "axis",

          showContent: true,
          /*设置光束样式*/
          axisPointer: {
            type: "shadow",
            shadowStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 1,
                  color: "#7FFF00",
                },
                {
                  offset: 0,
                  color: "rgba(255, 255, 255, 0)",
                },
              ]),
            },
          },
        },
        label: {
          show: false,
          position: "top",
          color: "#fff",
        },
        legend: {
          right: 10,
          top: 0,
          data: ["光照强度"],
        },
        grid: {
          top: "30%",
          left: "3%",
          right: "10%",
          bottom: "1%",
          containLabel: true,
        },
        animation: true,
        animationDuration: 1500,
        animationEasing: "cubicInOut",
        xAxis: {
          type: "category",
          name: "时刻",
          data: this.lightTime,
        },
        yAxis: {
          type: "value",
          name: "单位：lx",
          splitLine: {
            show: true,
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: "光照强度",
            type: "line",

            itemStyle: {
              normal: {
                laber: {
                  show: true,
                },
              },
            },
            smooth: true,
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "rgba(218, 57, 20, 0.3)" },
                    {
                      offset: 0.8,
                      color: "rgba(218, 57, 20, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: this.lightData,
          },
        ],
      };
      result.setOption(initOption);
      /*设置光束动态走动
            result.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: this.number
                });
                this.number++;
                if (this.number > this.lightData.length) {
                this.number = 0;
                }*/
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
