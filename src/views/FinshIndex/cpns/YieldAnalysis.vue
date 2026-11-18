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
      timer: null,
    };
  },
  props: {
    nowDatas: {
      type: Object
    },
  },
  watch: {
    nowDatas(newval, oldval) {
     this.initTem(),
      this.myChart.resize();
      this.showChartData();
    },
  },
  created() {
        this.initTem();
    },
  mounted() {
        this.showChartData();
        clearInterval(this.timer);

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
      this.nowData = this.nowDatas;
      
    },
    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", () => {
        result.resize();
      });
      let initOption = {
        animation: true,
        tooltip: {
     trigger: 'axis',
      axisPointer: {
      crossStyle: {
        color: '#999'
      }
    }
  },
  grid: {top:20, height:'70%'},
  xAxis: [
    {
      type: 'category',
      data: ['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} '
      }
    },
    {
      type: 'value',
      min: -50,
      max: 50,
      interval: 10,
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: this.nowData.name,
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value +' K ';
        }
      },
      data: this.nowData.line
    },
   
    {
      name: '变化幅度',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' %';
        }
      },
      data: this.nowData.change
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
    width: 100%;
    height: 90%;
}

.echart-box {
    width: 100%;
    height: 90%;
}
</style>
