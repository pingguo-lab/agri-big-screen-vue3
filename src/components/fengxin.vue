<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/shanggao.json";
import img1 from "../assets/images/mht.webp";
import img2 from "../assets/images/mht1.webp";

export default {
  name: "SiteCard_fengxin",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "奉新猕猴桃",
        to: "/fengNav",
        mapKey: "fengxin",
        mapData,
        region: "奉新县",
        value: 360112,
        texts: [
        "奉新猕猴桃是一种优质的果蔬，产自江西省奉新县。",
        "奉新猕猴桃富含维生素C、维生素E、维生素K、钾、钙、镁等多种营养成分。",
        "现在，奉新猕猴桃已经成为江西省的重要特色农产品，远销国内外市场，备受消费者和市场的青睐。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
