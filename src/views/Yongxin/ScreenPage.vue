
<template>
  <BigScreen title="永新县繁盛生态桑园种植基地可视化大屏">
    <template #left>
        <div class="left-item1">
          <div class="alltitle">
            <img src="../../assets/images/new.png" /><b>实时数据</b>
          </div>
          <MetricGrid :items="metrics" />
        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../assets/images/tem.png" /><b>温度</b>
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
    </template>

    <template #center>
        <div class="center-top">
          <div
            style="width: 50%; height: 8rem; margin-left: 5%; margin-right: 5%"
          >
            <div
              style="color: #fff; height: 3rem; line-height: 3rem; font-size: 1rem"
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
            style="width: 100%; height: 100%; overflow: hidden; position: relative"
          >
            <!-- <swiper-slide class="swiper-slide">
              <Video :cVideoId="'E10858152'"></Video>
            </swiper-slide> -->
            <swiper-slide class="swiper-slide">
              <Video1 :cVideoId="'K15380342'"></Video1>
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
    </template>

    <template #right>
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
          <!--<div class="alltitle"><img src="../../assets/images/weather.png"/><b>天气预报</b></div>
                    <div class="border" style="height:3rem;line-height:3rem;padding:0;font-size:1rem;color:#fff;">南昌市 多云 37℃</div>-->
          <div>{{ city }} {{ weather }} {{ weather_tem }}℃</div>
        </div>
        <div class="right-item2">
          <div class="alltitle">
            <img src="../../assets/images/wind.png" /><b>风速风向</b>
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
                  <img src="../../assets/images/wind1.png" class="windFan" />
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
            <img src="../../assets/images/light.png" /><b>光照强度</b>
          </div>
          <LightCurve
            class="echart-box"
            v-if="lightData"
            ref="illuminance"
            :cLightData="lightData"
            :cLightTime="arrivedTime"
          ></LightCurve>
        </div>
    </template>

    <template #bottom-left>
        <div class="alltitle">
          <img src="../../assets/images/hum.png" /><b>湿度</b>
        </div>
        <HumCurve
          class="echart-box"
          ref="humidity"
          v-if="airHumData || soilHumData"
          :cAirHumData="airHumData"
          :cSoilHumData="soilHumData"
          :cHumTime="arrivedTime"
        ></HumCurve>
    </template>

    <template #bottom-center>
        <div class="alltitle">
          <img src="../../assets/images/water.png" /><b>雨量</b>
        </div>
        <WaterBar1
          class="echart-box"
          v-if="waterData"
          ref="water"
          :cWaterData="waterData"
          :cWaterTime="waterArrivedTime"
        ></WaterBar1>
    </template>

    <template #bottom-right>
        <div class="alltitle">
          <img src="../../assets/images/sun.png" /><b>太阳辐射量</b>
        </div>
        <SunBar
          class="echart-box"
          v-if="sunData"
          ref="sun"
          :cSunData="sunData"
          :cSunTime="arrivedTime"
        ></SunBar>
    </template>
  </BigScreen>
</template>
<script>
import axios from "axios";
import TemCurve from "../../components/large-cpns/TemCurve.vue";
import LightCurve from "../../components/large-cpns/LightCurve.vue";
import HumCurve from "../../components/large-cpns/HumCurve.vue";
import WaterBar1 from "../../components/large-cpns/WaterBar1.vue";
import SunBar from "../../components/large-cpns/SunBar.vue";
// import Video from "../../components/large-cpns/Video.vue";
import Video1 from "../../components/large-cpns/Video1.vue";
import WindDirection from "../../components/large-cpns/WindDirection.vue";
import { swiper, swiperSlide, directive } from "@/compat/swiper";
import BigScreen from "../../components/layout/BigScreen.vue";
import MetricGrid from "../../components/layout/MetricGrid.vue";
import phIcon from "../../assets/images/ph.png";
import conductIcon from "../../assets/images/conduct.png";
import co2Icon from "../../assets/images/co2.png";
import pm25Icon from "../../assets/images/PM2.5.png";
import sunlightIcon from "../../assets/images/sunlight.png";
import soiltemIcon from "../../assets/images/soiltem.png";
import soilhumIcon from "../../assets/images/soilhum.png";
import airtemIcon from "../../assets/images/airtem.png";
import airhumIcon from "../../assets/images/airhum.png";
import sunradioIcon from "../../assets/images/sunradio.png";

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
      soilPH: 0, //最新的土壤PH值
      soilConduct: 0, //最新的土壤电导率
      co2Data: 0, //最新的CO2浓度
      pm_25: 0, //最新的pm2.5
      real_illuminance: 0, // 最新的光照数据
      real_soilHumData: 0, // 最新的土壤湿度数据
      real_airTemData: 0, // 最新的空气温度数据
      real_airHumData: 0, // 最新的空气湿度数据
      real_sunData: 0, // 最新的紫外线数据
      real_soilTemData: 0, // 最新的土壤温度数据
      currentDate: "",
      currentTime: "",
      currentDataTime: "",
      topicId: "31",
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
  computed: {
    // 实时指标：配置化，模板里只留一行 <MetricGrid :items="metrics" />
    metrics() {
      return [
      { icon: phIcon, value: this.soilPH, unit: "", label: "土壤PH值" },
      { icon: conductIcon, value: this.soilConduct, unit: "us/cm", label: "土壤电导率" },
      { icon: co2Icon, value: this.co2Data, unit: "ppm", label: "CO2浓度" },
      { icon: pm25Icon, value: this.pm_25, unit: "μg/m3", label: "PM2.5" },
      { icon: sunlightIcon, value: this.real_illuminance, unit: "lx", label: "光照强度" },
      { icon: soiltemIcon, value: this.real_soilTemData, unit: "℃", label: "土壤温度" },
      { icon: soilhumIcon, value: this.real_soilHumData, unit: "%rh", label: "土壤湿度" },
      { icon: airtemIcon, value: this.real_airTemData, unit: "℃", label: "空气温度" },
      { icon: airhumIcon, value: this.real_airHumData, unit: "%rh", label: "空气湿度" },
      { icon: sunradioIcon, value: this.real_sunData, unit: "W/(㎡)", label: "太阳辐射" },
      ];
    },
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
      this.$get("http://121.5.9.113:8090/api/v1/msg", {
        topicId: "31", // 31 号网关数据丢失，暂时修改为 35 号网关
        timeType: "realTime",
      }).then((res) => {
        let resData = res.data;
        this.soilPH = resData[0].soilPh ? resData[0].soilPh : "0";
        this.co2Data = resData[0].co2 ? resData[0].co2 : "0";
        this.soilConduct = resData[0].conductivity
          ? resData[0].conductivity
          : "0"; //土壤电导率
        this.pm_25 = resData[0].pm25 ? resData[0].pm25 : "0"; //pm2.5
        this.windSpeed = resData[0].windSpeed
          ? (resData[0].windSpeed - 0).toFixed(1)
          : "0"; //风速数据
        this.windDirectionName = this.windDirectionNames[
          resData[0].windDirection
        ]
          ? this.windDirectionNames[resData[0].windDirection]
          : "无"; // 风向映射
        this.windDirectionData = this.windDirectionDataMap[
          resData[0].windDirection
        ]
          ? this.windDirectionDataMap[resData[0].windDirection]
          : 0; //风向盘中角度值映射
        this.real_illuminance = resData[0].illuminance
          ? resData[0].illuminance
          : "0"; // 最新的光照数据
        this.real_soilTemData = resData[0].soilTemp ? resData[0].soilTemp : "0"; // 最新的土壤温度数据
        this.real_soilHumData = resData[0].soilHum ? resData[0].soilHum : "0"; // 最新的土壤湿度数据
        this.real_airTemData = resData[0].temperature
          ? resData[0].temperature
          : "0"; // 最新的空气温度数据
        this.real_airHumData = resData[0].humidity ? resData[0].humidity : "0"; // 最新的空气湿度数据
        this.real_sunData = resData[0].sunRadia ? resData[0].sunRadia : "0"; // 最新的太阳辐射量数据
        this.currentDataTime = resData[0].ts;
      });
    },
    /*获取图表数据*/
    getChartData() {
      if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
      }
      this.$get("http://121.5.9.113:8090/api/v1/msg", {
        topicId: "31", // 31 号网关数据丢失，暂时修改为 35 号网关
        timeType: "hour",
      }).then((res) => {
        let resData = res.data;
        this.arrivedTime = resData.map((item) => {
          return item.ts.slice(11, 13) + "点";
        });
        this.airTemData = resData.map((item) => {
          return (item.temperature - 0).toFixed(2);
        });

        this.soilTemData = resData.map((item) => {
          return (item.soilTemp - 0).toFixed(2);
        });

        this.airHumData = resData.map((item) => {
          return (item.humidity - 0).toFixed(2);
        });
        this.soilHumData = resData.map((item) => {
          return (item.soilHum - 0).toFixed(2);
        });

        this.lightData = resData.map((item) => {
          return (item.illuminance - 0).toFixed(2);
        });
        this.sunData = resData.map((item) => {
          return (item.sunRadia - 0).toFixed(2);
        });
      });
    },
    /*按天获取雨量数据*/
    getWaterData() {
      if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
      }
      this.$get("http://121.5.9.113:8090/api/v1/msg", {
        topicId: "31", // 31 号网关数据丢失，暂时修改为 35 号网关
        timeType: "day",
      }).then((res) => {
        let resData = res.data;
        this.waterArrivedTime = resData.map((item) => {
          return item.ts.slice(8, 10) + "日";
        });
        this.waterData = resData.map((item) => {
          return (item.rainfall - 0).toFixed(2);
        });
        /*this.steamData = resData.map((item) => {
          return item.evaporation;
        });*/
      });
    },
    /*从高德地图获取天气预报数据*/
    getWeatherData() {
      //获取永新县天气，永新县城市编码为360830
      this.$get(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=360830&key=f57f5f6b29fbd1039f7888c2fc8f2d48"
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
    BigScreen,
    MetricGrid,
    TemCurve,
    HumCurve,
    LightCurve,
    WaterBar1,
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
@import url("../../style/screenPage.css");
</style>
