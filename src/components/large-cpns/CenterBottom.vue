<template>
  <div class="wrap border">
    <!-- 图标区域 -->
    <!--<div class="wrap-icons">
      <div class="icon" :class="{ activeImg: this.errArr.temErr }">
        <img src="../assets/images/airtem.png" alt="" style="width: 83%; height: 83%" />
      </div>
      <div class="icon" :class="{ activeImg: this.errArr.humErr }">
        <img src="../assets/images/airhum.png" alt="" style="width: 83%; height: 83%" />
      </div>
      <div class="icon" :class="{ activeImg: this.errArr.co2Err }">
        <img src="../assets/images/co2.png" alt="" style="width: 78%; height: 78%" />
      </div>
      <div class="icon" :class="{ activeImg: this.errArr.illErr }">
        <img src="../assets/images/sunlight.png" alt="" style="width: 80%; height: 80%" />
      </div>
    </div>-->
    <!-- 滚动区域 -->
    <div class="wrap-swiper">
      <div class="swiper-header">
        <p></p>
      </div>
      <div class="swiper-body" style="">
        <vue-seamless-scroll
          :data="listData"
          :class-option="defaultOption"
          class="swiper-items"
        >
          <div v-for="item in listData" :key="item.id" class="swiper-item">
            {{ item }}
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/global.css";
import vueSeamlessScroll from "@/compat/seamless-scroll";
/*
  这个插件会有一个bug，在数据不够时，异步复制一个节点到遍历列表上，因此在删除的时候需要将列表的所有信息都在异步删除
*/
export default {
  data() {
    return {
      listData: [],
      errArr: {
        temErr: false,
        humErr: false,
        co2Err: false,
        illErr: false,
      },
      changeStep: false,
      step: 0.5,
      Time: "",
    };
  },
  created() {
    // 先等一到五秒之后开始接受数据，如果数据存在，那么进行收集，否则使用上一次的数据
    this.initData();
    this.ws = new WebSocket("wss://jxjdiot.top/api/v1/websocket/superAdmin");
    this.receiveMssage();
  },
  mounted() {},
  methods: {
    receiveMssage() {
      let temArr = [];
      this.ws.onmessage = (data) => {
        this.$nextTick(() => {
          temArr.push(data.data + " " + this.getTime());
          this.listData = this.filterArr(temArr).reverse(); //数组去重
          this.judge(data.data);
          this.listData.splice(1, this.listData.length);
          this.changeState();
        });
      };
    },
    initData() {
      this.listData = [`数据正在加载中....  ${this.getTime()}`];
      setTimeout(() => {
        this.listData.splice(0, 1);
      }, 0);

      this.step = 0;
    },
    judge(item) {
      let notScoll = item.slice(9, 12); //截取字符串关键字进行判断
      switch (notScoll) {
        case "HUM":
          this.errArr.humErr = true;
          this.step = 0.5;
          break;
        case "TEM":
          this.errArr.temErr = true;
          this.step = 0.5;
          break;
        case "ILL":
          this.errArr.illErr = true;
          this.step = 0.5;
          break;
        case "CO2":
          this.errArr.co2Err = true;
          this.step = 0.5;
          break;
        default:
          for (let i in this.errArr) {
            this.errArr[i] = false; //给数组里面每一个元素标记位置空
          }
          this.step = 0; //否则停止滚动
      }
    },
    filterArr(Arr) {
      const newSet = new Set(Arr);
      return Array.from(newSet);
    },
    getTime() {
      const Time = new Date();
      let Y = Time.getFullYear();
      let MM = Time.getMonth() + 1;
      let D = Time.getDate();
      let H = Time.getHours();
      let M = Time.getMinutes();
      let S = Time.getSeconds();
      if (H < 10) H = "0" + H;
      if (M < 10) M = "0" + M;
      if (S < 10) S = "0" + S;
      this.Time = `${Y}-${MM}-${D} \t ${H}:${M}:${S}`;
      return H + ":" + M + ":" + S;
    },
    changeState() {
      //当数据变化出现的时候就会触发这个函数
      if (this.step === 0) {
        //如果数据正常
        setTimeout(() => {
          this.listData.splice(0, 1);
        }, 0);
      } else {
        //不正常就存放起来，每一分钟删除一半数组

        setTimeout(() => {
          this.listData.splice(this.listData.length / 2, this.listData.length);
        }, 60000);
      }
    },
  },
  components: {
    vueSeamlessScroll,
  },
  computed: {
    defaultOption() {
      return {
        step: this.step, // 数值越大速度滚动越快
        limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 20000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
};
</script>

<style scoped lang="less">
* {
  justify-content:center;
  margin: -18px;
  box-sizing: border-box;
}

.wrap {
  
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  margin: -220px auto;
  margin-top: 1px;
  box-shadow: 1px 1px 4px rgb(37, 176, 231,0.4) inset;
  padding: 0px;

  .wrap-icons {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    border-right: solid 1px rgba(42, 86, 162, 0.378);
    margin-top: -10px;
    .icon {
      margin: 0 auto;
      width: 40%;
      color: rgba(42, 86, 162, 0.4);
      border-radius: 1.8px;
      border-block-start: 1px solid;
      border: solid 1px;
      display: flex;
      height: 40%;
      align-items: center;
      border-radius: 5px;

      img {
        width: 100%;
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    }
  }

  .wrap-swiper {
    width: 60%;
    box-sizing: border-box;
    margin-top:25px;
    .swiper-header {
      max-width: 100%;
      min-width: 100%;
      justify-content: center;
      height: 15%;
      align-items:center;
      overflow: hidden;

      p {
        font-size: 18px;
        color: rgb(37, 176, 231);
      }
    }

    .swiper-body {
      width: 100%;
      height: 80%;
      overflow: hidden;

      .swiper-items {
        width: 100%;
        text-align: center;
        margin-top: 10px;
        height: 100%;

        .swiper-item {
          list-style: none;
          color: aqua;
          box-sizing: border-box;
          height: 40px;
          padding: 2px;
          font-size: 8px;
          line-height: 5px;
          margin-top: 5px;
        }
      }
    }
  }
}

.activeImg {
  filter: invert(1) hue-rotate(340deg);
}

.activeImg::after {
}
</style>
