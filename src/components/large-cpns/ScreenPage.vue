<template>
  <div class="page">
    <!--头部-->
    <div class="page-top">
      <div class="title">新建生态园可视化大屏</div>
    </div>
    <div class="page-content">
      <div class="left">
        <div class="left-item1">
          <div class="alltitle">
            <img src="../assets/images/new.png" /><b>实时数据</b>
          </div>
          <div class="current-wrap border">
            <!-- 第一排数据 -->
            <div class="wrap">
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/water.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ rainFall }}</b>
                  mm
                </div>
                <div class="text-h2">总雨量</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/conduct.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ soilConduct }}</b
                  >us/cm
                </div>
                <div class="text-h2">土壤电导率</div>
              </div>
              <div class="wrap-item">
                <div><img src="../assets/images/co2.png" class="img-h2" /></div>
                <div class="text-h1">
                  <b class="b-size">{{ co2Data }}</b
                  >ppm
                </div>
                <div class="text-h2">CO2浓度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/PM2.5.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ pm_25 }}</b
                  >μg/m3
                </div>
                <div class="text-h2">PM2.5</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/PM10.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ pm_10 }}</b
                  >μg/m3
                </div>
                <div class="text-h2">PM10</div>
              </div>
            </div>
            <!-- 第二排数据 -->
            <div class="wrap">
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/soiltem.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_soilTemData }}</b
                  >℃
                </div>
                <div class="text-h2">土壤温度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/soilhum.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_soilHumData }}</b
                  >%rh
                </div>
                <div class="text-h2">土壤湿度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/airtem.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_airTemData }}</b
                  >℃
                </div>
                <div class="text-h2">空气温度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/airhum.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_airHumData }}</b
                  >%rh
                </div>
                <div class="text-h2">空气湿度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../assets/images/sunradio.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_sunData }}</b
                  >W/(㎡)
                </div>
                <div class="text-h2">太阳辐射</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../assets/images/tem.png" /><b>温度</b>
          </div>
          <TemCurve
            class="echart-box"
            v-if="airTemData || soilTemData"
            ref="temperature"
            :cAirTem="airTemData"
            :cSoilTem="soilTemData"
            :cTemTime="arrivedTime"
          ></TemCurve>
        </div>
      </div>
      <div class="center" style="position: relative">
        <div class="center-top">
          <div
            style="width: 50%; height: 8rem; margin-left: 5%; margin-right: 5%"
          >
            <div
              style="
                color: #fff;
                height: 3rem;
                line-height: 3rem;
                font-size: 1rem;
              "
            >
              最新数据更新时间
            </div>
            <div class="time">{{ currentDataTime }}</div>
          </div>
          <!--<div style="width:30%">控制摄像头方向</div>-->
          <div style="width: 40%; height: 100%; display: flex">
            <div style="width: 50%; height: 100%">
              <div
                style="
                  text-align: center;
                  color: #fff;
                  height: 2rem;
                  line-height: 2rem;
                  font-size: 1rem;
                "
              >
                传感器数
              </div>
              <div style="position: relative">
                <div class="circle"></div>
                <div class="circle-content">10</div>
              </div>
            </div>
            <div style="width: 50%; height: 100%">
              <div
                style="
                  text-align: center;
                  color: #fff;
                  height: 2rem;
                  line-height: 2rem;
                  font-size: 1rem;
                "
              >
                监控数
              </div>
              <div style="position: relative">
                <div class="circle2"></div>
                <div class="circle-content">1</div>
              </div>
            </div>
          </div>
        </div>
        <div class="video">
          <swiper
            :options="swiperOption"
            style="
              width: 100%;
              height: 100%;
              overflow: hidden;
              position: relative;
            "
          >
            <!-- <swiper-slide class="swiper-slide">
              <Video :cVideoId="'E10858152'"></Video>
            </swiper-slide> -->
            <swiper-slide class="swiper-slide">
              <Video1 :cVideoId="'K95190695'"></Video1>
            </swiper-slide>
            <div
              class="swiper-button-prev"
              style="color: #fff"
            ></div>
            <div
              class="swiper-button-next"
              style="color: #fff"
            ></div>
          </swiper>
        </div>
      </div>
      <div class="right">
        <div
          class="right-item1"
          style="
            color: #fff;
            text-align: center;
            width: 100%;
            height: 2rem;
            line-height: 2rem;
          "
        >
          <!--<div class="alltitle"><img src="../assets/images/weather.png"/><b>天气预报</b></div>
                    <div class="border" style="height:3rem;line-height:3rem;padding:0;font-size:1rem;color:#fff;">南昌市 多云 37℃</div>-->
          <div>{{ city }} {{ weather }} {{ weather_tem }}℃</div>
        </div>
        <div class="right-item2">
          <div class="alltitle">
            <img src="../assets/images/wind.png" /><b>风速风向</b>
          </div>
          <div
            style="display: flex; color: #fff; padding-top: 1rem"
            class="border echart-box"
          >
            <div style="width: 50%">
              <WindDirection
                style="height: 100%; width: 100%"
                ref="direction"
                :cwindDirectionData="windDirectionData"
              ></WindDirection>
            </div>
            <div style="width: 50%">
              <div
                style="
                  background: #00bfff;
                  text-align: center;
                  font-size: 1.2rem;
                  height: 2rem;
                  line-height: 2rem;
                "
              >
                Wind Speed
              </div>
              <div
                style="
                  display: flex;
                  color: #fff;
                  text-align: center;
                  height: 5rem;
                  line-height: 5rem;
                "
              >
                <div style="width: 50%">
                  <b style="font-size: 3rem; color: #ff8888">{{ windSpeed }}</b
                  >m/s
                </div>
                <div style="width: 50%">
                  <img src="../assets/images/wind1.png" class="windFan" />
                </div>
              </div>
              <div
                style="
                  background: #00bfff;
                  text-align: center;
                  font-size: 1.2rem;
                  height: 2rem;
                  line-height: 2rem;
                "
              >
                <b>{{ windDirectionName }}</b>
              </div>
            </div>
          </div>
        </div>
        <div class="right-item">
          <div class="alltitle">
            <img src="../assets/images/light.png" /><b>光照强度</b>
          </div>
          <LightCurve
            class="echart-box"
            v-if="lightData"
            ref="light"
            :cLightData="lightData"
            :cLightTime="arrivedTime"
          ></LightCurve>
        </div>
      </div>
    </div>
    <div class="page-bottom">
      <div class="bottom-left">
        <div class="alltitle">
          <img src="../assets/images/hum.png" /><b>湿度</b>
        </div>
        <HumCurve
          class="echart-box"
          ref="hum"
          v-if="airHumData || soilHumData"
          :cAirHumData="airHumData"
          :cSoilHumData="soilHumData"
          :cHumTime="arrivedTime"
        ></HumCurve>
      </div>
      <div class="bottom-center">
        <div class="alltitle">
          <img src="../assets/images/water.png" /><b>雨量</b>
        </div>
        <WaterBar
          class="echart-box"
          v-if="waterData"
          ref="water"
          :cWaterData="waterData"
          :cWaterTime="waterArrivedTime"
        ></WaterBar>
      </div>
      <div class="bottom-right">
        <div class="alltitle">
          <img src="../assets/images/sun.png" /><b>太阳辐射量</b>
        </div>
        <SunBar
          class="echart-box"
          v-if="sunData"
          ref="sun"
          :cSunData="sunData"
          :cSunTime="arrivedTime"
        ></SunBar>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TemCurve from "../components/TemCurve.vue";
import LightCurve from "../components/LightCurve.vue";
import HumCurve from "../components/HumCurve.vue";
import WaterBar from "../components/WaterBar.vue";
import SunBar from "../components/SunBar.vue";
// import Video from "../components/Video.vue";
import Video1 from "../components/Video1.vue";
import WindDirection from "../components/WindDirection.vue";
import { swiper, swiperSlide, directive } from "@/compat/swiper";

export default {
  data() {
    return {
      arrivedTime: [], //数据到达时间
      waterArrivedTime: [], //雨量蒸发量数据到达时间
      airTemData: [], //空气温度数据
      soilTemData: [], //土壤温度数据
      airHumData: [], //空气湿度数据
      soilHumData: [], //土壤湿度数据
      lightData: [], //光照强度数据
      sunData: [], //太阳辐射量数据
      waterData: [], //降雨量数据
      //steamData: [], //蒸发量数据

      windDirectionData: 0, //风向数据，后台返回可能不是这样的数据形式，需要对数据进行处理做一下数据映射
      windDirectionDataMap: {
        0: 0,
        1: 45,
        2: 90,
        3: 135,
        4: 180,
        5: 225,
        6: 270,
        7: 315,
      }, //风向盘中角度对应风向值映射
      windDirectionName: "北风", //风向，这个数据也需要根据后台返回的风向值做数据映射处理才能得到
      windDirectionNames: {
        0: "北风",
        1: "东北风",
        2: "东风",
        3: "东南风",
        4: "南风",
        5: "西南风",
        6: "西风",
        7: "西北风",
      }, // 风向映射
      windSpeed: 0, //风速数据
      rainFall: 0, //最新的总雨量
      soilConduct: 0, //最新的土壤电导率
      co2Data: 0, //最新的CO2浓度
      pm_25: 0, //最新的PM2.5
      pm_10: 0, // 最新的PM10数据
      real_soilHumData: 0, // 最新的土壤湿度数据
      real_airTemData: 0, // 最新的空气温度数据
      real_airHumData: 0, // 最新的空气湿度数据
      real_sunData: 0, // 最新的紫外线数据
      real_soilTemData: 0, // 最新的土壤温度数据
      currentDate: "",
      currentTime: "",
      currentDataTime: "",
      topicId: "32",
      swiperOption: {
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoplay: {
          delay: 10000, //自动切换的时间间隔，单位ms
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay
        },
      },
      weather: "", //天气预报接口获取的天气数据，晴、多云等
      weather_tem: "", //天气预报接口获取的温度数据
      city: "", //天气预报中当前城市
    };
  },
  created() {},
  mounted() {
    //this.updateTime();
    this.initData();
    this.updateData();
  },
  methods: {
    getTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      this.currentDate = year + "年" + month + "月" + day + "日";
      this.currentTime = hour + "时" + minute + "分" + second + "秒";
    },
    /*更新时间*/
    updateTime() {
      let that = this;
      setInterval(() => {
        that.getTime();
      }, 1000);
    },
    /*获取当前最新数据*/
    getData() {
      if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
      }
      //服务器IP地址：http://121.40.193.245:8080，服务器域名：https:jxautts.top
      this.$get("http://121.5.9.113:8090/mountain", {
        topicId: "32",
        timeType: "realTime",
      }).then((res) => {
        let resData = res.data;
        this.rainFall = resData[0].allRainFall ? resData[0].allRainFall : "0";
        this.co2Data = resData[0].co2 ? resData[0].co2 : "0";
        this.soilConduct = resData[0].conductivity
          ? resData[0].conductivity
          : "0"; //土壤电导率
        this.pm_25 = resData[0].pm25 ? resData[0].pm25 : "0"; //pm2.5
        this.windSpeed = resData[0].windSPD
          ? (resData[0].windSPD - 0).toFixed(1)
          : "0"; //风速数据
        this.windDirectionName = this.windDirectionNames[resData[0].windDIR]
          ? this.windDirectionNames[resData[0].windDIR]
          : "无"; // 风向映射
        this.windDirectionData = this.windDirectionDataMap[resData[0].windDIR]
          ? this.windDirectionDataMap[resData[0].windDIR]
          : 0; //风向盘中角度值映射
        this.pm_10 = resData[0].pm10 ? resData[0].pm10 : "0"; // 最新的pm10数据
        this.real_soilTemData = resData[0].soilTemp ? resData[0].soilTemp : "0"; // 最新的土壤温度数据
        this.real_soilHumData = resData[0].soilHum ? resData[0].soilHum : "0"; // 最新的土壤湿度数据
        this.real_airTemData = resData[0].temp ? resData[0].temp : "0"; // 最新的空气温度数据
        this.real_airHumData = resData[0].hum ? resData[0].hum : "0"; // 最新的空气湿度数据
        this.real_sunData = resData[0].radia ? resData[0].radia : "0"; // 最新的太阳辐射量数据
        this.currentDataTime = resData[0].ts;
      });
    },
    /*获取图表数据*/
    getChartData() {
      if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
      }
      this.$get("http://121.5.9.113:8090/mountain", {
        topicId: "32",
        timeType: "hour",
      }).then((res) => {
        let resData = res.data;
        this.arrivedTime = resData.map((item) => {
          return item.ts.slice(11, 13) + "点";
        });
        this.airTemData = resData.map((item) => {
          return (item.temp - 0).toFixed(2);
        });

        this.soilTemData = resData.map((item) => {
          return (item.soilTemp - 0).toFixed(2);
        });

        this.airHumData = resData.map((item) => {
          return (item.hum - 0).toFixed(2);
        });
        this.soilHumData = resData.map((item) => {
          return (item.soilHum - 0).toFixed(2);
        });

        this.lightData = resData.map((item) => {
          return (item.light - 0).toFixed(2);
        });
        this.sunData = resData.map((item) => {
          return (item.radia - 0).toFixed(2);
        });
      });
    },
    /*获取雨量数据*/
    getWaterData() {
      if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
      }
      this.$get("http://121.5.9.113:8090/mountain", {
        topicId: "32",
        timeType: "hour",
      }).then((res) => {
        let resData = res.data;
        console.log("res11", resData);
        this.waterArrivedTime = resData.map((item) => {
          return item.ts.slice(11, 13) + "点";
        });
        this.waterData = resData.map((item) => {
          return (item.hourRainFall - 0).toFixed(2);
        });
        /*this.steamData = resData.map((item) => {
          return item.evaporation;
        });*/
      });
    },
    /*从高德地图获取天气预报数据*/
    getWeatherData() {
      //获取南昌天气，城市编码为360100
      this.$get(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=360100&key=f57f5f6b29fbd1039f7888c2fc8f2d48"
      ).then((res) => {
        console.log(res);
        this.weather = res.lives[0].weather;
        this.weather_tem = res.lives[0].temperature;
        this.city = res.lives[0].city;
      });
    },
    /*界面数据初始化*/
    initData() {
      this.getData(); // 获取最新数据
      this.getChartData(); //按小时获取图表数据
      this.getWaterData(); //按天获取雨量蒸发量数据
      this.getWeatherData();
      this.updateTime(); // 获取当前时间
    },
    /*因为每隔5分钟会有新数据传来，所以每隔5分钟更新页面数据*/
    updateData() {
      if (this.timeId) {
        clearInterval(this.timeId); //取消定时器
      }
      this.timeId = setInterval(() => {
        this.initData();
      }, 300000);
    },
  },

  components: {
    TemCurve,
    HumCurve,
    LightCurve,
    WaterBar,
    SunBar,
    // Video,
    Video1,
    WindDirection,
    swiper,
    swiperSlide,
  },
};
</script>
<style scoped>
.page {
  width: 100%;
  height: 100%;
  /*background-color: #22284A;*/
  box-sizing: border-box;
  padding: 0;
}

.page-top {
  width: 100%;
  height: 10%;
  background: url("../assets/images/topbg.gif") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 5px;
}
.page-content {
  width: 100%;
  height: 64%;
  display: flex;
  box-sizing: border-box;
  padding: 0;
}
.date {
  color: #fff;
  font-size: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: #fff;
  font-size: 1.4rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0 0.3rem #00d8ff;
}
.alltitle {
  font-size: 1rem;
  color: #fff;
  height: 2rem;
  line-height: 2rem;
  position: relative;
  padding-left: 5px;
}
.alltitle img {
  height: 1.2rem;
  vertical-align: middle;
  margin-right: 0.2rem;
}
.left {
  width: 30%;
  height: 98%;
  margin-right: 1%;
}
.left-item1 {
  height: 15rem;
  margin-bottom: 2%;
}
.current-wrap {
  height: 13rem;
}
.wrap {
  display: flex;
  width: 100%;
  padding-top: 1rem;
}
.wrap-item {
  width: 25%;
  height: 100%;
  text-align: center;
  color: #fff;
}
.img-h2 {
  height: 1.5rem;
}
.text-h1 {
  height: 2rem;
  line-height: 2rem;
  font-size: 0.3rem;
  overflow: hidden;
}
.text-h2 {
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.8rem;
}
.b-size {
  font-size: 1.2rem;
}
.left-item {
  width: 100%;
  height: calc(98% - 15rem);
  margin-bottom: 2%;
}
.right {
  width: 28%;
  height: 100%;
}
.right-item1 {
  width: 100%;
  height: 2rem;
  margin-bottom: 2%;
}
.right-item2 {
  width: 100%;
  height: 13rem;
  margin-bottom: 2%;
}
.right-item {
  width: 100%;
  height: calc(94% - 15rem);
  margin-bottom: 2%;
}
.echart-box {
  height: calc(100% - 2rem);
}

.center {
  width: 40%;
  height: 100%;
  margin-right: 1%;
}
.center-top {
  width: 100%;
  height: 8.5rem;
  display: flex;
  margin-bottom: 2%;
  background-color: rgba(4, 4, 41, 0.3);
}
.video {
  width: 100%;
  height: calc(95% - 8.5rem);
}

.page-bottom {
  width: 100%;
  height: 26%;
  display: flex;
  box-sizing: border-box;
}

.bottom-left {
  width: 30%;
  height: 96%;
  margin-right: 1%;
}
.bottom-center {
  width: 40%;
  height: 96%;
  margin-right: 1%;
}
.bottom-right {
  width: 28%;
  height: 96%;
}
.windFan {
  animation: speed 1000ms linear infinite;
  animation-duration: 1000ms;
  height: 3rem;
  vertical-align: middle;
}
@keyframes speed {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes speed2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.time {
  position: relative;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.5rem;
  text-align: center;
  color: #fff;
  border: 2px solid #00bfff;
  border-radius: 10px;
  background: #00bfff;
  transition: all 0.3s;
}
.time::before,
.time::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px solid #00bfff;
  transition: all 0.5s;
  animation: clippath 6s infinite linear;
  border-radius: 10px;
}

.time::after {
  animation: clippath 6s infinite -3s linear;
}

@keyframes clippath {
  0%,
  100% {
    clip-path: inset(0 0 98% 0);
  }

  25% {
    clip-path: inset(0 98% 0 0);
  }
  50% {
    clip-path: inset(98% 0 0 0);
  }
  75% {
    clip-path: inset(0 0 0 98%);
  }
}
.circle {
  background: url("../assets/images/circle2.png") no-repeat;
  background-size: 5.5rem 5.5rem;
  width: 5.5rem;
  height: 5.5rem;
  margin: 0 auto;
  animation: speed 5000ms linear infinite;
}
.circle2 {
  background: url("../assets/images/circle2.png") no-repeat;
  background-size: 5.5rem 5.5rem;
  width: 5.5rem;
  height: 5.5rem;
  margin: 0 auto;
  animation: speed2 5000ms linear infinite;
}
.circle-content {
  color: #fff;
  height: 5.5rem;
  line-height: 5.5rem;
  font-size: 1.5rem;
  width: 100%;
  position: absolute;
  top: 0;
  text-align: center;
}
</style>
