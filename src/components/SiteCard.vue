<template>
  <div class="home-container">
    <div id="example1" class="header-container">
      <div>
        <div class="project-name">
          <div class="a" style="display: flex">
            <router-link :to="to">{{ title }}</router-link>
          </div>
        </div>
        <div class="mapInfo">
          <div class="top">
            <span class="title"></span>
            <div
              class="echartInfo"
              ref="echartInfo"
              style="position: relative; margin-top: 2.5rem; width: 7rem; height: 7rem"
            ></div>
          </div>
        </div>
      </div>

      <div>
        <div class="text" style="overflow: hidden">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(t, i) in texts" :key="i">
              <p>{{ t }}</p>
            </swiper-slide>
          </swiper>
        </div>
        <div class="pics">
          <div class="article-main" @mouseover="mouseOver()" @mouseleave="mouseLeave()">
            <img :src="images[0]" :class="v1" />
            <img :src="images[1]" :class="v2" />

            <div class="dot-view">
              <div :class="dot1"></div>
              <div :class="dot2"></div>
            </div>
            <div class="arrow-view" v-show="isActive">
              <img src="../assets/images/arrow1.png" class="arrow-left" @click="toLeft()" />
              <img src="../assets/images/arrow2.png" class="arrow-right" @click="toRight()" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 首页基地卡片（12 张卡片共用一个实现）
 *
 * 原来 12 个组件文件几乎一模一样（每个约 200 行），只有 5 处不同：
 *   标题 / 路由 / 地图 GeoJSON / 高亮区域 / 文案与配图
 * 现在全部走 props 配置，改一次全站生效。
 */
import { swiper, swiperSlide } from "@/compat/swiper";

export default {
  name: "SiteCard",
  components: { swiper, swiperSlide },
  props: {
    title: { type: String, default: "" },
    to: { type: String, default: "/" },
    mapKey: { type: String, default: "" },      // registerMap 注册名
    mapData: { type: [Object, String], default: () => ({}) }, // GeoJSON
    region: { type: String, default: "" },      // 要高亮的区域名
    value: { type: [Number, String], default: 0 },
    texts: { type: Array, default: () => [] },
    images: { type: Array, default: () => [] },
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: { delay: 10000, disableOnInteraction: false },
      },
      timer: "",
      isActive: false,
      value2: 1,
      v1: "banner wz3",
      v2: "banner wz2",
      dot1: "dot-1 dot-color-actived",
      dot2: "dot-2 dot-color-normal",
    };
  },
  mounted() {
    this.initChart();
    this.timer = setInterval(this.next, 3000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    initChart() {
      const echarts = this.$echarts;
      if (!echarts || !this.$refs.echartInfo) return;

      // 同一容器重复 init 会告警，先销毁
      const old = echarts.getInstanceByDom(this.$refs.echartInfo);
      if (old) old.dispose();

      const chart = echarts.init(this.$refs.echartInfo);
      echarts.registerMap(this.mapKey, this.mapData);
      chart.setOption({
        series: [
          {
            type: "map",
            map: this.mapKey,
            itemStyle: { emphasis: { areaColor: "rgb(147,235,248)" } },
            label: { show: false },
            data: [{ name: this.region, value: this.value }],
          },
        ],
      });
    },
    next() {
      this.value2++;
      if (this.value2 > 2) this.value2 = 1;
      this.applyClasses();
    },
    toLeft() {
      this.value2--;
      if (this.value2 === 0) this.value2 = 2;
      this.applyClasses();
    },
    toRight() {
      this.value2++;
      if (this.value2 > 2) this.value2 = 1;
      this.applyClasses();
    },
    mouseOver() {
      this.isActive = true;
      clearInterval(this.timer);
    },
    mouseLeave() {
      this.isActive = false;
      this.timer = setInterval(this.next, 3000);
    },
    applyClasses() {
      if (this.value2 === 1) {
        this.v1 = "banner wz3";
        this.v2 = "banner wz2";
        this.dot1 = "dot-1 dot-color-actived";
        this.dot2 = "dot-2 dot-color-normal";
      } else {
        this.v1 = "banner wz2";
        this.v2 = "banner wz3";
        this.dot1 = "dot-1 dot-color-normal";
        this.dot2 = "dot-2 dot-color-actived";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../style/navItem.less");
</style>
