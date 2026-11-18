<template>
  <div class="echart-box">
    <div class="chart-curve" ref="curve"></div>
  </div>
</template>

<script>
import { markRaw } from "vue"; // Vue3：图表实例必须 markRaw，否则被 Proxy 包住会崩
import axios from "axios";
export default {
  data() {
    return {
      customData: [],
      myChart: null,
    };
  },
  props: {
    nowshow: {
      type: String,
    },
  },
  watch: {
    nowshow(newval, oldval) {
      this.myChart.resize();
    },
  },
  created() {
    axios
      .get("/api/get-cities")
      .then((response) => {
        let locations = response.data.data.city;

        let temp = [];
        for (let key in locations) {
          temp.push({ value: locations[key], name: key });
        }
        console.log(locations, "反向溯源数据");
        console.log(temp, "123124");
        this.customData = temp;
        this.showChartData();
      })
      .catch((error) => {
        console.log(error, "获取失败");
      });
  },
  mounted() {
    this.showChartData();
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

    showChartData() {
      let result = this.initChart();
      window.addEventListener("resize", () => {
        result.resize();
      });
      let initOption = {
        title: {
          text: "客户结构分析",
          textStyle: {
            //标题样式
            color: "white", //字体颜色
            fontSize: "0.8rem", //字体大小
            fontWeight: "normal", //字体粗细
          },
          left: "center", //居中对齐
        },
        tooltip: {
          trigger: "item",
          valueFormatter: (value) => value + "次",
        },
        series: [
          {
            center: ["50%", "58%"],
            name: "城市",
            type: "pie",
            radius: "60%",
            data: this.customData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
