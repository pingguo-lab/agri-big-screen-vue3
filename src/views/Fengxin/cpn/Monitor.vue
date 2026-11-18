<template>
  <div style=" height: 100%;  width: 100%;">
    <div class="page-top" style="height: 4%; margin-bottom: 0%;">
      <div class="title">监控页面</div>
    </div>
    <div style="height: 90vh; width: 100vw;">
      <div style="width: 100%; height: 100%; margin-top: 2vh; margin-left: 2vw;" class=" t-center video-grid video-grid3x3">
        <div style="height: 90vh;">
          <dv-border-box-10 style="width: 95%; height: 88vh; overflow: hidden; ">
            <div
              style="display: flex; justify-content: space-around;flex-wrap: wrap; align-items: center; width: 100%; height:90vh;"> 
              <div style="width: 100%; margin-top: 3vh; margin-left: 1%;  height:40vh ;position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                    <FxVideo4 style="  height:35vh;width: 99%;  margin-bottom: 5%; margin-left: 1%;">
                    </FxVideo4>
                </div>
              </div>
              <div style="color: #fff;">道路监测</div>
              <div style="width: 100%; margin-bottom: 3vh; margin-left: 1%;  height:40vh ;position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                    <FxVideo1 style="  height:35vh;width: 99%;  margin-bottom: 5%; margin-left: 1%;">
                    </FxVideo1>
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
        <div style="height: 90vh;">
          <dv-border-box-10 style="width: 95%; height: 88vh">
            <div
              style="display: flex; justify-content: space-around;flex-wrap: wrap; align-items: center; width: 100%; height:90vh;">
              
              <div style="width: 100%; margin-top: 3vh; margin-left: 1%;  height:40vh ;position: relative;">
                
                
                <div style="width:100%;height:100%;overflow:hidden;">
                    <FxVideo5 style="  height:35vh;width: 99%;  margin-bottom: 5%; margin-left: 1%;">
                    </FxVideo5>
                </div>

              </div>
              <div style="color: #fff;">果园监测</div>
              <div style="width: 100%; margin-bottom: 3vh; margin-left: 1%;  height:40vh ;position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                   <FxVideo2 style="  height:35vh;width: 99%;  margin-bottom: 5%; margin-left: 1%;">
                    </FxVideo2>
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>
        <div style="height: 90vh;">
          <dv-border-box-10 style="width: 95%; height: 88vh">
            <div
              style="display: flex; justify-content: space-around;flex-wrap: wrap; align-items: center; width: 100%; height:90vh; ">
              
              <div style="width: 100%; margin-top: 3vh; margin-left: 1%;  height:40vh ;position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                    <FxVideo6 style="  height:35vh;width: 99%;  margin-bottom: 5%; margin-left: 1%;">
                    </FxVideo6>
                </div>
              </div>
              <div style="color: #fff;height: 5vh">气象监测</div>
              <div style="width: 100%; margin-bottom: 3vh; margin-left: 1%;  height:40vh ;position: relative;">
                
                <FxVideo3 style="  height:35vh;width: 99%;  margin-bottom: 5%; margin-left: 1%;">
                    </FxVideo3>

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
      paging: "0", //当前页数下标
      pagingval: "1", //当前页数
      pagingList: [], //显示的分页列表
      indexs: [], //所有的分页列表
      indexLists: [], //宫格页码列表
      pagingIndex: [],
      width: "",
      height: "",
      accessToken: ""
    };
  },
  mounted() {
    //this.getVideo(),
      setTimeout(() => {
        this.open();
      }, 1000);
    setInterval(() => {
      if (this.clickStyle < 16) { this.clickStyle++; this.open(); this.stop++ }
      else {
        this.clickStyle = 0;
        this.open();
      }
      // console.log(this.clickStyle,98998899);

    }, 60000)
  },
  methods: {
    // getVideo() {
    //   axios({
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //     method: "post",
    //     // url: "https://open.ys7.com/api/lapp/token/get?appKey=10a4eeedd6e447fcb4640711df627c0f&appSecret=01354834fe219f5465a3ab5ff1d80aae",
    //     url:
    //       "https://open.ys7.com/api/lapp/token/get?appKey=dccc97b05a624cfe927a1d3b1b17a29a&appSecret=98c5b605dc14da756b5e218ddc4e5b1d",
    //     /*data: {
    //       appKey:'10a4eeedd6e447fcb4640711df627c0f',
    //       appSecret:'01354834fe219f5465a3ab5ff1d80aae'
    //     }*/
    //   }).then((res) => {
    //     this.accessToken = res.data.data.accessToken;
    //   })
    // },
    open() {
      this.clear();
      // this.$showload();
      var cameraInfos = [
        {
          validateCode: "C05273977",
          channelNumber: "2",
        },
        {
          validateCode: "C05273977",
          channelNumber: "4",
        },
        {
          validateCode: "C05273977",
          channelNumber: "6",
        },
        {
          validateCode: "G19487212",
          channelNumber: "1",
        },
        {
          validateCode: "G19487212",
          channelNumber: "2",
        },
        {
          validateCode: "G19487212",
          channelNumber: "3",
        },
        {
          validateCode: "G19487212",
          channelNumber: "4",
        },
        {
          validateCode: "G19487212",
          channelNumber: "5",
        },
        {
          validateCode: "G19487212",
          channelNumber: "6",
        },
        {
          validateCode: "G19487212",
          channelNumber: "7",
        },
        {
          validateCode: "G19487212",
          channelNumber: "8",
        },
        {
          validateCode: "G19487212",
          channelNumber: "10",
        },
        {
          validateCode: "G19487212",
          channelNumber: "11",
        },
        {
          validateCode: "G19487212",
          channelNumber: "13",
        },
        {
          validateCode: "G19487212",
          channelNumber: "14",
        },
        {
          validateCode: "G19487212",
          channelNumber: "15",
        },
        {
          validateCode: "G19487212",
          channelNumber: "16",
        },
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
      this.indexs = this.indexs.slice(this.clickStyle, this.clickStyle + 2)
      this.widths = (window.innerWidth -30) / 3;
      this.heights = (window.innerHeight+60 ) / 3;
      for (let i = 0; i < this.indexs.length; i++) {
        this.pagingIndex.push(i);
        this.indexLists.push(i);
      }


      //视频初始化
      this.$nextTick(() => {
        for (let i = this.clickStyle; i < this.clickStyle + 2; i++) {

          var _validateCode = cameraInfos[i].validateCode;
          var _channelNumber = cameraInfos[i].channelNumber;
          // console.log( _validateCode,_channelNumber);

          var list = new EZUIKit.EZUIKitPlayer({
            id: "gateCamera" + i, // 视频容器ID
            width: this.widths,
            height: this.heights,
            accessToken: this.accessToken,
            url:
              "ezopen://" +
              "open.ys7.com/" +
              _validateCode +
              "/" +
              _channelNumber +
              ".hd.live",
            template: "standard",
            autoplay: true,
            // audio: false,
            // handleError: (err) => {
            //   if (err.type === "handleRunTimeInfoError" && err.data.nErrorCode === 5) {
            //     // 加密设备密码错误
            //   }
            // }
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
            document.getElementById("gateCamera" + (this.stop + i)).innerHTML = "";

          }
        }
        this.players = [];
      }
      this.cameras = [];
    },


    // 翻页
    pagingClick(val, index) {
      // 页数
      // index 当前页数下标
      // this.pagingList.length 显示的分页列表数
      // this.indexs.length 所有的分页总数
      if (this.indexLists.length > 6 && index == "0" && val != 1) {
        this.paging = index + 1;
        this.pagingList = this.indexs.slice(val - 2, val + 4); //展示的分页列表
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
  computed: {},
  props: {},
  components: {
    FxVideo1,
    FxVideo2,
    FxVideo3,
    FxVideo4,
    FxVideo5,
    FxVideo6
  },
  beforeUnmount() {
    this.clear();
  },
  directives: {},
};
</script>


<style scoped>
@import url("../../../style/screenPage.css");

.pd-lr20 {
  padding-left: 2vw;
}

.video-grid1x1 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  /* 一列 */
  grid-template-rows: repeat(1, 1fr);
  /* 一行 */
}

.video-grid2x2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* 两列 */
  grid-template-rows: repeat(2, 1fr);
  /* 两行 */
}

.video-grid3x3 {
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  /* 三列 */
  grid-template-rows: repeat(2, 1fr);
  /* 两行 */
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

/* .black-bg {
  background-color: black;
} */

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
  text-align: bottom;
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
<!-- <template>
  
  <div style="height: 100%; width: 100%; display: flex; flex-direction: column; overflow: hidden;">
    
    <div class="page-top" style="height: 6%; display: flex; align-items: center; justify-content: center;">
      <div class="title">监控页面</div>
    </div>

    
    <div style="flex: 1; width: 100%; overflow: hidden;">
      <div style="width: 100%; height: 100%;" class="t-center video-grid video-grid3x3">
        
        
        <div style="height: 100%;">
          <dv-border-box-10 style="width: 95%; height: 100%; overflow: hidden;">
            <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; width: 100%; height: 100%; padding: 2%;">
              <div style="width: 100%; height: 48%; position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                  <FxVideo4 style="height:100%;width:100%;"></FxVideo4>
                </div>
              </div>
              <div style="color: #fff; height: 5%; display: flex; align-items: center;">道路监测</div>
              <div style="width: 100%; height: 48%; position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                  <FxVideo1 style="height:100%;width:100%;"></FxVideo1>
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>

        <div style="height: 100%;">
          <dv-border-box-10 style="width: 95%; height: 100%; overflow: hidden;">
            <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; width: 100%; height: 100%; padding: 2%;">
              <div style="width: 100%; height: 48%; position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                  <FxVideo5 style="height:100%;width:100%;"></FxVideo5>
                </div>
              </div>
              <div style="color: #fff; height: 5%; display: flex; align-items: center;">果园监测</div>
              <div style="width: 100%; height: 48%; position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                  <FxVideo2 style="height:100%;width:100%;"></FxVideo2>
                </div>
              </div>
            </div>
          </dv-border-box-10>
        </div>

        <div style="height: 100%;">
          <dv-border-box-10 style="width: 95%; height: 100%; overflow: hidden;">
            <div style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; width: 100%; height: 100%; padding: 2%;">
              <div style="width: 100%; height: 48%; position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                  <FxVideo6 style="height:100%;width:100%;"></FxVideo6>
                </div>
              </div>
              <div style="color: #fff; height: 5%; display: flex; align-items: center;">气象监测</div>
              <div style="width: 100%; height: 48%; position: relative;">
                <div style="width:100%;height:100%;overflow:hidden;">
                  <FxVideo3 style="height:100%;width:100%;"></FxVideo3>
                </div>
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
      accessToken: ""
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
      this.width = "";
      this.height = "";

      if (!cameraInfos || cameraInfos.length <= 0) return;

      for (var i = 0; i < cameraInfos.length; i++) {
        this.cameras.push({
          validateCode: cameraInfos[i].validateCode,
          channelNumber: cameraInfos[i].channelNumber,
        });
        this.indexs.push(i);
      }

      this.indexs = this.indexs.slice(this.clickStyle, this.clickStyle + 2);
      this.width = (window.innerWidth - 30) / 3;
      this.height = (window.innerHeight + 60) / 3;

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
            width: this.width,
            height: this.height,
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
      if (this.players && this.players.length > 0) {
        for (let i = 0; i < this.players.length; i++) {
          if (this.players[i]) {
            this.players[i].stop();
            const dom = document.getElementById("gateCamera" + (this.stop + i));
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
      } else if (this.indexLists.length > 6 && index == this.pagingList.length - 1 && this.indexs.length != val) {
        this.paging = index - 1;
        this.pagingList = this.indexs.slice(val - 5, val + 1);
      } else {
        this.paging = index;
      }
      this.pagingval = val;
    },
  },
  components: {
    FxVideo1, FxVideo2, FxVideo3, FxVideo4, FxVideo5, FxVideo6
  },
  beforeUnmount() {
    this.clear();
  },
};
</script>

<style scoped>
@import url("../../../style/screenPage.css");

.video-grid3x3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  height: 100%;
}

.t-center {
  text-align: center;
}

.white {
  color: white;
}

.video-grid {
  margin-left: auto;
  margin-right: auto;
}
</style> -->
