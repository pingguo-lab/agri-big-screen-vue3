<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/xinjian.json";
import img1 from "../assets/images/farm-min.webp";
import img2 from "../assets/images/farm2-min.webp";

export default {
  name: "SiteCard_xinjianEcoGarden",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "新建生态园",
        to: "/xinjianEco",
        mapKey: "xinjian",
        mapData,
        region: "永新县",
        value: 360112,
        texts: [
        "这是一处集科研、教学、生态保护于一体的绿色宝地，拥有丰富的植物资源和多样化的生态环境。",
        "在生态园内，你可以感受到大自然的魅力和生命力，欣赏到多种植物的美丽和生长过程。",
        "它展示了人类与自然和谐共处的美好愿景，引领着我们向着更加美好的未来迈进。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
