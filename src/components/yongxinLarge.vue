<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/yongxin.json";
import img1 from "../assets/images/chaye.webp";
import img2 from "../assets/images/chatian-min.webp";

export default {
  name: "SiteCard_yongxinLarge",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "永新茶叶",
        to: "/yongxin",
        mapKey: "yongxin",
        mapData,
        region: "永新县",
        value: 360830,
        texts: [
        "在永新，有一座崖石山，海拔近千米,土地肥沃,林密叶茂，具有得天独厚的茶树生长条件。",
        "崖雾茶采摘精细，制作精巧、条索紧细、园直，白毫显露，以色翠芽壮，形美味醇香高耐冲泡而著称。",
        "具有提神、利尿、健胃、抗癌等十大功能，令人饮后心旷神怡，被广大用户誉为江西后起之秀。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
