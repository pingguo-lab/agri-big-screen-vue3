<template>
  <div class="home-container">
    <div id="example1" class="header-container">
      <div>
      <div class="project-name">
        <div class="a" style="display: flex;">
          <router-link to="/shanggao">上高水稻</router-link>
        </div>
      </div>
    
    <div class="mapInfo">
      <div class="top">
        <span class="title"></span>
        <div
          class="echartInfo"
          ref="echartInfo"
          style="position: relative;margin-top:2.5rem;width: 7rem;height: 7rem;"
        ></div>
      </div></div>
    </div>
    <div><div class="text" style=" overflow: hidden">
      <swiper :options="swiperOption">
        <swiper-slide>
          <p>
            上高水稻，源自中国传统稻种，经过多年科研改良，如今已成为稻米品质的代名词。
          </p>
        </swiper-slide>
        <swiper-slide>
          <p>
            其颗粒饱满，米粒透亮，口感细腻，香气浓郁，营养丰富。
          </p>
        </swiper-slide>
        <swiper-slide>
          <p>
            上高水稻的优良品质和高产量，让您享受到更加健康、美味的饮食，是您选择稻谷的不二之选。
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
        <img src="../assets/images/farm-min.webp" :class="v1" />
        <img src="../assets/images/farm2-min.webp" :class="v2" />

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
import { swiper} from "@/compat/swiper";
import shanggaoMP from "../assets/js/shanggao.json";
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
            map: "shanggao",
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
                name: "上高县",
                value: 360112,
              },
            ],
          },
        ],
      },
      swiperOption: {
        loop: true, // 开启循环模式
        autoplay: {
          delay:10000, // 切换时间间隔
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
      echarts.init(this.$refs.echartInfo).dispose(); //销毁，这一步是考虑到有时候会动态改变地图data数据，先销毁再初始化
      let myChart = echarts.init(this.$refs.echartInfo); //初始化
      //let myChart = echarts.init(this.$refs.echartInfo);//初始化(ref)

      echarts.registerMap("shanggao", shanggaoMP); //这一步是引用JSON文件，第一个参数需要和上面series.map的名称对应
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
