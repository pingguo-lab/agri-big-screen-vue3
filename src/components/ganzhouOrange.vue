<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/ganzhou.json";
import img1 from "../assets/images/muer1.webp";
import img2 from "../assets/images/muer2.webp";

export default {
  name: "SiteCard_ganzhouOrange",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "赣州木耳",
        to: "/ganzhou",
        mapKey: "ganzhou",
        mapData,
        region: "赣州市",
        value: 360700,
        texts: [
        "赣州木耳是江西省赣州市的特色农产品，以肉质肥厚、营养丰富、生态种植为核心特点。",
        "赣州山区森林覆盖率高，空气清新，木耳生长环境天然无污染，保留了更多营养成分。",
        "赣州木耳兼具脆嫩爽滑口感与高食用价值，富含膳食纤维、铁、木耳多糖等。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
