<template>
  <div class="home-container">
    <div id="example1" class="header-container">
      <div>
      <div class="project-name">
        <div class="a" style="display: flex;"><router-link to="/ganzhou">赣州木耳</router-link></div>
      </div>
    <div class="mapInfo">
      <div class="top">
        <span class="title"></span>
        <div
          class="echartInfo"
          id="echartInfo5"
          style="position: relative;margin-top:2.5rem;width: 7rem;height: 7rem;"
        ></div>
      </div>
    </div></div>
    <div>
    <div class="text" style=" overflow: hidden">
      <swiper :options="swiperOption">
        <swiper-slide>
          <!-- <p>
            赣南脐橙，是江西省赣州市特产，中国国家地理标志产品。赣南脐橙年产量达百万吨。
          </p> -->
          <p>
            赣州木耳是江西省赣州市的特色农产品，以肉质肥厚、营养丰富、生态种植为核心特点。
          </p>
        </swiper-slide>
        <swiper-slide>
          <!-- <p>世界第一，年产量世界第三、全国最大的脐橙主产区。</p> -->
           <p>
            赣州山区森林覆盖率高，空气清新，木耳生长环境天然无污染，保留了更多营养成分。
           </p>
        </swiper-slide>
        <swiper-slide>
          <!-- <p>
            赣南脐橙果大形正，橙红鲜艳，光洁美观，可食率达85%，肉质脆嫩、化渣，风味浓甜芳香。
          </p> -->
            <p>
              赣州木耳兼具脆嫩爽滑口感与高食用价值，富含膳食纤维、铁、木耳多糖等。
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
        <!-- <img src="../assets/images/orange-min.webp" alt="v1">
             <img src="../assets/images/orange2-min.webp" alt="v2">
        
        -->

        <img src="../assets/images/muer1.webp" :class="v1" />
        <img src="../assets/images/muer2.webp" :class="v2" />
    

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
  </div></div> </div>
</template>

<script>
import { swiper, } from "@/compat/swiper";
import ganzhouMP from "../assets/js/ganzhou.json";
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
        // tooltip: {
        //   trigger: "item",
        //   formatter: "{b}<br/>{c}",
        // },

        series: [
          {
            name: "",
            type: "map",
            map: "ganzhou",
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
                name: "赣州市",
                value: 360700,
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
      echarts.init(document.getElementById("echartInfo5")).dispose(); //销毁，这一步是考虑到有时候会动态改变地图data数据，先销毁再初始化
      let myChart = echarts.init(document.getElementById("echartInfo5")); //初始化
      //let myChart = echarts.init(this.$refs.echartInfo);//初始化(ref)

      echarts.registerMap("ganzhou", ganzhouMP); //这一步是引用JSON文件，第一个参数需要和上面series.map的名称对应
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
