<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/shangrao.json";
import img1 from "../assets/images/fish-min.png";
import img2 from "../assets/images/fish1.png";

export default {
  name: "SiteCard_yuganAqua",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "余干水产局",
        to: "/yuganAqua",
        mapKey: "shangrao",
        mapData,
        region: "余干县",
        value: 361127,
        texts: [
        "品味海洋的鲜美，尽在水产局",
        "新鲜海鲜，源自大海的馈赠，水产局为您带来美味与健康",
        "品质保证，海洋鲜味尽在水产局",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
