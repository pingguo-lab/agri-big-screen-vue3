<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/shangrao.json";
import img1 from "../assets/images/fish3.webp";
import img2 from "../assets/images/fish4.webp";

export default {
  name: "SiteCard_yuganFish",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "余干鱼塘",
        to: "/yuganFish",
        mapKey: "shangrao",
        mapData,
        region: "余干县",
        value: 361127,
        texts: [
        "余干是一个渔民的天堂。您可以亲自感受捕鱼的乐趣，投入湖水中的渔网，期待着丰收的喜悦。",
        "无论是漫步湖畔，欣赏水鸟的翩翩起舞，还是坐在湖边的凉亭中，余干鱼塘都能给您带来难忘的体验。",
        "在渔民们悉心照料下，这些鱼类生长茁壮，肉质鲜美。每一道菜肴都散发着鲜香诱人的味道，让您流连忘返。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
