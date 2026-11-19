<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/shanggao.json";
import img1 from "../assets/images/farm-min.webp";
import img2 from "../assets/images/farm2-min.webp";

export default {
  name: "SiteCard_shanggao",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "上高水稻",
        to: "/shanggao",
        mapKey: "shanggao",
        mapData,
        region: "上高县",
        value: 360112,
        texts: [
        "上高水稻，源自中国传统稻种，经过多年科研改良，如今已成为稻米品质的代名词。",
        "其颗粒饱满，米粒透亮，口感细腻，香气浓郁，营养丰富。",
        "上高水稻的优良品质和高产量，让您享受到更加健康、美味的饮食，是您选择稻谷的不二之选。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
