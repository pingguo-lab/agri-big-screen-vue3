<template>
  <div class="page">
    <!--头部-->
    <div class="page-top">
      <div class="title">冷库环境因子收集可视化大屏系统</div>
    </div>
    <div class="page-content">
      <div class="left">
        <div class="left-item">
          <div class="alltitle">
            <img src="../../../assets/images/RAT1.png" /><b>回风温度T1</b>
          </div>

          <T1s :T1Data="getColumnData(RAT1, flag)" :T1Time="arrivedTime" style="height: 94%;"></T1s>

        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../../assets/images/turangwendu.png" /><b>送风温度T2</b>
          </div>
          <T2s :T2Data="getColumnData(SAT2, flag)" :T2Time="arrivedTime" style="height: 94%;"></T2s>
        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../../assets/images/T3.png" /><b>果芯温度T3</b>
          </div>
          <T3s :TData="getColumnData(FCT3, flag)" :TTime="arrivedTime" style="height: 94%;"></T3s>
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
                <div class="circle-content">{{ n }}</div>
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
                <div class="circle-content">0</div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-item1" style="margin-bottom: .3rem;">
          <div class="alltitle">
            <img src="../../../assets/images/new.png" /><b>实时数据</b>
          </div>
          <dv-border-box-8 :reverse="true" style="height: 30vh; overflow: hidden;">
            <div class="wrap">

              <div class="wrap-item">
                <div>
                  <img src="../../../assets/images/RAT1.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ RAT1[RAT1.length - 1][flag] }}</b>°C
                </div>
                <div class="text-h2">回风温度T1</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../../assets/images/turangwendu.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ SAT2[SAT2.length - 1][flag] }}</b>°C
                </div>
                <div class="text-h2">送风温度T2</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../../assets/images/T3.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ FCT3[FCT3.length - 1][flag] }}</b>°C
                </div>
                <div class="text-h2">果芯温度T3</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../../assets/images/T3.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ FCT4[FCT4.length - 1][flag] }}</b>°C
                </div>
                <div class="text-h2">果芯温度T4</div>
              </div>
              <div class="wrap-item">
                <div>
                  <img src="../../../assets/images/RH.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ RH[RH.length - 1][flag] }}</b>%RH
                </div>
                <div class="text-h2">相对湿度</div>

              </div>
            </div>
            <div class="wrap">
              <div class="wrap-item" v-if="flag<3" >
                <div>
                  <img src="../../../assets/images/EC.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ EC[EC.length - 1][flag] }}</b>%RH
                </div>
                <div class="text-h2">乙烯浓度</div>

              </div>
              <div class="wrap-item" v-if="flag<3" >
                <div>
                  <img src="../../../assets/images/time.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ RD[RD.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">催熟时长</div>

              </div>
              <div class="wrap-item" v-if="flag<3" >
                <div>
                  <img src="../../../assets/images/FRS.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ FRS[FRS.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">风机转速</div>

              </div>
              <div class="wrap-item" v-if="flag<3">
                <div>
                  <img src="../../../assets/images/WS.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ WS[WS.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">库房状态</div>

              </div>
              <div class="wrap-item"  v-if="flag >2&&flag<8">
                <div>
                  <img src="../../../assets/images/WS.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ WS[WS.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">主机状态</div>

              </div>
              <div class="wrap-item" v-if="flag<3||flag >= 8 ">
                <div>
                  <img src="../../../assets/images/RS.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ RS[RS.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">制冷状态</div>

              </div>
              <div class="wrap-item" v-if="flag >= 8&&flag<12 ">
                <div>
                  <img src="../../../assets/images/RS.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ RS[RS.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">化霜状态</div>

              </div>
              <div class="wrap-item" v-if="flag<3">
                <div>
                  <img src="../../../assets/images/HS.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ HS[HS.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">加热状态</div>

              </div>
              <div class="wrap-item" v-if="flag >2&&flag<8">
                <div>
                  <img src="../../../assets/images/HS.png" class="img-h2" />
                </div>
                <div class="text-h1">
                  <b class="b-size">{{ HS[HS.length - 1][flag] }}</b>
                </div>
                <div class="text-h2">辅机状态</div>

              </div>

            </div>
          </dv-border-box-8>
        </div>
        <div style="height: 30vh;">
          <dv-border-box-12
            style="height: 30vh; display: grid; grid-template-rows: repeat(3,1fr); box-sizing: border-box;">
            <div style="display: grid; grid-template-columns: repeat(4,1fr); margin: 3vh 0 0 1vw; gap: .8vw;">
              <div class="button " :class="flag === 0?'active':''" @click="flag=0, n=11"> 1号催熟库 </div>
              <div class="button" @click="flag=1, n=11 " :class="flag === 1?'active':''"> 2号催熟库 </div>
              <div class="button" @click="flag=2, n=11" :class="flag === 2?'active':''" > 3号催熟库 </div>
              <div class="button" @click="flag=3,n=7 " :class="flag === 3?'active':''" > 1号库 </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(4,1fr);margin: 3vh 0 0 1vw; gap: .8vw;">
              <div class="button" @click="flag=4,n=7" :class="flag === 4?'active':''" > 2号库 </div>
              <div class="button" @click="flag=5,n=7" :class="flag === 5?'active':''" > 3号库 </div>
              <div class="button" @click="flag=6,n=7" :class="flag === 6?'active':''" > 4号库 </div>
              <div class="button" @click="flag=7,n=7" :class="flag === 7?'active':''" > 5号库 </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(5,1fr); margin: 3vh 0 0 1vw;">
              <div class="button" @click="flag=8,n=7" :class="flag === 8?'active':''" > 6号库 </div>
              <div class="button" @click="flag=9,n=7" :class="flag === 9?'active':''" > 7号库 </div>
              <div class="button" @click="flag=10,n=7" :class="flag === 10?'active':''" > 8号库 </div>
              <div class="button" @click="flag=11,n=7" :class="flag === 11?'active':''" > 9号库 </div>
              <div class="button" @click="flag=12,n=3" :class="flag === 12?'active':''" > 川堂 </div>

            </div>
          </dv-border-box-12>
        </div>
      </div>
      <div class="right">
        <div class="left-item">
          <div class="alltitle">
            <img src="../../../assets/images/T3.png" /><b>果芯温度T4</b>
          </div>
          <T3s :TData="getColumnData(FCT4, flag)" :TTime="arrivedTime" style="height: 94%;"></T3s>

        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../../assets/images/RH.png" /><b>相对湿度</b>
          </div>
          <Tem :TemData="getColumnData(RH, flag)" :TemTime="arrivedTime" style="height: 94%;"></Tem>
        </div>
        <div class="left-item">
          <div class="alltitle">
            <img src="../../../assets/images/EC.png" /><b>乙烯浓度</b>
          </div>
          <ECs :ECData="getColumnData(EC, flag)" :ECTime="arrivedTime" style="height: 94%;"></ECs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mqtt from "mqtt/dist/mqtt.min.js";
import T1s from "./cpn/T1.vue";
import T2s from "./cpn/T2.vue";
import T3s from "./cpn/T3.vue";
import ECs from "./cpn/EC.vue";
import { borderBox8, borderBox12 } from "@/compat/data-view";
import { swiper, swiperSlide, directive } from "@/compat/swiper";

import Tem from "./cpn/Tem.vue";


export default {
  data() {
    return {
      flag: 0,
      n:11,
      MAX_LENGTH: 15,
      T1: [[0, 0, 0, 0, 0, 0, 0, 0, 0],],
      T2: [[0, 0, 0, 0, 0, 0, 0, 0, 0],],
      T3: [[0, 0, 0, 0, 0, 0, 0, 0, 0],],
      T4: [[0, 0, 0, 0, 0, 0, 0, 0, 0],],


      RAT1: [[0, 0, 0,0,0,0,0,0,0,0,0,0,0]],//催熟库库回风温度T1
      SAT2: [[0, 0, 0,0,0,0,0,0,0,0,0,0,0]], //催熟库库送风温度T2
      FCT3: [[0, 0, 0,0,0,0,0,0,0,0,0,0,0]],  //催熟库库果芯温度T3
      FCT4: [[0, 0, 0,0,0,0,0,0,0,0,0,0,0]],//催熟库库果芯温度T4
      RH: [[0, 0, 0,0,0,0,0,0,0,0,0,0,0]],//催熟库库相对湿度RH%
      EC: [[0, 0, 0]], //催熟库库乙烯浓度
      RD: [[0, 0, 0]],//催熟库库催熟时长
      FRS: [[0, 0, 0]],//催熟库库风机转速
      WS: [[0, 0, 0,0,0,0,0,0,0,0]],//催熟库库房状态
      RS: [[0, 0, 0]], //催熟库库制冷状态
      HS: [[0, 0, 0]],//催熟库库加热状态
      Hstate: [],
      Astate: [],
      Rstate: [],
      Dstate: [],
      humidness: [],//湿度
      KT1: [],//川堂T1
      KT2: [],//川堂T2
      Kstate: [],//川堂制冷状态
      arrivedTime: [0,], //数据到达时间
      currentDataTime: '',
      topic: "FYBOX",
      mqttUrl: {
        head: "ws", // 必须是 ws 或 wss （mqtt:// 或 mqtts:// 必须让后端开放websocket服务）
        host: "219.229.216.16", // ip地址

        tailPath: "mqtt", // 服务路径
      },
      mqttOpts: {
        // port: 8083, // 服务端口
        keepalive: 60,
        clientId: "clientId-" + Math.random().toString(16).substr(2, 8),
        username: "corxtest",
        password: "corx123456",
        // username: "youki1234",
        // password: "123456",
        connectTimeout: 10 * 1000,
      },
      client: "",
      clientCount: 0,
      receivedMessage: {
        // C11:0,C12:0,C13:0,C14:0
      }, // 用于存储接收到的消息
    };
  },
  created() { },
  mounted() {
    this.initMqtt();
    setInterval(()=>{
      if(this.flag<12){this.flag ++}
      else {
        this.flag =0;
        
      }

    },10000)
  },

  methods: {
    keepData(array, value) {
      array.push(value);
      if (array.length > this.MAX_LENGTH) {
        array.shift(); // 移除第一个（最旧）元素
      }
    },

    getTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();

      if (this.arrivedTime.length >= this.MAX_LENGTH) {
        this.arrivedTime.shift()
      }

      this.arrivedTime.push(minute)

      let currentDate = year + "年" + month + "月" + day + "日";
      let currentTime = hour + "时" + minute + "分";
      this.currentDataTime = currentDate + currentTime

    },
    getColumnData(arr, colIndex) {
      let columnData = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][colIndex] !== undefined) {
          columnData.push(arr[i][colIndex]);
        }
      }
      return columnData;
    },
    async initMqtt() {

      this.client = mqtt.connect(
        // `${this.mqttUrl.head}://${this.mqttUrl.host}/${this.mqttUrl.tailPath}`,
        "ws://pet.corxnet.com:8083/mqtt",
        // "ws://219.229.216.16:8083/mqtt",
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
      this.getTime()

      console.log(this.receivedMessage, "mqttttttttt");
      let T1 = []
      let T2 = []
      let T3 = []
      let T4 = []
      let EC = [] //催熟库库乙烯浓度
      let RD = []//催熟库库催熟时长
      let RS = [] //催熟库库制冷状态
      let HS = []//催熟库库加热状态
      let RAT1 = []//催熟库库回风温度T1
      let WS = []  //催熟库库房状态
      let FCT3 = []   //催熟库库果芯温度T3
      let FCT4 = [] //催熟库库果芯温度T4
      let RH = []//催熟库库相对湿度RH%
      let SAT2 = [] //催熟库库送风温度T2
      let FRS = [] //催熟库库风机转速 
      let Hstate = [] // 主机状态
      let Astate = []  //辅机状态
      let Rstate = [] //制冷状态
      let Dstate = []//化霜状态
      let humidness = [] //湿度
      let KT1 = []//川堂T1
      let KT2 = []//川堂T2
      let Kstate = []//川堂制冷状态
      // 定义正则表达式模式和对应的数组
      const patterns = [
        { regex: /(\d+)号库T1/g, array: T1 },
        { regex: /(\d+)号库T2/g, array: T2 },
        { regex: /(\d+)号库T3/g, array: T3 },
        { regex: /(\d+)号库T4/g, array: T4 },
        { regex: /(\d+)号库主机状态/g, array: Hstate, },
        { regex: /(\d+)号库辅机状态/g, array: Astate, },
        { regex: /(\d+)号库制冷状态/g, array: Rstate, },
        { regex: /(\d+)号库化霜状态/g, array: Dstate, },
        { regex: /(\d+)号库湿度/g, array: humidness, },
        { regex: /(\d+)号库RH%/g, array: humidness, },
        { regex: /(\d+)号催熟库库乙烯浓度/g, array: EC },
        { regex: /(\d+)号催熟(库{1,2})催熟时长/g, array: RD },
        { regex: /(\d+)号催熟(库{1,2})制冷状态/g, array: RS },
        { regex: /(\d+)号催熟(库{1,2})加热状态/g, array: HS },
        { regex: /(\d+)号催熟(库{1,2})回风温度T1/g, array: RAT1 },
        { regex: /(\d+)号催熟库库房状态/g, array: WS },
        { regex: /(\d+)号催熟库库果芯温度T3/g, array: FCT3 },
        { regex: /(\d+)号催熟库库果芯温度T4/g, array: FCT4 },
        { regex: /(\d+)号催熟库库相对湿度RH%/g, array: RH },
        { regex: /(\d+)号催熟库库送风温度T2/g, array: SAT2 },
        { regex: /(\d+)号催熟库库风机转速/g, array: FRS },
        { regex: /川堂T1/g, array: KT1 },
        { regex: /川堂T2/g, array: KT2 },
        { regex: /川堂制冷状态/g, array: Kstate },

      ];

      // 处理接收到的消息
      for (let i in this.receivedMessage) {
        for (let { regex, array, } of patterns) {
          if (regex.test(i)) {
            array.push(this.receivedMessage[i.match(regex)]);
          }
        }
      }
   
      // 将结果推送到当前上下文
      // this.keepData(this.T1, T1);
      this.keepData(this.T2, T2);
      this.keepData(this.T3, T3);
      this.keepData(this.T4, T4);
      this.keepData(this.EC, EC);
      this.keepData(this.RD, RD);
      this.keepData(this.RS, RS.concat(Hstate).concat(Rstate).concat(Kstate));
      this.keepData(this.HS, HS.concat(Astate));
      this.keepData(this.RAT1, RAT1.concat(T1).concat(KT1));
      this.keepData(this.WS, WS.concat(Hstate));
      this.keepData(this.FCT3, FCT3.concat(T3));
      this.keepData(this.FCT4, FCT4.concat(T4));
      this.keepData(this.RH, RH.concat(humidness));
      this.keepData(this.SAT2, SAT2.concat(T2).concat(KT2));
      this.keepData(this.FRS, FRS);
      this.keepData(this.Hstate, Hstate); // 主机状态
      this.keepData(this.Astate, Astate); // 辅机状态
      this.keepData(this.Rstate, Rstate); // 制冷状态
      this.keepData(this.Dstate, RS.concat(Hstate).concat(Dstate) ); // 化霜状态
      this.keepData(this.humidness, humidness); // 湿度
      this.keepData(this.KT1, KT1); // 川堂T1
      this.keepData(this.KT2, KT2); // 川堂T2
      this.keepData(this.Kstate, Kstate); // 川堂制冷状态
      console.log(this.RS, "RS11111");
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
    // this.savaData(),
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
    T1s,
    T2s,
    T3s,
    Tem,
    ECs,
  },
};
</script>
<style scoped>
@import url("../../../style/screenPage.css");
/* .page{
  height: 88%;
} */
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

.left-item1 {
  height: 36vh;
}

.left {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: 99%;
}

.right {

  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: 99%;

}

.left-item {
  /* margin-top: 2%; */
  width: 100%;
  height: 88%;
  box-sizing: border-box;
  /* margin-bottom: 2%; */
}

.img-h2 {
  height: 4vh;
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
  font-size: 0.4rem;
}

.b-size {
  font-size: 1rem;
}

.text-h2 {
  width: 100%;
  font-size: .9vw;
}

.b-size {
  font-size: .9vw;
}

.wrap {
  display: flex;
  height: 48%;
  width: 100%;
  padding-top: 2%;
}

.wrap-item {
  width: 20%;
  height: 100%;
  text-align: center;
  color: #fff;
}

.button {
  cursor: pointer;
  color: #fff;
  border: 0.06rem solid;
  line-height: 6vh;
  height: 6vh;
  text-align: center;
  width: 90%;
  border-radius: .5rem;
  border-color: rgba(0, 191, 255, .8);
}

.active {
  background-color: rgb(0, 191, 255);
 
}
.page-top {
  width: 100%;
 
  height: 4%;
  background-size: 100% 100%;
  margin-bottom: 0px;
}
.center-top{
  margin-bottom: 0%;
  height: 7.5rem;
}
</style>
