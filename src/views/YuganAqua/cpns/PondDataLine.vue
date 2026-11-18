<template>
  <div class="echart-box">
    <div class="chart-curve" ref="curve"></div>
  </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩
export default {
  data() {
    return {
      myChart: null,
      PondData1: [], //溶解氧数据
      PondData2: [], //氨氮含量数据
      PondTime: [], //时间
      nowname: '',
      dataunit: '', //单位
      timer: null
    };
  },
  props: {
    time: {
      type: Array,
    },
    data1: {
      type: Array,
    },
    data2: {
      type: Array,
    },
    name: {
      type: String,
    },
    unit: {
      type: String,
    }
  },
  watch: {
    data(newval, oldval) { //当数据发生变化的时候重新画图
      this.initTem();
      this.showChartData();
    }
  },
  created() {
  },
  mounted() {
    this.timer = setInterval(() => { //循环判断父组件是否传值
      if (this.time[0]) { //如果父组件传值过来了，则调用函数展示echarts图
        this.initTem();
        this.showChartData();
        clearInterval(this.timer);
      }
    }, 10)
  },
  methods: {
    initChart() {
      if (this.myChart === null) {
        this.myChart = markRaw(this.$echarts.init(this.$refs.curve, "chalk"));
      }
      setTimeout(() => {
        this.myChart.resize();
      }, 0);
      return this.myChart;
    },
    initTem() {//将传入的数据赋值
      this.PondTime = this.time; //时间
      this.PondData1 = this.data1; //溶解氧数据
      this.PondData2 = this.data2; //氨氮含量数据
      this.nowname = this.name; //名称
      this.dataunit = this.unit; //单元
    },
    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", () => {
        result.resize();
      });
      let initOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          top: '18%',
          left: '3%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        title: {
          text: this.nowname,
          left: '8%',
          textStyle: {
            fontSize: 16,
          }
        },
        legend: {
          data: ['溶解氧', '氨氮含量']
        },
        xAxis: {
          type: 'category',
          data: this.PondTime
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '溶解氧',
            data: this.PondData1,
            type: 'line',
            smooth: true,
            label: {
              show: true,
              position: 'top',
              color: 'white',
              formatter: function (params) {
                return Number(params.value).toFixed(2);
              }
            },
          },
          {
            name: '氨氮含量',
            data: this.PondData2,
            type: 'line',
            smooth: true,
            label: {
              show: true,
              position: 'top',
              color: 'white',
              formatter: function (params) {
                return Number(params.value).toFixed(2);
              }
            },
          }
        ]
      };
      result.setOption(initOption);
    },
  },
};
</script>

<style scoped>
.chart-curve {
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
}

.echart-box {
  width: 100%;
  height: 100%;
}
</style>
