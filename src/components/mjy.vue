<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/shangrao.json";
import img1 from "../assets/images/mjy1.webp";
import img2 from "../assets/images/mjy2.webp";

export default {
  name: "SiteCard_mjy",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "上饶马家柚",
        to: "/mjy",
        mapKey: "shangrao",
        mapData,
        region: "鄱阳县",
        value: 361127,
        texts: [
        "饶之瑰宝马家柚，柚香四溢韵上饶。甘润琼浆藏果肉，福泽安康万家尝。",
        "品上饶马家柚，享甜蜜好生活。汁多肉厚味清甜，柚香萦绕情更绵。",
        "柚惑难挡，上饶马家柚，每一口都是自然的馈赠，每一颗都是甜蜜的宝藏。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
