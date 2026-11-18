<template>
  <div class="page">
    <!--头部-->
    <div class="page-top">
      <div class="title">小富茶叶可视化大屏</div>
    </div>
    <div class="page-content">
      <div class="left">
        <div class="left-item1">
          <div class="alltitle">
            <img src="../../assets/images/conduct.png" /><b>土壤电导率</b>
          </div>
        <ConductivityBar
        class="echart-box"
          v-if="soilConduct"
          ref="soilConduct"
          :cConductivityData="soilConductData"
          :cConductivityTime="arrivedTime"></ConductivityBar>
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
      </div>
      <div class="center" style="position: relative;">
      <div class="center-top">
          <div
            style="width: 100%; height: 8rem; margin-left: 5%; margin-right: 5%"
          >
            <div
              style="color: #fff; height: 3rem; line-height: 3rem; font-size: 1rem"
            >
              最新数据更新时间
            </div>
            <div class="time">{{ currentDataTime }}</div>
          </div>
          <div style="width: 40%; height: 100%; display: flex">
            <div style="width: 100%; height: 100%">
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
                <div class="circle-content">11</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-item1">
          <div class="alltitle" >
            <img src="../../assets/images/new.png" /><b>气象站最新数据展示</b>
          </div>
          <dv-border-box-8  :reverse="true" style="height: 40vh; overflow: hidden;">
            <div class="wrap">
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/conduct.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ soilConduct }}</b
                  >us/cm
                </div>
                <div class="text-h2">土壤电导率</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/co2.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{real_co2Data }}</b
                  >ppm
                </div>
                <div class="text-h2">CO2浓度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/PM2.5.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ pm_25 }}</b
                  >μg/m3
                </div>
                <div class="text-h2">PM2.5</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/sunlight.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_illuminance }}</b
                  >lx
                </div>
                <div class="text-h2">光照强度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/wind.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ windSpeed }}</b
                  >m/s
                </div>
                <div class="text-h2">风速</div>
              </div>
            </div>
          
            <div class="wrap">
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/soiltem.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_soilTemData }}</b
                  >℃
                </div>
                <div class="text-h2">土壤温度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/soilhum.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_soilHumData }}</b
                  >%rh
                </div>
                <div class="text-h2">土壤湿度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/airtem.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_airTemData }}</b
                  >℃
                </div>
                <div class="text-h2">空气温度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/airhum.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_airHumData }}</b
                  >%rh
                </div>
                <div class="text-h2">空气湿度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/water.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_rainData }}</b
                  >mm
                </div>
                <div class="text-h2">降雨量</div>
              </div>
            </div>
          </dv-border-box-8>
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
          <div style="font-size: 2vw;">{{ city }} {{ weather }} {{ weather_tem }}℃</div>
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
      </div>
    </div>
    <div class="page-bottom">
      <div class="bottom-left">
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
      </div>
      <div class="bottom-center">
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
      </div>
      <div class="bottom-right">
        <div class="alltitle">
          <img src="../../assets/images/co2.png" /><b>CO2浓度</b>
        </div>
        <Co2Bar
          class="echart-box"
          v-if="co2Data"
          ref="sun"
          :cCo2Data="co2Data"
          :cCo2Time="arrivedTime"
        ></Co2Bar>
      </div>
    </div>
  </div>
</template>
<script>
import TemCurve from "../../components/large-cpns/TemCurve.vue";
import LightCurve from "../../components/large-cpns/LightCurve.vue";
import ConductivityBar from "../../components/large-cpns/Conductivity.vue";
import HumCurve from "../../components/large-cpns/HumCurve.vue";
import WaterBar1 from "../../components/large-cpns/WaterBar.vue";
import Co2Bar from "../../components/large-cpns/Co2Bar.vue";
import WindDirection from "../../components/large-cpns/WindDirection.vue";
import { borderBox8 } from "@/compat/data-view";
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
      co2Data:[],//二氧化碳含量数据
      
      soilConductData:[] ,
      // sunData: [], //太阳辐射量数据
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
      real_co2Data: 0, //最新的CO2浓度
      pm_25: 0, //最新的pm2.5
      charts: null,
      real_illuminance: 0, // 最新的光照数据
      real_soilHumData: 0, // 最新的土壤湿度数据
      real_airTemData: 0, // 最新的空气温度数据
      real_airHumData: 0, // 最新的空气湿度数据
      real_rainData: 0,//最新的降雨量数据
      real_sunData: 0, // 最新的紫外线数据
      real_soilTemData: 0, // 最新的土壤温度数据
      currentDate: "",
      currentTime: "",
      currentDataTime: "",
      topicId: "31",
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
      this.$get("http://121.5.9.113:8090/api/v1/msg", {
        topicId: "38", 
        timeType: "realTime",
      }).then((res) => {
        let resData = res.data;
        this.soilPH = resData[0].soilPh ? resData[0].soilPh : "0";
        this.real_co2Data = resData[0].co2 ? resData[0].co2 : "0";
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
        this.real_rainData=resData[0].rainfall?resData[0].rainfall:"0";//最新的降雨量数据
        console.log(resData);
        this.currentDataTime = resData[0].ts;
      });
    },
    /*获取图表数据*/
    getChartData() {
      if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
      }
      this.$get("http://121.5.9.113:8090/api/v1/msg", {
        topicId: "38", //  38 号网关
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
        this.co2Data = resData.map((item) => {
          return (item.co2 - 0).toFixed(2);
        });
        this.soilConductData= resData.map((item) => {
          return (item.conductivity - 0).toFixed(2);
        })
      });
    },
    /*按天获取雨量数据*/
    getWaterData() {
      if (localStorage.getItem("topicId")) {
        this.topicId = localStorage.getItem("topicId");
      }
      this.$get("http://121.5.9.113:8090/api/v1/msg", {
        topicId: "38", // 38 号网关
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
      //获取鄱阳县天气，鄱阳县城市编码为361128 
      this.$get(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=361128&key=f57f5f6b29fbd1039f7888c2fc8f2d48"
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
    WaterBar1,
    Co2Bar,
    ConductivityBar,
    // SunBar,
    // Video,
    // Video1,
    WindDirection,
    // swiper,
    // swiperSlide,
  },
};
</script>
<style scoped>

@import url("../../style/screenPage.css");
.img-h2 {
  height: 8vh;
}
.text-h1 {
  height: 2rem;
  line-height: 2rem;
  font-size: 0.5vw;
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
.page{
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 0, .1),
    rgba(1, 61, 45, 1)
  ),url(../../assets/images/tea-2657300_1920.jpg) no-repeat center;
  background-size: cover;
  z-index: -1;
}
.text-h2{
  width: 100%;
  font-size: .9vw;
}
.b-size{
  font-size: .9vw;
}
.wrap {
  display: flex;
  height: 50%;
  width: 100%;
}
.wrap-item {
  width: 20%;
  height: 100%;
  text-align: center;
  color: #fff;
}
</style>
