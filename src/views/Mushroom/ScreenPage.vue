<template>
  <div class="page">
    <!--头部-->
    <div class="page-top">
      <div class="title">蘑菇房环境因子收集可视化大屏系统</div>
    </div>
    <div class="page-content">
      <div class="left">
        <div class="left-item">
          <div class="alltitle">
            <img src="../../assets/images/tem.png" /><b>蘑菇房内温度</b>
          </div>
          <TemData class="echart-box" v-if="currentDataTime " :TemData="ineerTemData" :TemTime="arrivedTime"></TemData>
        
        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../assets/images/hum.png" /><b>蘑菇房内湿度</b>
          </div>
          <HumData class="echart-box"  :HumData="innerHumData"  v-if="currentDataTime " 
            :HumTime="arrivedTime"></HumData> 
        </div>
      </div>
      <div class="center" style="position: relative">
        <div class="center-top">
          <div style="width: 50%; height: 8rem; margin-left: 5%; margin-right: 5%">
            <div style="
                color: #fff;
                height: 3rem;
                line-height: 3rem;
                font-size: 1rem;
              ">
              最新数据更新时间
            </div>
            <div class="time">{{ currentDataTime }}</div>
          </div>
          <!--<div style="width:30%">控制摄像头方向</div>-->
          <div style="width: 40%; height: 100%; display: flex">
            <div style="width: 50%; height: 100%">
              <div style="
                  text-align: center;
                  color: #fff;
                  height: 2rem;
                  line-height: 2rem;
                  font-size: 1rem;
                ">
                传感器数
              </div>
              <div style="position: relative">
                <div class="circle"></div>
                <div class="circle-content">5</div>
              </div>
            </div>
            <div style="width: 50%; height: 100%">
              <div style="
                  text-align: center;
                  color: #fff;
                  height: 2rem;
                  line-height: 2rem;
                  font-size: 1rem;
                ">
                图片采集
              </div>
              <div style="position: relative">
                <div class="circle2"></div>
                <div class="circle-content">1</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-item1" style="margin-bottom: 5px;">
          <div class="alltitle" >
            <img src="../../assets/images/new.png" /><b>实时数据</b>
          </div>
          <dv-border-box-8  :reverse="true" style="height: 13vh; overflow: hidden;">
            <div class="wrap">
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/tem.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ ineerTemData[ineerTemData.length-1] }}</b
                  >°C
                </div>
                <div class="text-h2">蘑菇房内温度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/hum.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{innerHumData[innerHumData.length-1] }}</b
                  >%RH
                </div>
                <div class="text-h2">蘑菇房内湿度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/tem.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ outTemData[outTemData.length-1] }}</b
                  >°C
                </div>
                <div class="text-h2">蘑菇房外温度</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../assets/images/hum.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{outHumData[outHumData.length-1] }}</b
                  >%RH
                </div>
                <div class="text-h2">蘑菇房外湿度</div>
              
              </div>
            </div>
          </dv-border-box-8>
        </div>
        <div class="video">
          <swiper  style="
              width: 100%;
              height: 100%;
              overflow: hidden;
              position: relative;
            ">
            <!-- <swiper-slide class="swiper-slide">
              <Video :cVideoId="'E10858152'"></Video>
            </swiper-slide> -->
            <swiper-slide class="swiper-slide">
              <!-- 太阳能 -->
              <!-- <Video1 :cVideoId="'K33949606'"></Video1> -->
              <!-- 插电 -->
               <Video1 :cVideoId="'J92141606'" :cVideoNum="1" :height="65" :width="100"></Video1> 
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="right">
        <div class="left-item">
          <div class="alltitle">
            <img src="../../assets/images/tem.png" /><b>蘑菇房外温度</b>
          </div>
          <TemData class="echart-box" v-if="currentDataTime " :TemData="outTemData" :TemTime="arrivedTime"></TemData>
        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../assets/images/hum.png" /><b>蘑菇房外湿度</b>
          </div>
          <HumData class="echart-box"  :HumData="outHumData"  v-if="currentDataTime " 
          :HumTime="arrivedTime"></HumData> 
        </div>
      
      </div>
    </div>
  </div>
</template>
<script>
import mqtt from "mqtt/dist/mqtt.min.js";
import HumData from "../../views/Mushroom/cpns/HumData.vue";
import TemData from "../../views/Mushroom/cpns/TemData.vue";
// import Video from "../../components/large-cpns/Video.vue";
import Video1 from "../../components/large-cpns/Video1.vue";
import { borderBox8 } from "@/compat/data-view";
import { swiper, swiperSlide, directive } from "@/compat/swiper";

export default {
  data() {
    return {
      ineerTemData: [0,],//蘑菇房内温度
      innerHumData: [0,], //蘑菇房内湿度数据
      outHumData: [0,], //蘑菇房外湿度数据
      outTemData: [0,],//蘑菇房外温度
      arrivedTime: [0,], //数据到达时间
      currentDataTime:'',
      topic: "/corx/pub/youki1234p",
      mqttUrl: {
        head: "ws", // 必须是 ws 或 wss （mqtt:// 或 mqtts:// 必须让后端开放websocket服务）
        host: "pet.corxnet.com", // ip地址
        port: 8083, // 服务端口
        tailPath: "mqtt", // 服务路径
      },
      mqttOpts: {
        keepalive: 60,
        clientId: "clientId-" + Math.random().toString(16).substr(2, 8),
        username: "corxtest",
        password: "corx123456",
        connectTimeout: 10 * 1000,
      },
      client: "",
      clientCount: 0,
      receivedMessage: {
        C11:0,C12:0,C13:0,C14:0
      }, // 用于存储接收到的消息
    };
  },
  created() { },
  mounted() {
    // this.initMqtt();
    this.initdata();
  },

  methods: {
    initdata(){
      if(localStorage.getItem("currentDataTime")!= null  && JSON.parse( localStorage.getItem("ineerTemData")).length>0){
        this.currentDataTime= localStorage.getItem("currentDataTime")
        this.ineerTemData = JSON.parse( localStorage.getItem("ineerTemData"));
        this.innerHumData = JSON.parse( localStorage.getItem("innerHumData"));
        this.outHumData = JSON.parse( localStorage.getItem("outHumData"));
        this.outTemData = JSON.parse( localStorage.getItem("outTemData"));
        this.arrivedTime = JSON.parse( localStorage.getItem("arrivedTime"));
        console.log( this.currentDataTime);
        
      }
    },
    savaData(){
      if(this.arrivedTime.length>0){
      localStorage.setItem("currentDataTime",this.currentDataTime)
      localStorage.setItem("ineerTemData",JSON.stringify(this.ineerTemData)) 
      localStorage.setItem("innerHumData",JSON.stringify(this.innerHumData))
      localStorage.setItem("outHumData",JSON.stringify(this.outHumData))
      localStorage.setItem("outTemData",JSON.stringify(this.outTemData))
      localStorage.setItem("arrivedTime",JSON.stringify(this.arrivedTime))
      }
    },
    getTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    
    if(this.arrivedTime.length<15){
       this.arrivedTime.push(minute)
    }else {
      this.arrivedTime.shift()
      this.arrivedTime.push(minute)
    }
   
    let currentDate = year + "年" + month + "月" + day + "日";
    let currentTime = hour + "时" + minute + "分" ;
    this.currentDataTime =currentDate+ currentTime
    // localStorage.setItem("currentDataTime",this.currentDataTime)
  },
    async initMqtt() {
      // let opts = JSON.parse(JSON.stringify(this.mqttOpts));
      
      this.client = mqtt.connect(
        `${this.mqttUrl.head}://${this.mqttUrl.host}:${this.mqttUrl.port}/${this.mqttUrl.tailPath}`,
        // "ws://pet.corxnet.com:8083/mqtt",
        this.mqttOpts
      );
      this.client.on("connect", this.handleConnect);
      this.client.on("message", this.handleMessage);
      this.client.on("reconnect", this.handleReconnect);
      this.client.on("error", this.handleError);
    },

    handleConnect() {
      console.log("mqtt_连接成功");
      this.client.subscribe(this.topic);
    },

    handleMessage(topic, message) {
     
      this.receivedMessage = JSON.parse(message?.toString() || {});
      console.log(this.receivedMessage, "mqttttttttt");
       this.getTime()
      if (this.ineerTemData.length < 15) {
        this.innerHumData.push(this.receivedMessage.C11)
        this.ineerTemData.push(this.receivedMessage.C12)
        this.outHumData.push(this.receivedMessage.C13)
        this.outTemData.push(this.receivedMessage.C14)
        
       
      } else {
        this.ineerTemData.shift()
        this.innerHumData.shift()
        this.outTemData.shift()
        this.outHumData.shift()
        this.arrivedTime.shift()
        this.innerHumData.push(this.receivedMessage.C11)
        this.ineerTemData.push(this.receivedMessage.C12)
        this.outHumData.push(this.receivedMessage.C13)
        this.outTemData.push(this.receivedMessage.C14)
      
      }
      this.savaData()
     
    },

    handleReconnect(error) {
      console.log(`正在第${this.clientCount}重连`, error);
      this.clientCount++;
      if (this.clientCount >= 10) {
        this.client.end();
      }
    },

    handleError(error) {
      console.log("连接失败", error);
    },

    mqttPublish(topic, message) {
      this.client.publish(topic, JSON.stringify(message));
    },
   
  },

  beforeUnmount() {
    this.savaData(),
    this.$emit("mqtt-close") // 关闭mqtt链接需要的前置操作
    // 使用延迟确保消息发送完成后再关闭连接
    setTimeout(() => {
      this.client.end(true, {}, () => {
        console.log("MQTT连接已成功关闭");
      });
    }, 100); // 延迟时间根据实际情况调整，确保消息发送完成
    // this.client.end();
  },
  /*更新时间*/
  updateTime() {
    let that = this;
    setInterval(() => {
      that.getTime();
    }, 1000);
  },
 

  components: {
    Video1,
    TemData,
    HumData,
    swiper,
    swiperSlide,
  },
};
</script>
<style scoped>
@import url("../../style/screenPage.css");

.current-wrap {
  height: 8rem;
}

.page-content {
  width: 100%;
  height: 88%;
  display: flex;
  box-sizing: border-box;
  padding: 0;
}
.left-item1{
  height: 10rem;
}
.left-item {
  margin-top: 6%;
  width: 100%;
  height: 40%;
  /* margin-bottom: 2%; */
}
.img-h2 {
  height: 3vh;
}
.text-h1 {
  height: 2.5vh;
  line-height: 2.5vh;
  font-size: 1vw;
  overflow: hidden;
}
.text-h2 {
  height: 2.5vh;
  line-height: 2.5vh;
  font-size: 0.8rem;
}
.b-size {
  font-size: 1.2rem;
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
  width: 25%;
  height: 100%;
  text-align: center;
  color: #fff;
}
</style>
