<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/shangrao.json";
import img1 from "../assets/images/tea-2657300_1920.jpg";
import img2 from "../assets/images/chayebg.jpg";

export default {
  name: "SiteCard_xiaofuchaye",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "小富茶叶",
        to: "/xiaofuchaye",
        mapKey: "shangrao",
        mapData,
        region: "鄱阳县",
        value: 361127,
        texts: [
        "每一片茶叶都经过精心的采摘和处理，采摘者细心地选择嫩绿的茶叶，确保茶叶的新鲜度和质量。",
        "茶叶经过精巧的揉捻和炒制，条索紧细有力，色泽翠绿，白毫显露。散发着清香的气息。",
        "提神醒脑、利尿消肿、健胃养胃，富含抗氧化物质和营养成分，有助于保持身体健康和抵抗疾病。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
