<template>
  <div class="salesScreen">
    <div class="top-img">
      <img src="../../assets/images/bigTitle.png" alt="bigTitleimg" style="width: 100%;height: 63px;" />
      <div class="total-title">全链路农业溯源可视化大屏</div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="left-top" style="flex: 1">
          <div class="title" style="height: 20%;margin-left: 6%;">
            营收额(单位/K)
          </div>
          <div style="height: 100%;">
            <ProductionLine> </ProductionLine>
          </div>
        </div>
        <div class="left-bottom" style="flex: 1"><!-- 左下 -->
          <div class="title" style="height: 20%;margin-left: 6%;">
            投入成本(单位/K)
          </div>
          <div style="display: flex;flex-wrap: wrap;">
            <div style="display: flex;margin-left: 4%; width: 20%;" v-for="(item, index) in config3" :key="index">
              <dv-border-box-8
                style=" cursor: pointer; color: #fff; flex: 1; text-align: center; margin:1px;width: 60%;"
                v-if="flag === index" :reverse="true">
                <div style=" text-align: center; width: 100%;" @click="flag = index"
                  :class="{ 'active': flag === index }"> {{ item.name }}</div>
              </dv-border-box-8>
              <div v-else
                style="border: 1px solid  #084691; cursor: pointer; color: #fff; flex: 1; text-align: center;margin:1px ;width: 60%;"
                @click="flag = index" :class="{ 'active': flag === index }"> {{ item.name }}</div>
            </div>

          </div>

          <YieldAnalysis :nowDatas="config3[flag]"></YieldAnalysis>

        </div>
      </div>
      <div class="content-center"><!-- 中上 -->
        <div class="map-title">数据汇集三维地图</div>
        <div class="nowtime">{{ formattedTime }}</div>
        <div ref="chartRef" class="threedchart" style="width: 40vw; height: 80vh;background-color: transparent;"></div>

      </div>
      <div class="content-right">

        <div class="right-bottom" style="flex: 1"><!-- 右下 -->
          <div class="title" style="height: 18%; justify-content: center;">
            接入设备总览
          </div>
          <div class="echarts1">
            <dv-scroll-board :config="config2" style="width:100%;height:100%;margin: 0 auto;" @click="skipto" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessageBox } from "element-plus";
import YieldAnalysis from "./cpns/YieldAnalysis.vue";
import ProductionLine from "./cpns/ProductionLine.vue";
import { scrollBoard, scrollRankingBoard, borderBox8 } from "@/compat/data-view";
import * as echarts from "echarts";
import jiangxiMP from "../../assets/js/allitem.json";
import "echarts-gl";
//自动切换定时器
export default {
  data() {
    return {
      flag: 0,
      formattedTime: '', //当前时间
      timeId: null, //用于数据更新的定时器
      charts: null,
      updateKey: 1, //datav的更新
      config1: {
        rowNum: 4,
        data: [],
      },
      config3: [
        {
          "name": "永新茶叶",
          "line": [10, 15, 20, 30, 40, 45, 55, 65, 70, 80, 90, 100],
          "change": [20, 16.67, 33.33, 50, 12.5, 22.22, 18.18, 12.5, 14.29, 14.29, 11.11, 11.11]
        },
        {
          "name": "赣州木耳",
          "line": [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
          "change": [12.5, 11.11, 10, 9.09, 8.33, 7.69, 7.14, 6.67, 6.25, 5.88, 5.56, 5.26]
        },
        {
          "name": "井冈山黄桃",
          "line": [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
          "change": [10, 27, 33.33, 50, 25, 20, -20, -12.5, 12.5, 12.5, 0, 10]
        },
        {
          "name": "上高水稻",
          "line": [10, 25, 35, 50, 75, 90, 120, 140, 160, 190, 210, 250],
          "change": [10, 40, 40, 42.86, 50, 20, 33.33, 16.67, 14.29, 18.75, 10.53, 19.05]
        },
        {
          "name": "余干鱼塘",
          "line": [20, 30, 40, 60, 90, 110, 150, 180, 210, 240, 250, 250],
          "change": [10, 10, 33.33, 50, 50, 22.22, 36.36, 20, 16.67, 14.29, 4.17, 0]
        },
        {
          "name": "奉新猕猴桃",
          "line": [30, 45, 60, 80, 110, 140, 170, 150, 120, 210, 150, 200],
          "change": [10, 10, 33.33, 33.33, 37.5, 27.27, 21.43, 17.65, 10, 9.09, 4.17, 0]
        },
        {
          "name": "新建生态园",
          "line": [40, 55, 70, 90, 120, 150, 180, 210, 140, 150, 120, 120],
          "change": [37.5, 36.36, 27.27, 28.57, 33.33, 25, 22.22, 16.67, 14.29, -4.17, 0, 0]
        },
        {
          "name": "小富茶叶",
          "line": [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 155],
          "change": [20, 16.67, 14.29, 12.5, 11.11, 10, 9.09, 8.33, 7.69, 7.14, 6.67, 3.33]
        }



      ],
      dataline: [

        { name: "上高县", value: [114.95, 28.24,] },
        { name: "永新县", value: [114.24, 26.95] },
        { name: "新建区", value: [115.82, 28.69] },
        { name: "奉新县", value: [115.40, 28.69] },
        { name: "井冈山市", value: [114.29, 26.75, 20] },
        { name: "赣州市", value: [114.93, 25.83] },
        { name: "余干县", value: [116.6914, 28.7021] },
        { name: "南昌", value: [115.85, 28.75] }, { name: "鄱阳县", value: [116.70, 29.21] },
      ],
      config2: {
        header: ['基地', '监控数', '传感器数', '面积', '操作'], //表头
        align: ['center', 'center', 'center', 'center', 'center', 'center'], //每列对齐方式
        rowNum: 6, //行数
        headerBGC: 'rgba(0, 186, 255,0.2)', //表头背景色
        oddRowBGC: 'rgba(10, 39, 50,0.4)', //奇数行背景色
        evenRowBGC: 'rgba(0, 59, 81,0.4)', //偶数行背景色
        hoverPause:false,
        data: [
          ['永新茶叶', '1', '10', '900', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
          ['赣州木耳', '1', '10', '800', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
          ['井冈山黄桃', '1', '30', '900', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
          ['上高水稻', '2', '28', '800', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
          ['余干水产', '20', '30', '900', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
          ['小富茶叶', '0', '11', '800', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
          ['奉新猕猴桃', '1', '10', '900', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
          ['新建生态园', '2', '28', '800', '<span style="color:#37a2da;  cursor: pointer;">查看详情</span>'],
        ]
      },
      scatterData: [
        [115.85, 28.75, 23, " 南昌"],
        [114.95, 28.24, 15, ""],//上高县
        [114.24, 26.95, 10, ""],//永新县
        // [115.82, 28.69, 5, ""],//新建区
        [115.40, 28.69, 15, ""], // 奉新县
        [116.6914, 28.7021, 15, " "], // 余干县，
        [114.29, 26.75, 10, " "], // 井冈山市
        [114.93, 25.83, 12, ""],   //赣州市
        [116.70, 29.21, 14, ""],//鄱阳县
      ], // 在这里添加散点的数据
    };
  },
  methods: {

    skipto(config) {
      switch (config.rowIndex) {
        case 0: { this.$router.push('/yongxin'); break; }
        case 1: { this.$router.push('/ganzhou'); break; }
        case 2: { this.$router.push('/jinggang'); break; }
        case 3: {ElMessageBox.alert("设备维修中..."); break; }
        case 4: { this.$router.push('/yuganAqua'); break; }
        case 5: { this.$router.push('/xiaofuchaye'); break; }
        case 6: { this.$router.push('/fengxin'); break; }
        case 7: { ElMessageBox.alert("设备维修中..."); break; }
      }
    },

    realtime() {
      setInterval(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        this.formattedTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 ' + hours + ' 时 ' + minutes + ' 分 ' + seconds + ' 秒 ';
      }, 1000)
    },

    /* 更新数据 */
    updateData() {
      /*因为每隔5分钟会有新数据传来，所以每隔5分钟更新页面数据*/
      if (this.timeId) {
        clearInterval(this.timeId); //取消定时器
      }
      this.timeId = setInterval(() => {
        this.initData();
      }, 300000);
    },
    /*界面数据初始化*/
    initData() {
      this.realtime(); //获取当前时间
    },


  },
  created() {
    this.initData();
  },
  mounted() {
    setInterval(()=>{
      this.flag++;
      if(this.flag ==this.config3.length){
        this.flag =0
      }
    },3000)
    const that = this;
    this.updateData(); //调用自动更新数据的函数
    this.charts = echarts.init(this.$refs.chartRef);
    const option = {
      backgroundColor: "transparent",
      geo3D: {
        map: "jiangxi",
        boxWidth: 100,
        boxHeight: 20,
        boxDepth: 100,
        //光源
        light: {
          main: {
            alpha: 20,
            beta: 80,
          },
        },
        //是否显示地面平面
        groundPlane: {
          show: true,
          color: "rgba(0,0,0,0)",
        },
        postEffect: {
          enable: true,
        },
        temporalSuperSampling: {
          enable: true,
        },
        shading: "lambert",
        itemStyle: {
          borderWidth: 1,
          borderColor: "rgba(4, 231, 242, 0.8)",
          color: "rgba(21, 131, 176, 0.7)",
        },
        emphasis: {
          itemStyle: {
            //鼠标放到区域的
            color: "rgba(21, 131, 176, 0.7)",
          },

        },
        // 添加标注项，指定要显示的文本内容和样式
        label: {
          show: true,
          distance: 0,
          formatter: function (params) {
            return params.name;
          }, // 在这里指定要显示的文本内容
        },
        viewControl: {
      // 设置初始观看角度
      alpha: 45, // 水平旋转角度
      beta: 70, // 垂直旋转角度
    },
      },
      series: [
        {
          type: "scatter3D",
          coordinateSystem: "geo3D",
          blendMode: "lighter",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            color: (e) => {
              if (e.dataIndex == 12 || e.dataIndex == 13) {
                return 'green'
              } else {
                return 'red'
              }
            },
          },
          data: this.scatterData.map((item) => {
            return {
              value: item.slice(0, 2),
              symbolSize: item[2], // 使用数据项的第三个元素作为symbolSize
              label: {
                show: true, // 显示标签
                position: "top",
                distance: 0,
                formatter: item[3],
                textStyle: {
                  color: "black", // 标签文字颜色
                },
              },
              showSymbol: true,
            };
          }),
          animation: true, // 启用动画效果
          animationDurationUpdate: 2000, // 动画更新的持续时间，单位为毫秒
          animationEasingUpdate: "linear", // 动画更新的缓动效果
        },
        {
          type: "lines3D",
          coordinateSystem: "geo3D",
          effect: {
            // 定义动态效果的参数
            show: true, // 是否显示动态效果
            trailWidth: 3, // 动态效果中轨迹的宽度
            trailLength: 0.7, // 动态效果中轨迹的长度
            trailOpacity: 1, // 动态效果中轨迹的透明度
            trailColor: "yellow", // 动态效果中轨迹的颜色
            constantSpeed: 20, // 动态效果中移动的速度
          },
          data: this.dataline.map(function (item) {
            return {
              coords: [item.value,[115.85, 28.75]],
            };
          }),
          lineStyle: {
            width: 2,
            opacity: 1,
          },
        },
      ],
    };
    echarts.registerMap("jiangxi", jiangxiMP,);
    this.charts.setOption(option);
    this.charts.on('click', function (params) {
      console.log(params.dataIndex);
      //  switch(params.dataIndex ){
      //   case 1:   {  that.$router.push('/shanggao');  break;}
      //   case 2:    { that.$router.push('/yongxin');  break;}
      //   case 3:   {that.$router.push('/xiaofuchaye');break; } 
      //   case 4:    {that.$router.push('/fengxin');  break;} 
      //   case 5:     {that.$router.push('/yuganAqua');  break;}
      //   case 6:    {that.$router.push('/jinggang');  break;} 
      //   case 7:    {that.$router.push('/ganzhou');  break;} 
      //   case 8:    {that.$router.push('/xinjianEco'); break;} 

      //  }

    });
  },
  components: {
    YieldAnalysis,
    ProductionLine
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.salesScreen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
 
}

.top-img {
  width: 100%;
  position: relative;
}

.total-title {
  color: white;
  font-size: 18px;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.selected {
  background: url(../../assets/images/选中.png) no-repeat;
  background-size: 100% 100%;
  color: #1cb4ff;
}

.unselected {
  background: url(../../assets/images/未选中.png) no-repeat;
  background-size: 100% 100%;
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
}

.content-left,
.centent-right {
  width: 32%;
  display: flex;
  flex-direction: column;
}

.content-center {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.active {
  color: #01a7cb;
}

.map-title {
  background: url(../../assets/images/titlebg.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
  color: white;
  width: 187.2px;
  height: 38.88px;
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -93.6px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.nowtime {
  color: white;
  position: absolute;
  top: 46px;
}

.center-bottom {
  width: 100%;
  flex: 1;
  background: url(../../assets/images/bgone.png) no-repeat;
  background-size: 100% 100%;
  margin: 1% 0;
}

.left-top {
  margin: 0% 1% 1% 1%;
  width: 98%;
  background: url(../../assets/images/bgtwo.png) no-repeat;
  background-size: 100% 100%;
}

.left-center {
  margin: 1%;
  width: 98%;
  background: url(../../assets/images/bgone.png) no-repeat;
  background-size: 100% 100%;
}

.left-bottom {
  margin: 1%;
  width: 98%;
  background: url(../../assets/images/bgtwo.png) no-repeat;
  background-size: 100% 100%;
}

.right-top {
  margin: 0% 1% 1% 1%;
  width: 98%;
  background: url(../../assets/images/bgtwo.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.right-center {
  margin: 1%;
  width: 98%;
  background: url(../../assets/images/bgone.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.right-bottom {
  margin: 1%;
  width: 98%;
  background: url(../../assets/images/bgone.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.weather-title {
  color: white;
  width: 100%;
  text-align: center;
}

.sale-title {
  text-align: center;
  font-size: 1rem;
  font-weight: 800;
  box-sizing: border-box;
  color: white;
  white-space: nowrap;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sale-number {
  flex: 1;
  font-size: 1.2rem;
  text-align: center;
  color: white;
  display: flex;
  margin-right: 5%;
  padding-right: 5%;
}

.sale-number div {
  vertical-align: baseline;
}

.sale-unit {
  flex: 1;
  font-size: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.SalesRank ul {
  width: 90%;
  height: 90%;
  margin-top: 5%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
}

.SalesRank ul li {
  list-style: none;
  width: 100%;
  background-color: rgba(0, 191, 255, 0.5);
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px rgba(1, 215, 254, 0.2);
  margin: 5% 0;
  box-sizing: border-box;
  flex: 1;
  display: flex;
}

.title {
  font-size: 1.1rem;
  color: white;
  display: flex;
  text-align: left;
  align-items: center;
  position: relative;
  justify-content: normal;
}

.el-carousel {
  width: 100%;
  height: 100%;
}

.el-carousel /deep/ .el-carousel__container {
  height: 100%;
}

.echarts1 {
  width: 100%;
  height: 80%;
  display: flex;
}

.echarts2 {
  width: 100%;
  height: 82%;
  display: flex;
}

.right-title {
  color: white;
  font-size: 1.2rem;
  z-index: 999;
  padding: 3% 0 2% 1%;
}

.customer-str {
  width: 60%;
}

.SalesRank {
  width: 38%;
  height: 100%;
}

.content-right {
  width: 32%;
  display: flex;
  flex-direction: column;
}

.alldatas {
  margin: 0 1% 0 3%;
  width: 96%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.line {
  position: absolute;
  height: 2px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  transform: rotate(35deg);
}

.alldatas tr td {
  flex: 1;
  margin: 2px;
  background-color: aqua;
  text-align: center;
  background-color: rgba(1, 215, 254, 0.2);
  box-shadow: 0px 0px 20px 2px rgba(1, 215, 254, 0.2);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.threedchart {
  flex: 2;
  margin-bottom: 1%;
}
</style>
