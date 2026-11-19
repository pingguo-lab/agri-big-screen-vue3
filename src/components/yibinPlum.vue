<template>
  <SiteCard v-bind="config" />
</template>

<script>
import SiteCard from "./SiteCard.vue";
import mapData from "../assets/js/yibin.json";
import img1 from "../assets/images/lizi-min.webp";
import img2 from "../assets/images/lizi3-min.webp";

export default {
  name: "SiteCard_yibinPlum",
  components: { SiteCard },
  data() {
    return {
      config: {
        title: "宜宾红脆李",
        to: "/pingshan",
        mapKey: "yibin",
        mapData,
        region: "宜宾市",
        value: 511500,
        texts: [
        "红脆李是四川宜宾特产。新鲜李肉中的丝氨酸、甘氨酸、脯氨酸、谷酰胺等氨基酸，有利尿消肿的作用.",
        "李子中还含有多种营养成分，有养颜美容、润滑肌肤的作用。",
        "李子中抗氧化剂含量高的惊人，堪称是抗衰老、防疾病的“超级水果”。",
        ],
        images: [img1, img2],
      },
    };
  },
};
</script>
