<template>
  <div class="page">
    <div class="page-top">
      <div class="title">监控页面</div>
    </div>

    <div class="content-wrapper">
      <div class="video-grid video-grid3x3">
        
        <!-- ========== 道路监测 ========== -->
        <div class="panel">
          <dv-border-box-10 class="border-box">
            <div class="panel-inner">
              <div class="video-wrapper top-video">
                <FxVideo4 class="video-item"></FxVideo4>
              </div>
              <div class="panel-title">道路监测</div>
              <div class="video-wrapper bottom-video">
                <FxVideo1 class="video-item"></FxVideo1>
              </div>
            </div>
          </dv-border-box-10>
        </div>

        <!-- ========== 果园监测 ========== -->
        <div class="panel">
          <dv-border-box-10 class="border-box">
            <div class="panel-inner">
              <div class="video-wrapper top-video">
                <FxVideo5 class="video-item"></FxVideo5>
              </div>
              <div class="panel-title">果园监测</div>
              <div class="video-wrapper bottom-video">
                <FxVideo2 class="video-item"></FxVideo2>
              </div>
            </div>
          </dv-border-box-10>
        </div>

        <!-- ========== 气象监测 ========== -->
        <div class="panel">
          <dv-border-box-10 class="border-box">
            <div class="panel-inner">
              <div class="video-wrapper top-video">
                <FxVideo6 class="video-item"></FxVideo6>
              </div>
              <div class="panel-title">气象监测</div>
              <div class="video-wrapper bottom-video">
                <FxVideo3 class="video-item"></FxVideo3>
              </div>
            </div>
          </dv-border-box-10>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import EZUIKit from "ezuikit-js";
import FxVideo1 from "../../../components/large-cpns/FengxinVideo1.vue";
import FxVideo2 from "../../../components/large-cpns/FengxinVideo2.vue";
import FxVideo3 from "../../../components/large-cpns/FengxinVideo3.vue";
import FxVideo4 from "../../../components/large-cpns/FengxinVideo4.vue";
import FxVideo5 from "../../../components/large-cpns/FengxinVideo5.vue";
import FxVideo6 from "../../../components/large-cpns/FengxinVideo6.vue";
import axios from "axios";
import { borderBox13, borderBox10 } from "@/compat/data-view";

export default {
  name: "gateMonitor",
  data() {
    return {
      clickStyle: 0,
      stop: 0,
      players: [],
      cameras: [],
      paging: "0",
      pagingval: "1",
      pagingList: [],
      indexs: [],
      indexLists: [],
      pagingIndex: [],
      width: "",
      height: "",
      accessToken: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.open();
    }, 1000);
    
    setInterval(() => {
      if (this.clickStyle < 16) {
        this.clickStyle++;
        this.open();
        this.stop++;
      } else {
        this.clickStyle = 0;
        this.open();
      }
    }, 60000);
  },
  beforeUnmount() {
    this.clear();
  },
  methods: {
    open() {
      this.clear();
      
      var cameraInfos = [
        { validateCode: "C05273977", channelNumber: "2" },
        { validateCode: "C05273977", channelNumber: "4" },
        { validateCode: "C05273977", channelNumber: "6" },
        { validateCode: "G19487212", channelNumber: "1" },
        { validateCode: "G19487212", channelNumber: "2" },
        { validateCode: "G19487212", channelNumber: "3" },
        { validateCode: "G19487212", channelNumber: "4" },
        { validateCode: "G19487212", channelNumber: "5" },
        { validateCode: "G19487212", channelNumber: "6" },
        { validateCode: "G19487212", channelNumber: "7" },
        { validateCode: "G19487212", channelNumber: "8" },
        { validateCode: "G19487212", channelNumber: "10" },
        { validateCode: "G19487212", channelNumber: "11" },
        { validateCode: "G19487212", channelNumber: "13" },
        { validateCode: "G19487212", channelNumber: "14" },
        { validateCode: "G19487212", channelNumber: "15" },
        { validateCode: "G19487212", channelNumber: "16" },
      ];

      this.pagingIndex = [];
      this.indexLists = [];
      this.indexs = [];
      this.widths = "";
      this.heights = "";
      
      if (null == cameraInfos || cameraInfos.length <= 0) return;
      
      for (var i = 0; i < cameraInfos.length; i++) {
        this.cameras.push({
          validateCode: cameraInfos[i].validateCode,
          channelNumber: cameraInfos[i].channelNumber,
        });
        this.indexs.push(i);
      }
      
      this.indexs = this.indexs.slice(this.clickStyle, this.clickStyle + 2);
      
      // 获取实际容器尺寸
      const gridEl = document.querySelector('.video-grid3x3');
      const gridWidth = gridEl ? gridEl.clientWidth : window.innerWidth;
      const gridHeight = gridEl ? gridEl.clientHeight : window.innerHeight;
      
      this.widths = gridWidth / 3;
      this.heights = gridHeight;
      
      for (let i = 0; i < this.indexs.length; i++) {
        this.pagingIndex.push(i);
        this.indexLists.push(i);
      }

      this.$nextTick(() => {
        for (let i = this.clickStyle; i < this.clickStyle + 2; i++) {
          var _validateCode = cameraInfos[i].validateCode;
          var _channelNumber = cameraInfos[i].channelNumber;

          var list = new EZUIKit.EZUIKitPlayer({
            id: "gateCamera" + i,
            width: this.widths,
            height: this.heights,
            accessToken: this.accessToken,
            url: "ezopen://open.ys7.com/" + _validateCode + "/" + _channelNumber + ".hd.live",
            template: "standard",
            autoplay: true,
          });
          list.play();
          this.players.push(list);
        }
      });
    },

    clear() {
      if (null != this.players && this.players.length > 0) {
        console.log("销毁播放器实例");
        for (let i = 0; i < this.players.length; i++) {
          if (null != this.players[i]) {
            this.players[i].stop();
            var dom = document.getElementById("gateCamera" + (this.stop + i));
            if (dom) dom.innerHTML = "";
          }
        }
        this.players = [];
      }
      this.cameras = [];
    },

    pagingClick(val, index) {
      if (this.indexLists.length > 6 && index == "0" && val != 1) {
        this.paging = index + 1;
        this.pagingList = this.indexs.slice(val - 2, val + 4);
      } else if (
        this.indexLists.length > 6 &&
        index == this.pagingList.length - 1 && this.indexs.length != val
      ) {
        this.paging = index - 1;
        this.pagingList = this.indexs.slice(val - 5, val + 1);
      } else {
        this.paging = index;
      }
      this.pagingval = val;
    },
  },
  components: {
    FxVideo1,
    FxVideo2,
    FxVideo3,
    FxVideo4,
    FxVideo5,
    FxVideo6
  },
  directives: {},
};
</script>

<style scoped>
@import url("../../../style/screenPage.css");

/* ========== 页面整体 - 使用 100vw/100vh 占满屏幕 ========== */
.page {
  width: 100vw;
  height: 100vh;
  background: transparent;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ========== 顶部标题 ========== */
.page-top {
  width: 100%;
  height: 4%;
  background-size: 100% 100%;
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
}

/* ========== 内容区域 - 占满剩余空间 ========== */
.content-wrapper {
  width: 100%;
  height: 96%;
  padding: 0;
  box-sizing: border-box;
  flex: 1;
  min-height: 0;
}

/* ========== 3列1行网格布局 - 3个板块均匀铺满 ========== */
.video-grid3x3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;
  gap: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ========== 单个面板 ========== */
.panel {
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  background: transparent;
}

.border-box {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent;
}

/* ========== 面板内部布局 - 上下两个视频+标题 ========== */
.panel-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2%;
  box-sizing: border-box;
  background: transparent;
  min-width: 0;
}

/* ========== 视频区域 - 上下各45% ========== */
.video-wrapper {
  width: 100%;
  height: 45%;
  overflow: hidden;
  min-width: 0;
}
/* 强制隐藏视频组件内部的所有滚动条 */
.video-wrapper ::-webkit-scrollbar {
  display: none;
}

.video-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ========== 标题区域 - 白色文字 ========== */
.panel-title {
  color: #fff;
  height: 10%;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

/* ========== 视频组件 - 占满容器 ========== */
.video-item {
  width: 100%;
  height: 100%;
  display: block;
  min-width: 0;
}

/* ========== 原有样式保留 ========== */
.pd-lr20 {
  padding-left: 2vw;
}

.video-grid1x1 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 1fr);
}

.video-grid2x2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.white1x1 {
  color: white;
}

.col1x1 {
  color: #555;
}

.white2x2 {
  color: white;
}

.col2x2 {
  color: #555;
}

.white3x3 {
  color: white;
}

.col3x3 {
  color: #555;
}

.t-center {
  text-align: center;
}

.white {
  color: white;
}

.font-14 {
  font-size: 1rem;
}

.pointer {
  cursor: pointer;
}

.video-grid {
  margin-left: auto;
  margin-right: auto;
}
</style>