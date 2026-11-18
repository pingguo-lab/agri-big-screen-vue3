<template>
    <div class="wrap-items border">
      <div class="wrap">
      <div class="wrap-item">
        <img src="../assets/images/airtem.png" alt="">
        <div class="data-detail">{{this.real_airTemData}}<span>°C</span></div>
        <p>空气温度</p>
      </div>
      <div class="wrap-item">
        <img src="../assets/images/airhum.png" alt="">
        <div class="data-detail">{{this.real_airHumData}}<span>%rh</span></div>
        <p>空气湿度</p>
      </div>
      <div class="wrap-item">
      <img src="../assets/images/airpr.png" alt="">
          <div class="data-detail">{{this.real_airPreData}}<span>kpa</span></div>
          <p>大气压</p>
        </div>
        <div class="wrap-item">
          <img src="../assets/images/sunradio.png" alt="">
          <div class="data-detail">{{this.real_sunData}}<span>W/(㎡)</span></div>
          <p>太阳辐射</p>
        </div>
        <div class="wrap-item">
          <img src="../assets/images/co2.png"  alt="">
          <div class="data-detail">{{this.real_co2Data}}<span>ppm</span></div>
          <p>CO2浓度</p>
        </div>
        </div>
        <div class="wrap">
        <div class="wrap-item">
          <img src="../assets/images/sunlight.png" alt="">
          <div class="data-detail">{{ this.real_illuminance}}<span>lx</span></div>
          <p>光照强度</p>
        </div>
        <div class="wrap-item">
          <img src="../assets/images/soilhum.png" alt="">
          <div class="data-detail">{{ this.real_soilHumData}}<span>%rh</span></div>
          <p>土壤湿度</p>
        </div>
        <div class="wrap-item">
          <img src="../assets/images/soiltem.png" alt="">
          <div class="data-detail">{{ this.real_soilTem}}<span>%rh</span></div>
          <p>土壤温度</p>
        </div>
        <div class="wrap-item">
          <img src="../assets/images/conduct.png" alt="">
          <div class="data-detail">{{ this.real_soilConduct}}<span>us/cm</span></div>
          <p>土壤电导率</p>
        </div>
        <div class="wrap-item">
          <img src="../assets/images/ph.png" alt="">
          <div class="data-detail">{{ this.real_soilPH}}<span></span></div>
          <p>土壤PH值</p>
        </div>
      </div>
      </div>
</template>

<script>
import '../assets/css/global.css'
export default {
  data() {
    return {
      arrivedTime: [],
      real_airTemData: 0, // 最新的空气温度数据
      real_airHumData: 0, // 最新的空气湿度数据
        real_co2Data: 0,    //最新的CO2浓度
        real_illuminance: 0, // 最新的光照数据
        real_soilPH:0,
        real_soilConduct:0,
        real_soilTem:0,
        real_soilHumData:0,
        real_sunData:0,
        real_airPreData:0,
    }
  },
  methods: {
    getData() {
      if (localStorage.getItem('topicId')) {
        this.topicId = localStorage.getItem('topicId')
      }
      this.$get('http://121.5.9.113:8090/api/v1/msg', {
        topicId: '31', timeType: 'realtime', room: '1'
      }).then(res => {
        let resData = res.data;
        this.real_airTemData=resData[0].temperature?resData[0].temperature:'0'// 最新的空气温度数据
        this.real_airHumData=resData[0].humidity?resData[0].humidity:'0' // 最新的空气湿度数据
        this.soilPH=resData[0].soilPh?resData[0].soilPh:'0'
                  this.co2Data= resData[0].co2?resData[0].co2:'0'
                  this.soilConduct= resData[0].conductivity?resData[0].conductivity:'0' //土壤电导率
                  this.airPre= resData[0].airPressure?resData[0].airPressure:'0'    //大气压
                  this.real_illuminance=resData[0].illuminance?resData[0].illuminance:'0'  // 最新的光照数据
                  this.real_soilTemData = resData[0].soilTemp?resData[0].soilTemp:'0'  // 最新的土壤温度数据
                  this.real_soilHumData=resData[0].soilHum?resData[0].soilHum:'0' // 最新的土壤湿度数据
                  this.real_sunData=resData[0].sunRadia?resData[0].sunRadia:'0'     // 最新的太阳辐射量数据
        this.currentDataTime = resData[0].arrived

        var time = resData[0].arrived.slice(11, 13)
        for (let i = 0; i < 10; i++) {
          if (time == 0) time = 24
          this.arrivedTime[i] = time + "点"
          time--
        }

      })
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped lang="less">
* {
  margin-top:0;
  padding: 0;
}

.wrap{
  display:flex;
  box-sizing:border-box;
  width:100%;

    img {
      height: 2rem;
      margin-right: 10px;

    h4 {
      font-size: 20px;
      letter-spacing: 5px;
      text-shadow: 0 0 .3rem #00d8ff;
    }
  
  }
}
  .wrap-items {
    padding: 14px;
    width:418px;
    height:240px;
  }
    .wrap-item {
      margin-top:-6px;
      text-align:center;
      width: 25%;
      height: 100%;
      img {
        width: 50%;
        margin-top: 15px;
     }
      .data-detail {
        margin-top:-10px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 17px;
        font-weight: 700;
        span {
          font-size: 10px;
          margin-left: 0px;
          font-weight: 100;

        }
      }
      p {
        font-size: 15px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
    }
</style>