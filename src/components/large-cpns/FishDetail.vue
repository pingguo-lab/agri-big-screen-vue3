<template>
  <div class="main border">
    <div class="header">鱼塘监控({{ fishTitle }})</div>
    <div class="monitor">
      <div class="alldata">
        <ul>
          <li>
            <div class="title">当前鱼塘面积(亩)</div>
            <div class="number1">0.296</div>
          </li>
          <li>
            <div class="title">养殖品种(种)</div>
            <div class="number1">1</div>
          </li>
          <li>
            <div class="title">鱼塘密度(尾/亩)</div>
            <div class="number1">2500</div>
          </li>
          <li>
            <div class="title">智能增氧机(台)</div>
            <div class="number1">2</div>
          </li>
          <li>
            <div class="title">智能投喂机(台)</div>
            <div class="number1">2</div>
          </li>
          <li>
            <div class="title">鱼塘环境监控(台)</div>
            <div class="number1">10</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="progress">
      <div class="line">
        <div class="pro-line">
          <div class="now-pro"></div>
        </div>
      </div>
      <ul class="period">
        <li>育苗期(5月)</li>
        <li>成长期(10月)</li>
        <li>成熟期(12月)</li>
        <li>采收期</li>
      </ul>
    </div>
    <div class="bottom">
      <div class="data">
        <div class="data-box">
          <div class="data-header">
            <div class="header-left">{{ fishTitle }}环境监控</div>
            <div class="header-right">
              <ul>
                <li>
                  <div class="color color1"></div>
                  <span>正常</span>
                </li>
                <li>
                  <div class="color color2"></div>
                  <span>警告</span>
                </li>
                <li>
                  <div class="color color3"></div>
                  <span>危险</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="data-content">
            <dv-scroll-board
              :config="config"
              style="width:28rem;height:20.5rem"
            />
            <!-- <ul>
              <li
                v-for="(item, index) in list.data"
                :key="index"
                :style="datastatu(index, list.data[index].value)"
              >
                <div class="name">
                  {{ item.name }}
                </div>
                <div class="now-data">
                  <div class="number2">
                    {{ item.value }}
                  </div>
                  <div class="unit">
                    {{ item.unit }}
                  </div>
                </div>
              </li>
            </ul> -->
          </div>
        </div>
      </div>
      <div class="chart">
        <FishMap1 :fishTitle="fishTitle"></FishMap1>
        <FishMap2 :fishTitle="fishTitle"></FishMap2>
      </div>
    </div>
  </div>
</template>
<script>
import FishMap1 from "../../components/large-cpns/FishMap1.vue";
import FishMap2 from "../../components/large-cpns/FishMap2.vue";
import { scrollBoard } from "@/compat/data-view";
export default {
  components: {
    FishMap1,
    FishMap2,
  },
  props: {
    fishTitle: {
      type: String,
      default: "鱼塘 - 01",
    },
    config: {
      type: Object,
      default: () => {
        return {
          oddRowBGC: "#a2e9b6",
          evenRowBGC: "#black",
          align: ["center"],
          header: ["列2", "列3"],
          data: [
            ["PM2.5", "33ug/m3"],
            ["PM10", "51ug/m3"],
            ["噪音", "44dB"],
            ["温度", "12℃"],
            ["湿度", "74%RH"],
            ["风速", "m/s"],
            ["风向", "°(度)"],
            ["气压", "KPa"],
          ],
        };
      },
      //       code: 0,
      //       msg: "成功",
      //       data: [
      //         { name: "水PH", value: 6.6, unit: "Mol/L", type: "float" },
      //         {
      //           name: "氨氮",
      //           value: "10%",
      //           unit: "Mg/L",
      //           type: "float",
      //         },
      //         {
      //           name: "PM2.5",
      //           value: 33,
      //           unit: "ug/m3",
      //           type: "float",
      //         },
      //         {
      //           name: "PM10",
      //           value: 51,
      //           unit: "ug/m3",
      //           type: "float",
      //         },
      //         {
      //           name: "噪音",
      //           value: 44,
      //           unit: "dB",
      //           type: "float",
      //         },
      //         {
      //           name: "温度",
      //           value: 12,
      //           unit: "℃",
      //           type: "float",
      //         },
      //         {
      //           name: "湿度",
      //           value: 74,
      //           unit: "%RH",
      //           type: "float",
      //         },
      //         {
      //           name: "风速",
      //           value: 0,
      //           unit: "m/s",
      //           type: "float",
      //         },
      //         {
      //           name: "风向",
      //           value: 0,
      //           unit: "°(度)",
      //           type: "float",
      //         },
      //         {
      //           name: "气压",
      //           value: 95,
      //           unit: "KPa",
      //           type: "float",
      //         },
      //       ],
      //       timestamp: 1700659079,
    },
  },
  methods: {
    datastatu(index, value) {
      switch (index) {
        case 0:
          if (value > 6 && value < 8) {
            return "background-color: #a2e9b6;";
          } else if ((value >= 5 && value <= 6) || (value >= 8 && value <= 9)) {
            return "background-color: #f7b883;";
          } else {
            return "background-color: #e46f64;";
          }
        case 1:
          return "background-color: #f7b883;";

        case 2:
          return "background-color: #a2e9b6;";

        case 3:
          return "background-color: #a2e9b6;";

        case 4:
          return "background-color: #a2e9b6;";

        case 5:
          if (value > 7 && value < 30) {
            return "background-color: #a2e9b6;";
          } else if (4 <= value <= 7 || 35 >= value >= 30) {
            return "background-color: #f7b883;";
          } else {
            return "background-color: #e46f64;";
          }
        case 6:
          return "background-color: #a2e9b6;";

        case 7:
          return "background-color: #a2e9b6;";

        case 8:
          return "background-color: #a2e9b6;";
        case 9:
          return "background-color: #a2e9b6;";
        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
ul {
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
}
li {
  list-style: none;
}
.main {
  width: 49%;
  margin: 0 1% 0 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 98px);
}

.header {
  color: white;
  padding: 5px 0px 5px 10px;
  font-size: 0.5rem;
}

.monitor {
  width: 100%;
  height: 6vh;
  min-height: 40px;
}

.progress {
  width: 98%;
  height: 6vh;
  min-height: 40px;
  margin: 5px 1%;
  border: 2px solid rgba(0, 88, 124, 0.5);
}

.bottom {
  width: 100%;
  height: calc(100% - 26px - 12vh);
  display: flex;
}

.data {
  flex: 1;
  width: 50%;
  height: 98%;
}

.chart {
  flex: 1;
  width: 50%;
  height: 100%;
}

.alldata {
  height: 100%;
}

.alldata ul {
  width: 96%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
}

.alldata ul li {
  list-style: none;
  height: 100%;
  width: 90px;
  background-color: rgba(22, 27, 33, 0.8);
}

.title {
  width: 90%;
  margin: 0.5vh 5% 0 5%;
  font-size: 0.5rem;
  text-align: center;
}

.number1 {
  font-weight: 800;
  text-align: center;
}

.line {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: end;
  justify-content: center;
}

.pro-line {
  position: relative;
  width: 96%;
  height: 6px;
  margin-bottom: 5px;
  border-radius: 3px;
  background-color: #26484f;
}

.now-pro {
  position: absolute;
  top: 0;
  left: 0;
  width: 66%;
  height: 100%;
  background: -webkit-linear-gradient(left, #1b8eee, #22f7d1);
  border-radius: 3px;
}

.period {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: space-between;
}

.period li {
  list-style: none;
  text-align: left;
  height: 100%;
  font-size: 0.6rem;
  font-weight: 600;
  color: white;
  padding: 0px 5px 0px 5px;
}

.data-box {
  margin: 0 auto;
  width: 96%;
  height: 100%;
  border: 2px solid rgba(0, 88, 124, 0.5);
  overflow: hidden;
}

.data-header {
  width: 100%;
  padding: 1vh 0px 1vh 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.header-left {
  margin: 0px 0px 0px 10px;
}

.header-right ul {
  display: flex;
}

.header-right ul li {
  display: flex;
  list-style: none;
  align-items: center;
  margin: 0px 5px;
}

.color {
  width: 10px;
  height: 10px;
  margin: 0px 5px;
}

.color1 {
  background-color: #a2e9b6;
}

.color2 {
  background-color: #f7b883;
}

.color3 {
  background-color: #e46f64;
}

.data-content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.data-content ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.data-content ul li {
  list-style: none;
  width: 46%;
  height: 14%;
  margin: 3% 2%;
}

.name {
  font-size: 0.5rem;
  margin: 0.5vh 0;
  text-align: center;
}

.now-data {
  display: flex;
  justify-content: center;
}

.number2 {
  font-size: 1.5rem;
  font-weight: 600;
}

.unit {
  display: flex;
  align-items: end;
}
</style>
