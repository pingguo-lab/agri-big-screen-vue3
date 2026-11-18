<template>
  <div class="home-container">
    <div id="example1" class="header-container">
      <div>
      <div class="project-name">
        <div class="a" style="display: flex;">
          <router-link to="/Xiaofuchaye">小富茶叶</router-link>
        </div>
      </div>
  
    <div class="mapInfo">
      <div class="top">
        <span class="title"></span>
        <div
          class="echartInfo"
          id="echartInfo11"
          style="position: relative;margin-top:2.5rem;width: 7rem;height: 7rem;"
        ></div>
      </div>
    </div></div>
    <div><div class="text" style=" overflow: hidden">
      <swiper :options="swiperOption">
        <swiper-slide>
          <p>
            每一片茶叶都经过精心的采摘和处理，采摘者细心地选择嫩绿的茶叶，确保茶叶的新鲜度和质量。
          </p>
        </swiper-slide>
        <swiper-slide>
          <p>
            茶叶经过精巧的揉捻和炒制，条索紧细有力，色泽翠绿，白毫显露。散发着清香的气息。
          </p>
        </swiper-slide>
        <swiper-slide>
          <p>
           提神醒脑、利尿消肿、健胃养胃，富含抗氧化物质和营养成分，有助于保持身体健康和抵抗疾病。
          </p>
        </swiper-slide>
      </swiper>
    </div>
    <div class="pics">
      <div
        class="article-main"
        @mouseover="mouseOver()"
        @mouseleave="mouseLeave()"
      >
        <img src="../assets/images/tea-2657300_1920.jpg" :class="v1" />
        <img src="../assets/images/chayebg.jpg" :class="v2" />

        <div class="dot-view">
          <div :class="dot1"></div>
          <div :class="dot2"></div>
        </div>
        <div class="arrow-view" v-show="isActive">
          <img
            src="../assets/images/arrow1.png"
            class="arrow-left"
            @click="toLeft()"
          />
          <img
            src="../assets/images/arrow2.png"
            class="arrow-right"
            @click="toRight()"
          />
        </div>
      </div>
    </div>
    </div>
   </div> 
  </div>
</template>

<script>
import shangraoMP from "../assets/js/shangrao.json";
export default {
  name: "home",
  data() {
    return {
      option: {
        title: {
          text: "",
          subtext: "",
          sublink: "",
        },
    

        series: [
          {
            name: "",
            type: "map",
            map: "shangrao",
            itemStyle: {
              emphasis: {
                areaColor: "rgb(147,235,248)",
              },
            },
            select: {
              itemStyle: {
                areaColor: "rgb(147,300,400)",
              },
            },
            label: {
              show: false,
            },
            data: [
              {
                name: "鄱阳县",
                value: 361127,
              },
            ],
          },
        ],
      },
      swiperOption: {
        pagination: {
          el: ".pagination-home",
          clickable: true, // 配置点击原点可以切换
        },
        loop: true, // 开启循环模式
        autoplay: {
          delay: 10000, // 切换时间间隔
          disableOnInteraction: false, // 当用户滑动文字后继续自动轮播
        },
      },
      timer: "",
      isActive: false,
      value: 1,
      v1: "banner wz3",
      v2: "banner wz2",
      dot1: "dot-1 dot-color-actived",
      dot2: "dot-2 dot-color-normal",
    };
  },

  methods: {
    initEchartInfo() {
      const echarts = this.$echarts; // Vue3：用全局属性，不再 require
      echarts.init(document.getElementById("echartInfo11")).dispose(); //销毁，这一步是考虑到有时候会动态改变地图data数据，先销毁再初始化
      let myChart = echarts.init(document.getElementById("echartInfo11")); //初始化
      //let myChart = echarts.init(this.$refs.echartInfo);//初始化(ref)

      echarts.registerMap("shangrao", shangraoMP); //这一步是引用JSON文件，第一个参数需要和上面series.map的名称对应
      myChart.setOption(this.option); //此处option对象是写在全局data里面，也可以直接写在initEchartInfo()方法里面，如let option = {}。看自己所需
    },
    //图片轮播
    toLeft() {
      this.value--;
      if (this.value == 0) {
        this.value = 2;
      }
      this.changeClasss();
    },
    toRight() {
      this.value++;
      if (this.value > 2) {
        this.value = 1;
      }
      this.changeClasss();
    },
    mouseOver() {
      this.isActive = true;
      clearInterval(this.timer);
    },
    // 移出
    mouseLeave() {
      this.isActive = false;
      this.timer = setInterval(this.get, 3000);
    },
    changeClasss() {
      if (this.value == 1) {
        this.v1 = "banner wz3";
        this.v2 = "banner wz2";

        this.dot1 = "dot-1 dot-color-actived";
        this.dot2 = "dot-2 dot-color-normal";
      }
      if (this.value == 2) {
        this.v1 = "banner wz2";
        this.v2 = "banner wz3";

        this.dot1 = "dot-1 dot-color-normal";
        this.dot2 = "dot-2 dot-color-actived";
      }
    },

    get() {
      this.value++;
      if (this.value > 2) {
        this.value = 1;
      }
      this.changeClasss();
    },
  },
  mounted() {
    this.initEchartInfo(); //执行initEchartInfo方法
    this.timer = setInterval(this.get, 3000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="less" scoped>
@import url("../style/navItem.less");
</style>
