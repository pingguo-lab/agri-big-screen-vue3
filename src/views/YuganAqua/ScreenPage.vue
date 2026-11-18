<template>
  <div class="salesScreen">
    <div class="top-img">
      <img src="../../assets/images/bigTitle.png" alt="bigTitleimg" style="width: 100%;height: 63px;" />
      <div class="total-title">余干水产养殖数据可视化大屏</div>
    </div>
    <div class="content">
      <div class="content-left">
        <div class="left-top" style="flex: 1"><!-- 左上 -->
          <div class="title" style="height: 20%; margin-left: 6%;">
            天气与风速风向
          </div>
          <div class="weather-title">
            余干县 {{ weather }} {{ temperature }}℃
          </div>
          <div class="echarts1" style="height: 70%;">
            <div class="customer-str" style="width: 50%;">
              <windDirection :cwindDirectionData="windDirection"></windDirection>
            </div>
            <div class="SalesRank" style="width: 50%;">
              <ul>
                <li>
                  <div class="sale-title" style="font-size: 1.4rem;">风速:</div>
                  <div class="sale-number">
                    <div style="display: flex; align-items: baseline;">
                      <div style="display: inline-block; font-size: 1.6rem;">
                        {{ windSpeed }}
                      </div>
                      m/s
                    </div>
                  </div>
                </li>
                <li>
                  <div class="sale-title" style="font-size: 1.4rem;">Co2:</div>
                  <div class="sale-number">
                    <div style="display: flex; align-items: baseline;">
                      <div style="display: inline-block; font-size: 1.6rem;">
                        {{ CO2 }}
                      </div>
                      ppm
                    </div>
                  </div>
                </li>
                <li>
                  <div class="sale-title" style="font-size: 1rem;">空气湿度:</div>
                  <div class="sale-number">
                    <div style="display: flex; align-items: baseline;">
                      <div style="display: inline-block; font-size: 1.6rem;">
                        {{ humidity }}
                      </div>
                      %
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="left-center" style="flex: 1"><!-- 左中 -->
          <div class="title" style="height: 18%;justify-content: center;">
            溶解氧与氨氮含量
          </div>
          <div class="echarts2">
            <el-carousel indicator-position="none" interval=10000 arrow="never" ref="carousel1"
              @mouseenter.native="delHandleMouseEnter1()">
              <el-carousel-item>
                <PondDataLine :name="'A基地池塘1'" :time="PondTime" :data1="APond1Data1" :data2="APond1Data3"></PondDataLine>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataLine :name="'A基地池塘2'" :time="PondTime" :data1="APond2Data1" :data2="APond2Data3"></PondDataLine>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataLine :name="'A基地池塘3'" :time="PondTime" :data1="APond3Data1" :data2="APond3Data3"></PondDataLine>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataLine :name="'B基地池塘1'" :time="PondTime" :data1="BPond1Data1" :data2="APond1Data3"></PondDataLine>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataLine :name="'B基地池塘2'" :time="PondTime" :data1="BPond2Data1" :data2="APond2Data3"></PondDataLine>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="left-bottom" style="flex: 1"><!-- 左下 -->
          <div class="title" style="height: 20%;margin-left: 6%;">
            各鱼塘PH值
          </div>
          <div class="echarts1">
            <el-carousel indicator-position="none" interval=10000 ref="carousel2"
              @mouseenter.native="delHandleMouseEnter2()">
              <el-carousel-item>
                <PondDataBar :name="'A基地池塘1'" :time="PondTime" :data="APond1Data2"></PondDataBar>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataBar :name="'A基地池塘2'" :time="PondTime" :data="APond2Data2"></PondDataBar>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataBar :name="'A基地池塘3'" :time="PondTime" :data="APond3Data2"></PondDataBar>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataBar :name="'B基地池塘1'" :time="PondTime" :data="BPond1Data2"></PondDataBar>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataBar :name="'B基地池塘2'" :time="PondTime" :data="BPond2Data2"></PondDataBar>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="content-center"><!-- 中上 -->
        <div class="map-title">产品销量跟踪地图</div>
        <div class="nowtime">{{ formattedTime }}</div>
        <div ref="chartRef" class="threedchart" style="width: 100%;background-color: transparent;"></div>
        <div class="center-bottom"><!-- 中下 -->
          <div class="title" style="height: 18%; justify-content: center;">
            鱼重量趋势及其销量
          </div>
          <div class="echarts1">
            <ScatterPlot></ScatterPlot>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="right-top" style="flex: 1"><!-- 右上 -->
          <div class="title" style="height: 20%;margin-left: 6%;">
            鱼各品种价格
          </div>
          <div class="echarts1">
            <el-carousel indicator-position="none" interval=10000 direction="vertical">
              <el-carousel-item>
                <PondDataBar :name="FishDate[0]" :time="FishName" :data="FishPrice1"></PondDataBar>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataBar :name="FishDate[1]" :time="FishName" :data="FishPrice2"></PondDataBar>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataBar :name="FishDate[2]" :time="FishName" :data="FishPrice3"></PondDataBar>
              </el-carousel-item>
              <el-carousel-item>
                <PondDataBar :name="FishDate[3]" :time="FishName" :data="FishPrice4"></PondDataBar>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="right-center" style="flex: 1"><!-- 右中 -->
          <div class="title" style="height: 18%; justify-content: center;">
            客户扫码产品反向溯源
          </div>
          <div class="echarts1">
            <div class="customer-str">
              <CustomerStr></CustomerStr>
            </div>
            <div class="SalesRank" style="position: relative; overflow: hidden;">
              <dv-scroll-ranking-board :config="config1" :key="updateKey"
                style="width:100%;height:100%; position: absolute; top:0; left: 0;" />
            </div>
          </div>
        </div>
        <div class="right-bottom" style="flex: 1"><!-- 右下 -->
          <div class="title" style="height: 18%; justify-content: center;">
            接入设备总览
          </div>
          <div class="echarts1">
            <dv-scroll-board :config="config2" style="width:96%;height:100%;margin: 0 auto;" />
          </div>
          <!-- <dv-scroll-board :config="config2" style="width:95%; height: 78%; padding: 0% 2% 0% 3%;" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerStr from "./cpns/CustomerStr";
import ScatterPlot from "./cpns/ScatterPlot";
import windDirection from "./cpns/WindDirection";
import PondDataLine from "./cpns/PondDataLine";
import PondDataBar from "./cpns/PondDataBar";
import axios from "axios";
import { fetchAquaDashboard } from "@/api/pond";
import Element from "element-plus";
import { scrollBoard, scrollRankingBoard } from "@/compat/data-view";
import * as echarts from "echarts";
import shangraoMP from "../../assets/js/shangrao.json";
import "echarts-gl";
//自动切换定时器
export default {
  data() {
    return {
      formattedTime: '', //当前时间
      timeId: null, //用于数据更新的定时器
      weather: "", //天气
      temperature: "", //温度
      windSpeed: "", //风速
      windDirection: 0, //风向
      CO2: "", //Co2浓度
      humidity: "", //空气湿度
      charts: null,
      PondTime: [], //鱼塘的时间
      APond1Data1: [], //A基地鱼塘1的溶解氧数据
      APond1Data2: [], //A基地鱼塘1的PH数据
      APond1Data3: [], //A基地鱼塘1的氨氮含量数据
      APond2Data1: [], //A基地鱼塘2的溶解氧数据
      APond2Data2: [], //A基地鱼塘2的PH数据
      APond2Data3: [], //A基地鱼塘2的氨氮含量数据
      APond3Data1: [], //A基地鱼塘3的溶解氧数据
      APond3Data2: [], //A基地鱼塘3的PH数据
      APond3Data3: [], //A基地鱼塘3的氨氮含量数据
      BPond1Data1: [], //B基地鱼塘1的溶解氧数据
      BPond1Data2: [], //B基地鱼塘1的PH数据
      BPond1Data3: [], //B基地鱼塘1的氨氮含量数据
      BPond2Data1: [], //B基地鱼塘2的溶解氧数据
      BPond2Data2: [], //B基地鱼塘2的PH数据
      BPond2Data3: [], //B基地鱼塘2的氨氮含量数据
      FishDate: ["近一天","近两天","近三天","近四天"], //价格数据的日期
      FishName: ["草鱼","鲶鱼","鲫鱼","鳙鱼","带鱼","鲈鱼","鲤鱼"], //鱼的名称
      FishPrice1: [15.7,20.75,18.98,17.94,34.07,35.11,14.89], //近一天的价格
      FishPrice2: [15.78,20.75,18.92,17.86,33.94,35.22,14.74], //近二天的价格
      FishPrice3: [15.58,20.75,18.67,17.74,34.25,35.33,14.87], //近三天的价格
      FishPrice4: [15.8,20.75,18.74,17.74,35.06,35.39,15.03], //近四天的价格
      updateKey: 1, //datav的更新
      config1: {
        rowNum: 4,
        data: [],
      },
      dataline: [
        { name: "信州区", value: [117.9666, 28.4366] },
        { name: "广丰区", value: [118.1914, 28.4408] },
        { name: "广信区", value: [117.9139, 28.4499] },
        { name: "玉山县", value: [118.2448, 28.6862] },
        { name: "铅山县", value: [117.7099, 28.315] },
        { name: "横峰县", value: [117.596, 28.4159] },
        { name: "弋阳县", value: [117.4483, 28.4022] },
        { name: "鄱阳县", value: [116.6993, 29.006] },
        { name: "万年县", value: [117.0701, 28.7008] },
        { name: "婺源县", value: [117.8613, 29.2486] },
        { name: "德兴市", value: [117.5787, 28.945] },
      ],
      config2: {
        header: ['基地', '监控数', '传感器数', '池塘数', '面积'], //表头
        align: ['center', 'center', 'center', 'center', 'center'], //每列对齐方式
        rowNum: 2, //行数
        headerBGC: 'rgba(0, 186, 255,0.2)', //表头背景色
        oddRowBGC: 'rgba(10, 39, 50,0.4)', //奇数行背景色
        evenRowBGC: 'rgba(0, 59, 81,0.4)', //偶数行背景色
        data: [
          ['A', '3', '30', '20', '900'],
          ['B', '2', '28', '1', '800'],
        ]
      },
      scatterData: [
        [117.9666, 28.4366, 15, " "], // 信州区，symbolSize为15
        [118.1914, 28.4408, 12, " "], // 广丰区，symbolSize为12
        [117.9139, 28.4499, 18, " "], // 广信区，symbolSize为18
        [118.2448, 28.6862, 14, " "], // 玉山县，symbolSize为14
        [117.7099, 28.315, 16, " "], // 铅山县，symbolSize为16
        [117.596, 28.4159, 11, " "], // 横峰县，symbolSize为11
        [117.4483, 28.4022, 15, " "], // 弋阳县，symbolSize为19
        [116.6914, 28.7021, 25, " "], // 余干县，symbolSize为13
        [116.6993, 29.006, 17, " "], // 鄱阳县，symbolSize为17
        [117.0701, 28.7008, 15, " "], // 万年县，symbolSize为15
        [117.8613, 29.2486, 12, " "], // 婺源县，symbolSize为12
        [117.970522, 28.445378, 15, " "], // 德兴市，symbolSize为18
        [116.5514, 28.8021, 20, "A基地"], // A基地
        [116.6514, 28.5321, 20, "B基地"], // B基地
      ], // 在这里添加散点的数据
    };
  },
  methods: {
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
    // 鼠标移入卡片banner不停止
    delHandleMouseEnter1() {
      this.$refs.carousel1.handleMouseEnter = () => { }
    },
    delHandleMouseEnter2() {
      this.$refs.carousel2.handleMouseEnter = () => { }
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
      this.getData(); // 获取数据
      this.getWeatherData(); //获取天气数据
    },
    /* 获取数据：具体请求收敛到 src/api/pond.js */
    async getData() {
      try {
        const { overview, a1, a2, a3, b1, b2, price } = await fetchAquaDashboard();

        // 总览：风速 / 风向 / CO2 / 空气湿度
        this.windSpeed = overview.windSpeed;
        this.windDirection = overview.windDirection;
        this.CO2 = overview.co2;
        this.humidity = overview.humidity;

        // 时间轴（沿用 A 基地 1 号池塘的时间）
        this.PondTime = a1.time;

        // A 基地三个池塘：溶解氧 / PH / 氨氮
        this.APond1Data1 = a1.dissolvedOxygen;
        this.APond1Data2 = a1.ph;
        this.APond1Data3 = a1.ammoniaNitrogen;
        this.APond2Data1 = a2.dissolvedOxygen;
        this.APond2Data2 = a2.ph;
        this.APond2Data3 = a2.ammoniaNitrogen;
        this.APond3Data1 = a3.dissolvedOxygen;
        this.APond3Data2 = a3.ph;
        this.APond3Data3 = a3.ammoniaNitrogen;

        // B 基地两个池塘
        this.BPond1Data1 = b1.dissolvedOxygen;
        this.BPond1Data2 = b1.ph;
        this.BPond1Data3 = b1.ammoniaNitrogen;
        this.BPond2Data1 = b2.dissolvedOxygen;
        this.BPond2Data2 = b2.ph;
        // 注意：原代码这里写的是 Pond2Data3（少个 B），为保证模板行为不变先保持一致
        this.Pond2Data3 = b2.ammoniaNitrogen;

        // 鱼价
        if (price) {
          this.FishName = price.names;
          this.FishPrice1 = price.price1;
          this.FishPrice2 = price.price2;
          this.FishPrice3 = price.price3;
          this.FishPrice4 = price.price4;
          this.FishDate = price.dates;
        }
      } catch (err) {
        console.error("余干水产取数失败", err);
      }
    },
    /*从高德地图获取天气预报数据*/
    getWeatherData() {
      //获取余干县天气，城市编码为361127
      this.$get(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=361127&key=f57f5f6b29fbd1039f7888c2fc8f2d48",
        {}
      ).then((res) => {
        console.log(res, "天气数据");
        (this.weather = res.lives[0].weather), //A天气赋值
          (this.temperature = res.lives[0].temperature); //A温度赋值
      });
    },
  },
  created() {
    this.initData();
    axios
      .get("/api/get-cities")
      .then((response) => {
        console.log('获取成功')
        let locations = response.data.data.city;
        let temp = [];
        for (let key in locations) {
          temp.push({ value: locations[key], name: key });
        }
        this.config1.data = temp;
        this.updateKey += 1;
      })
      .catch((error) => {
        console.log(error, "获取失败");
      });
  },
  mounted() {
    this.$refs.carousel1.handleMouseEnter = () => { }
    this.$refs.carousel2.handleMouseEnter = () => { }
    this.updateData(); //调用自动更新数据的函数
    this.charts = echarts.init(this.$refs.chartRef);
    const option = {
      backgroundColor: "transparent",
      geo3D: {
        map: "shangraoshi",
        boxWidth: 100,
        boxHeight: 10,
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
            color: "rgba(9, 184, 240, 1)",
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
      },
      series: [
        {
          type: "scatter3D",
          coordinateSystem: "geo3D",
          blendMode: "lighter",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            color: (e)=>{
              console.log(e,'123321')
              if(e.dataIndex == 12 || e.dataIndex == 13){
                return 'green'
              }else{
                return 'red'
              }
            },
          },
          data: this.scatterData.map((item) => {
            console.log(item, '123456')
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
              coords: [[116.691072, 28.69173], item.value],
            };
          }),
          lineStyle: {
            width: 2,
            opacity: 1,
          },
        },
      ],
    };
    echarts.registerMap("shangraoshi", shangraoMP);
    this.charts.setOption(option);
    this.charts.on('click', function (params) {
      if (params.dataIndex === 12) {
        window.location.href = "http://121.5.9.113:8090/#/yuganFish";
      }
      if (params.dataIndex === 13) {
        alert("B基地尚未接入,敬请期待");
      }
    });
  },
  components: {
    CustomerStr,
    ScatterPlot,
    windDirection,
    PondDataLine,
    PondDataBar,
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
