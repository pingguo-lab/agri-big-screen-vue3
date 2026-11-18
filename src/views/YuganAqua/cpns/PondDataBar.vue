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
      PondData: [],
      PondTime: [],
      nowname: '',
      dataunit: '',
      timer: null,
    };
  },
  props: {
    time: {
      type: Array,
    },
    data: {
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
    /* name(newval, oldval) { //当数据发生变化的时候重新画图
      console.log(newval,'新值新值')
      this.initTem();
      this.showChartData();
    }, */
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
      this.PondTime = this.time;
      this.PondData = this.data;
      this.nowname = this.name;
      this.dataunit = this.unit;
    },
    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", () => {
        result.resize();
      });
      let initOption = {
        animation: true,
        itemStyle: {
          borderRadius: 6
        },
        tooltip: {
          trigger: "axis",
        },
        title: {
          left: 'center',
          text: this.nowname,
          textStyle: {
            fontSize: 16,
          }
        },
        grid: {
          top: '22%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.PondTime
        },
        yAxis: {
          type: 'value',
          name: '',
        },
        series: [
          {
            data: this.PondData,
            name: this.nowname,
            type: 'bar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                  offset: 0,
                  color: "#d6e3f5"
                }, {
                  offset: 0.8,
                  color: "#056bfb"
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
              }
            },
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
