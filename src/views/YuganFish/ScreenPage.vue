<template>
  <div class="page">
    <!--头部-->
    <div class="page-top">
      <div class="title">余干水产养殖可视化大屏</div>
    </div>
    <div class="page-content">
      <div class="left">
        <div class="left-item1">
          <div class="alltitle">
            <img src="../../assets/images/new.png" /><b>实时数据</b>
          </div>
          <div class="current-wrap border">
            <!-- 第一排数据 -->
            <div class="wrap">
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/water.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ allRainfall }}</b>
                  mm
                </div>
                <div class="text-h2">总雨量</div>
              </div>
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
                  <b class="b-size">{{ co2Data }}</b
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
              <!-- <div class="wrap-item">
                <div>
                  <img src="../../assets/images/PM10.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ pm_10 }}</b
                  >μg/m3
                </div>
                <div class="text-h2">PM10</div>
              </div> -->
            </div>
            <!-- 第二排数据 -->
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
              <!-- <div class="wrap-item">
                <div>
                  <img src="../../assets/images/sunradio.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ real_sunData }}</b
                  >W/(㎡)
                </div>
                <div class="text-h2">太阳辐射</div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../assets/images/tem.png" /><b>空气温湿度</b>
          </div>
          <AirChart
            class="echart-box"
            v-if="airTemData || airHumData"
            ref="temperature"
            :cAirTem="airTemData"
            :cAirHum="airHumData"
            :cArrivedTime="arrivedTime"
          ></AirChart>
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
                <div class="circle-content">30</div>
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
                <div class="circle-content">20</div>
              </div>
            </div>
          </div>
        </div>
        <div class="video">
          <swiper
            :options="swiperOption"
            ref="swiper"
            style="
              width: 100%;
              height: 100%;
              overflow: hidden;
              position: relative;
            "
          >
            <swiper-slide
              class="swiper-slide"
              v-for="(video, index) in nvrVideoList"
              :key="index"
            >
              <Video1
                v-if="isVisible(index)"
                :cVideoId="video.id"
                :cVideoNum="video.num"
                :playList="[prevVideoIdx, curVideoIdx, nextVideoIdx]"
                :width="100"
                :height="100"
              ></Video1>
            </swiper-slide>
            <div
              class="swiper-button-prev"
              style="color: #fff"
            ></div>
            <div
              class="swiper-button-next"
              ref="swiperNext"
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
            <img src="../../assets/images/do.png" /><b>溶氧情况</b>
          </div>
          <swiper
            :options="swiperOption"
            style="
              width: 100%;
              height: 100%;
              overflow: hidden;
              position: relative;
            "
          >
            <swiper-slide
              class="swiper-slide"
              v-for="(id, index) in topicList"
              :key="id"
            >
              <DoChart
                class="echart-box"
                v-if="doData"
                ref="do"
                :id="index + 1"
                :cDo="doData[`${id}`]"
                :cDoRatio="doRatioData[`${id}`]"
                :cDoTime="arrivedTime"

            
              ></DoChart>
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
    </div>
    <div class="page-bottom">
      <div class="bottom-left">
        <div class="alltitle">
          <img src="../../assets/images/nh.png" /><b>氨氮含量</b>
        </div>
        <swiper
          :options="swiperOption"
          style="
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
          "
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(id, index) in topicList"
            :key="id"
          >
            <NH3NChart
              class="echart-box"
              v-if="nhData"
              :id="index + 1"
              :cNhData="nhData[`${id}`]"
              :cArrivedTime="arrivedTime"
            ></NH3NChart>
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
      <div class="bottom-center">
        <div class="alltitle">
          <img src="../../assets/images/water.png" /><b>雨量</b>
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
          <img src="../../assets/images/ph.png" /><b>PH值</b>
        </div>
        <swiper
          :options="swiperOption"
          style="
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: relative;
          "
        >
          <swiper-slide
            class="swiper-slide"
            v-for="(id, index) in topicList"
            :key="id"
          >
            <PhChart
              class="echart-box"
              v-if="phData"
              ref="ph"
              :id="index + 1"
              :cPhData="phData[`${id}`]"
              :cArrivedTime="arrivedTime"
            ></PhChart>
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
  </div>
</template>
<script>
import axios from "axios";
import DoChart from "./cpns/DoChart.vue";
import AirChart from "./cpns/AirChart.vue";
import NH3NChart from "./cpns/NH3-NChart.vue";
import PhChart from "./cpns/PhChart.vue";
import HumCurve from "../../components/large-cpns/HumCurve.vue";
import WaterBar from "../../components/large-cpns/WaterBar.vue";
import SunBar from "../../components/large-cpns/SunBar.vue";
// import Video from "../../components/large-cpns/Video.vue";
import Video1 from "../../components/large-cpns/Video1.vue";
import WindDirection from "../../components/large-cpns/WindDirection.vue";
import { swiper, swiperSlide, directive } from "@/compat/swiper";

export default {
  data() {
    let vm = this;
    return {
      activeIndex: 0,
      curVideoIdx: 0,
      ipcVideoList: ["K95190567"], // ipc 摄像头列表
      nvrVideoList: [
        { id: "AW6489612", num: 1 },
        { id: "AW6489612", num: 2 },
        { id: "AW6489612", num: 3 },
        { id: "AW6489612", num: 4 },
        { id: "AW6489612", num: 5 },
        { id: "AW6489612", num: 6 },
        { id: "AW6489612", num: 7 },
        { id: "AW6489612", num: 8 },
        { id: "AW6489612", num: 9 },
        { id: "AW6489612", num: 10 },
        { id: "AW6489612", num: 11 },
        { id: "AW6489612", num: 12 },
        { id: "AW6489612", num: 13 },
        { id: "AW6489612", num: 14 },
        { id: "AW6489612", num: 15 },
        { id: "AW6489612", num: 16 },
      ], // nvr 摄像头列表
      curIdx: 0, // 当前网关位置
      //topicList: [42, 43, 44], // 轮播展示的网关号
      topicList: [37],
      arrivedTime: [], //数据到达时间
      waterArrivedTime: [], //雨量蒸发量数据到达时间
      airTemData: [], //空气温度数据
      soilTemData: [], //土壤温度数据
      airHumData: [], //空气湿度数据
      soilHumData: [], //土壤湿度数据
      sunData: [], //太阳辐射量数据
      waterData: [], //降雨量数据

      // 鱼塘数据
      doData: {}, // 溶解氧数据
      doRatioData: {}, // 溶氧比数据
      nhData: {}, // 氨氮含量
      phData: {}, // ph值

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
      allRainfall: 0, //最新的总雨量
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
        // autoplay: {
        //   delay: 30000, //自动切换的时间间隔，单位ms
        //   disableOnInteraction: true, //用户操作swiper之后，是否禁止autoplay
        //   autoplayStopOnLast: true,
        // },
        // // 虚拟滚动
        // virtual: true,

        on: {
          slideChange: function() {
            if (vm.activeIndex > this.activeIndex) {
              vm.curVideoIdx--;
            } else {
              vm.curVideoIdx++;
            }
            if (vm.curVideoIdx < 0) {
              vm.curVideoIdx = vm.nvrVideoList.length - 1;
            }
            if (vm.curVideoIdx > vm.nvrVideoList.length - 1) {
              vm.curVideoIdx = 0;
            }
            vm.activeIndex = this.activeIndex;
            console.log(vm.prevVideoIdx, vm.curVideoIdx, vm.nextVideoIdx);
          },
        },
      },
      weather: "", //天气预报接口获取的天气数据，晴、多云等
      weather_tem: "", //天气预报接口获取的温度数据
      city: "", //天气预报中当前城市
    };
  },
  computed: {
    prevVideoIdx() {
      if (this.activeIndex == 0) {
        return this.nvrVideoList.length - 1;
      } else {
        return this.activeIndex - 1;
      }
    },
    nextVideoIdx() {
      if (this.activeIndex == this.nvrVideoList.length - 1) {
        return 0;
      } else {
        return this.activeIndex + 1;
      }
    },
  },
  created() {},
  mounted() {
    //this.updateTime();
    this.initData();
    this.updateData(this.topicList);
    console.log(666, this.$refs.swiper.$swiper);
  },
  methods: {
    isVisible(index) {
      return (
        index === this.curVideoIdx ||
        index === this.prevVideoIdx ||
        index === this.nextVideoIdx
      );
    },
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
    // 40 41
    getData(topicId) {
      // if (localStorage.getItem("topicId")) {
      //   this.topicId = localStorage.getItem("topicId");
      // }
      //服务器IP地址：http://121.40.193.245:8080，服务器域名：https:jxautts.top
      this.$get("http://121.5.9.113:8090/api/v1/allMsg", {
        topicId: topicId,
        timeType: "realTime",
      }).then((res) => {
        let resData = res.data;
        this.allRainfall = resData[0].allRainfall
          ? resData[0].allRainfall
          : "0";
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
        this.pm_10 = resData[0].pm10 ? resData[0].pm10 : "0"; // 最新的pm10数据
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
    getChartData(topicId) {
      
      // this.$get("http://121.5.9.113:8090/api/v1/allMsg", {
      //   topicId: topicId,
      //   timeType: "hour",
      // }).then((res) => {
      //   console.log("fish", res);
      //   let resData = res.data;
        
      //   this.arrivedTime = resData.map((item) => {
      //     return item.ts.slice(11, 13) + "点";
      //   });

      //   this.sunData = resData.map((item) => {
      //     return (item.sunRadia - 0).toFixed(2);
      //   });

      //   // 鱼塘数据
      //   this.doData[`${topicId}`] = resData.map((item) => {
      //     return (item.temp1 - 0).toFixed(2);
      //   });
      //   this.doRatioData[`${topicId}`] = resData.map((item) => {
      //     return (item.temp2 - 0).toFixed(2);
      //   });

      //   this.nhData[`${topicId}`] = resData.map((item) => {
      //     return (item.temp4 - 0).toFixed(2);
      //   });
      //   this.phData[`${topicId}`] = resData.map((item) => {
      //     return (item.temp3 - 0).toFixed(2);
      //   });
      // });
       // 以上均为原来未改变的数据，此时溶氧，氨氮类可以轮换鱼塘
      
      this.$get("http://121.5.9.113:8090/api/v1/allMsg", {
    topicId: topicId,
    timeType: "realTime",   // 想用实时就改成 "realTime"
  }).then((res) => {
    if (!res.data || res.data.length === 0) return;

    const list = res.data;
    // 溶解氧 ➜ temp1
    this.doData[topicId] = list.map(item => (item.temp1 == null ? 0 : Number(item.temp1)).toFixed(2));
    // 溶氧比 ➜ temp2
    this.doRatioData[topicId] = list.map(item => (item.temp2 == null ? 0 : Number(item.temp2)).toFixed(2));
    // PH值 ➜ temp3（新增）
    this.phData[topicId] = list.map(item => (item.temp3 == null ? 0 : Number(item.temp3)).toFixed(2));
    // 氨氮 ➜ temp4（新增）
    this.nhData[topicId] = list.map(item => (item.temp4 == null ? 0 : Number(item.temp4)).toFixed(2));
    // 时间轴 ➜ ts
    if (this.arrivedTime.length === 0) {
      this.arrivedTime = list.map(item => item.ts.slice(11, 13) + "点");
    }
    console.log(`✅ topic ${topicId} 赋值完成`, {
      doData: this.doData[topicId],
      doRatioData: this.doRatioData[topicId],
    });
  });


    },
    /*获取天气数据*/
    getWaterData(topicId) {
      // if (localStorage.getItem("topicId")) {
      //   this.topicId = localStorage.getItem("topicId");
      // }
      this.$get("http://121.5.9.113:8090/api/v1/allMsg", {
        topicId: topicId,
        timeType: "hour",
      }).then((res) => {
        let resData = res.data;
        console.log("rain", resData);
        this.waterArrivedTime = resData.map((item) => {
          return item.ts.slice(11, 13) + "点";
        });
        this.waterData = resData.map((item) => {
          return (item.rainfall - 0).toFixed(2);
        });

        this.sunData = resData.map((item) => {
          return (item.sunRadia - 0).toFixed(2);
        });
        this.airTemData = resData.map((item) => {
          return (item.temperature - 0).toFixed(2);
        });

        this.airHumData = resData.map((item) => {
          return (item.humidity - 0).toFixed(2);
        });
      });
    },
    /*从高德地图获取天气预报数据*/
    getWeatherData() {
      //获取余干天气，城市编码为361127
      this.$get(
        "https://restapi.amap.com/v3/weather/weatherInfo?city=361127&key=f57f5f6b29fbd1039f7888c2fc8f2d48"
      ).then((res) => {
        this.weather = res.lives[0].weather;
        this.weather_tem = res.lives[0].temperature;
        this.city = res.lives[0].city;
      });
    },
    /*界面数据初始化*/
    initData() {
      this.getData(37, 38); // 获取最新数据
      for (const key of this.topicList) {
        this.getChartData(key); //按小时获取图表数据
      }
      this.getWaterData(37); //按天获取雨量蒸发量数据
      this.getWeatherData();
      // this.updateTime(); // 获取当前时间
      this.swiperInterval(30000);
    },

    // 每分钟切换当前展示的网关号及数据
    updateData(topicList) {
      //取消定时器
      if (this.timeId) {
        clearInterval(this.timeId);
      }
      this.timeId = setInterval(() => {
        this.initData();

        console.log(this.curIdx);
      }, 300000);
    },
    /**
     * 定时滚动轮播图（模拟用户点击）
     * @param {间隔时间} time
     */
    swiperInterval(time) {
      if (swiperTimer) {
        clearInterval(swiperTimer);
      }
      const btn = this.$refs.swiperNext;
      const swiperTimer = setInterval(function() {
        // 创建点击事件
        var clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        // 触发点击事件
        btn.dispatchEvent(clickEvent);
      }, time);
    },
  },

  components: {
    AirChart,
    NH3NChart,
    DoChart,
    PhChart,
    WaterBar,
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

.video-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1px; /* 可选，用于定义长方形之间的间距 */
  width: 100%; /* 可根据需要调整大长方形的宽度 */
  height: 100%; /* 可根据需要调整大长方形的高度 */
}

.video-item {
  position: relative;
}

.swiper-button-prev,
.swiper-button-next {
  display: none !important;
}

.bottom-left:hover .swiper-button-prev,
.bottom-left:hover .swiper-button-next {
  display: block !important;
}
.bottom-right:hover .swiper-button-prev,
.bottom-right:hover .swiper-button-next {
  display: block !important;
}
.right-item:hover .swiper-button-prev,
.right-item:hover .swiper-button-next {
  display: block !important;
}
.video:hover .swiper-button-prev,
.video:hover .swiper-button-next {
  display: block !important;
}
</style>
