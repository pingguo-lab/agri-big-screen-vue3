<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/jinggangshan.json";
import img1 from "../assets/images/huangtao-min.webp";
import img2 from "../assets/images/huangtao2-min.webp";

export default {
  name: "SiteCard_jinggangShan",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "井冈山黄桃",
        to: "/jinggang",
        mapKey: "jinggangshan",
        mapData,
        region: "井冈山市",
        value: 360881,
        texts: [
        "四月桃天芳菲，七月硕果累累。井冈山高山黄桃是这片红土地的名优特产。",
        "在这片桃源仙境，充足的日照、优质的水源让井冈黄桃异常香甜可口。",
        "清泉灌溉、有机肥料、物理灭虫，对原生态种植的坚守不容一丝怠慢。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
