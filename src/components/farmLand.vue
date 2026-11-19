<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/xinjian.json";
import img1 from "../assets/images/farm-min.webp";
import img2 from "../assets/images/farm2-min.webp";

export default {
  name: "SiteCard_farmLand",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "新建试验田",
        to: "/xinjianExp",
        mapKey: "xinjian",
        mapData,
        region: "永新县",
        value: 360112,
        texts: [
        "小种子大收获，2002年以来，江西农业大学水稻育种团队育成水稻品种70多个。",
        "一粒好种子，不光要长在试验田里，更要走向田间地头，装在老百姓的饭碗里。",
        "一代代江农人追逐着光和热，日复一日往返于实验室和田间，辛勤付出结出丰硕果实。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
