<template>
  <div class="border" >
    <div class="chart-curve" ref="curve"></div>
  </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩
export default {
  data() {
    return {
      myChart: null,
      ECDatas: [], 
      ECTimes: [],
    };
  },
  props: {
    ECData: {
      type: Array,
      default: null,
    },
    ECTime: {
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
      this.ECDatas = this.ECData;
      this.ECTimes = this.ECTime;
      // console.log(this.ECDatas,"888888");
      
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
          data: ["乙烯浓度"],
        },
        grid: {
          top: "30%",
          left: "4%",
          right: "10%",
          bottom: ".1%",
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
          data: this.ECTimes,
        },
        yAxis: {
          type: "value",
          name: "单位:%RH",
          
          min: -10,  // 设置Y轴的最小值
        max: 10,   // 设置Y轴的最大值
        splitLine: {
            show: true,  // 显示分割线
            lineStyle: {
                type: 'dashed'
            }
        },
        axisLine: {
            onZero: false  // 使 Y 轴不与 X 轴交于 0 点
        }
        },
        series: [
          {
            name: "乙烯浓度",
            type: "line",
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
            data: this.ECDatas,
          },
        ],
      };
      result.setOption(initOption);
    },
  },
};
</script>
<style scoped>
.chart-curve {
  width: 100%;
  height: 100%;
}

</style>
