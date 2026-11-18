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
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      j:0,
      t:null,
    };
  },
  mounted() {
    this.showChartData();

    this.test2()
  },
  methods: {
    test2 (){ 
       const that =this
      this.t =setInterval(function () {
        that.run();
         that.j++;
      if (that.j >= 12) {
        clearInterval(that.t);
      }
    }, 1000);
    this.t();
  },
    run() {
      const that =this
      const datas = [
        [10, 15, 20, 30, 40, 45, 55, 65, 70, 80, 90, 100],
        [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
        [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
        [10, 25, 35, 50, 75, 90, 120, 140, 160, 190, 210, 250],
        [20, 30, 40, 60, 90, 110, 150, 180, 210, 240, 250, 250],
        [30, 45, 60, 80, 110, 140, 170, 200, 220, 240, 250, 250],
        [40, 55, 70, 90, 120, 150, 180, 210, 240, 250, 250, 250],
        [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 155],
      ];
      for (var i = 0; i < that.data.length; ++i) {
        that.data[i] += datas[i][that.j]
      }
      that.myChart.setOption({
        series: [
          {
            type: 'bar',
           data: that.data
          }
        ]
      });
    },
    initChart() {
      if (this.myChart === null) {
        this.myChart = markRaw(this.$echarts.init(this.$refs.curve, "chalk"));
      }
      setTimeout(() => {
        this.myChart.resize();
      }, 0);
      return this.myChart;
    },
    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", () => {
        result.resize();
      });
      let initOption = {
        animation: true,
        xAxis: {
          max: 'dataMax'
        },
        grid: {top:10, height:'80%',left:'15%'},
        yAxis: {
          type: 'category',
          data: ['永新茶叶', '赣州木耳', '井冈山黄桃', '上高水稻', '余干鱼塘', '小富茶叶', '奉新猕猴桃', '新建生态园'],
          axisLabel: {
            fontSize: 10
            
        },
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 100,
          max: 7 // only the largest 3 bars will be displayed
        },
        series: [
          {
            realtimeSort: true,
            name: 'X',
            type: 'bar',
            data: this.data,
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    '#FA897B',
                    '#FFDD94',
                    '#D0E6A5',
                    '#FFDD94',
                    '#4675C0',
                    '#B8BFD6',
                    '#FFA876',
                    '#ef2b2d'
                  ];
                  let colorItem = colorList[params.dataIndex];
                  return colorItem;
                }
              }

            },
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ],
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear'
      };

      result.setOption(initOption);
    },
  },
};
</script>

<style scoped>
.chart-curve {
  width: 95%;
  height: 90%;
  padding-left: 5%;
}

.echart-box {
  width: 100%;
  height: 90%;
}
</style>
