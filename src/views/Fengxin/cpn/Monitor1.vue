<template>
  <div style=" height: 100%;  width: 100%;">
    <div style="display: flex; border: 1px solid ; border-color: #ccc; padding-top: 20px; height: 6vh;">
      <div style="font-size: 1vw; text-align: center; padding-left: 2vw; color: white;"> 监控</div>
      <!-- 屏幕宫格切换 -->
      <div style="display: flex; margin-left: 40vw; margin-right: 10vw;">
        <div class="pd-lr20 pointer " @click="screenClick('1')" :class="clickStyle == '1' ? 'white1x1' : 'col1x1'">
          <template v-if="clickStyle == 1">
            <img src="../img/x_1.png" style="height: 3vh; ">
          </template>
          <template v-else>
            <img src="../img/x.png" style="height: 3vh; ">
          </template>
          <div style="font-size: .6vw;text-align: center;">1x1</div>
        </div>
        <div :class="clickStyle == '2' ? 'white2x2' : 'col2x2'" class=" pd-lr20 pointer" @click="screenClick('2')">
          <template v-if="clickStyle == 2">
            <img src="../img/buju-2x2_1.png" style="height: 3vh; ">
          </template>
          <template v-else>
            <img src="../img/buju-2x2.png" style="height: 3vh; ">
          </template>

          <div style="font-size: .6vw; text-align: center;">2x2</div>
        </div>
        <div :class="clickStyle == '3' ? 'white3x3' : 'col3x3'" class="pd-lr20 pointer" @click="screenClick('3')">
          <template v-if="clickStyle == 3">
            <img src="../img/a-3x3_1.png" style="height: 3vh; ">
          </template>
          <template v-else>
            <img src="../img/a-3x3.png" style="height: 3vh; ">
          </template>
          <div style="height: 1vh; font-size: .6vw; text-align: center;">3x3</div>
        </div>
      </div>
      <!-- 视频翻页 -->
      <div style="display: flex; width: 25vw; justify-content: flex-end; align-items: flex-end">
        <div v-for="(value, index) in pagingList " :key=index>
          <div style="border-top: 1px solid; border-left: 1px solid; border-right: 1px solid; border-radius:3px 3px 0 0;
            margin-right: 1rem; border-style:  #555; " :class="paging == index ? 'white black-bg' : 'col-53'"
            v-if="pagingList.length <= '4'" @click="pagingClick(value + 1, index)">
            第{{ value + 1 }}屏
          </div>
          <div style="border-top: 1px solid; border-left: 1px solid; border-right: 1px solid; border-radius:3px 3px 0 0;
            margin-right: 1rem; border-style:  #555; width: 1vw; text-align: center; font-size: .9vw;"
            :class="paging == index ? 'white black-bg' : 'col-53'" v-else @click="pagingClick(value + 1, index)">
            {{ value + 1 }}
          </div>
        </div>
        <div class="border-top border-left border-right bor-sty-qgry5 pd-tb8 pd-lr10 radius_t10 m-t29 m-r15 col-53"
          v-show="indexLists.length > 6 &&
            pagingval != indexLists.length - 1 &&
            pagingval != indexLists.length
            ">
          ...
        </div>
      </div>
    </div>
    <div style="height: 90vh; width: 100vw;">
      <!-- <div style="text-align: center; width: 100%; ">
        <div style="width: 98%; font-size: 1rem;" class="video-grid" :class="clickStyle == '1'
            ? 'video-grid1x1'
            : clickStyle == '2'
              ? 'video-grid2x2'
              : 'video-grid3x3'
          ">

          <div v-for="numIndex in 9" :key="numIndex" style="border: 1px solid; background-color: gray;" v-show="clickStyle == '1'
              ? numIndex < 2
              : clickStyle == '2'
                ? numIndex < 5
                : numIndex <= 9
            ">
            <div :style="{ height: heights + 'px', lineHeight: heights + 'px' }" class="fontColor">
              {{ numIndex }}
            </div>
          </div>
        </div>
      </div> -->
      <div style="width: 100%; height: 100%; margin-top: 2vh; margin-left: 2vw;" class=" t-center video-grid"
        :class="clickStyle == '1'
            ? 'video-grid1x1'
            : clickStyle == '2'
              ? 'video-grid2x2'
              : 'video-grid3x3'
          ">
        <!-- 视频 -->
        <div v-for="(value, index) in cameras" :key=index v-show="clickStyle == '1'
            ? pagingval - 1 == index
            : clickStyle == '2'
              ? index >= (pagingval - 1) * 4 && index < pagingval * 4
              : index >= (pagingval - 1) * 9 && index < pagingval * 9
          ">
          <div :id="'gateCamera' + index"></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import EZUIKit from "ezuikit-js";

export default {
  name: "gateMonitor",
  data() {
    return {
      clickStyle: "3",
      gateId: "",
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
      accessToken:"at.97tp9hsj7l7szakk98wdhgf77awxpm4w-969rqm3su7-0l4tmma-amr5wo9xi"
    };
  },
  //vue的初始化方法，页面一初始化，就去拿参数
  // created() {
  //   this.gateId = sessionStorage.getItem("gateId")
  // },
  mounted() {
    setTimeout(() => {
      this.open();
      }, 1000);

  },
  methods: {
    /**
     * 打开窗口初始化
     */
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
      if (this.clickStyle == "1") {
        this.widths = window.innerWidth - 100;
        this.heights = window.innerHeight - 142;
        if (this.indexs.length > "4") {
          this.pagingList = this.indexs.slice(0, 6); //展示的分页列表
          this.indexLists = this.indexs;
        } else {
          this.pagingList = this.indexs;
        }
      } else if (this.clickStyle == "2") {
        // 四宫格
        this.widths = (window.innerWidth - 100) / 2;
        this.heights = (window.innerHeight - 142) / 2;
        for (let i = 0; i < this.indexs.length / 4; i++) {
          this.pagingIndex.push(i);
          this.indexLists.push(i);
        }
        if (this.pagingIndex.length > "4") {
          this.pagingList = this.pagingIndex.slice(0, 6); //展示的分页列表
        } else {
          this.pagingList = this.pagingIndex;
        }
      } else {
        // 九宫格
        this.widths = (window.innerWidth - 100) / 3;
        this.heights = (window.innerHeight - 142) / 3;
        for (let i = 0; i < this.indexs.length / 9; i++) {
          this.pagingIndex.push(i);
          this.indexLists.push(i);
        }
        if (this.pagingIndex.length > "4") {
          this.pagingList = this.pagingIndex.slice(0, 6); //展示的分页列表
        } else {
          this.pagingList = this.pagingIndex;
        }
      }
      //视频初始化
      this.$nextTick(() => {
        for (let i = 0; i < this.indexs.length; i++) {
          // var _validateCode = '';
          // if(null != cameraInfos[i].validateCode && "" != cameraInfos[i].validateCode){
          //       _validateCode = cameraInfos[i].validateCode + "@";
          //   }
          var _validateCode = cameraInfos[i].validateCode;
          var _channelNumber = cameraInfos[i].channelNumber;
          console.log( _validateCode,_channelNumber);
          
          var list = new EZUIKit.EZUIKitPlayer({
            id: "gateCamera" + i, // 视频容器ID
            width: this.widths,
            height: this.heights,
            accessToken:this.accessToken,
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
            document.getElementById("gateCamera" + i).innerHTML = "";
          }
        }
        this.players = [];
      }
      this.cameras = [];
    },

    // 屏幕宫格切换
    screenClick(num) {
      this.clickStyle = num;
      this.paging = "0";
      this.pagingval = "1";
      this.open();
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
  components: {},
  beforeUnmount() {
    this.clear();
  },
  directives: {},
};
</script>


<style scoped>
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
  grid-template-rows: repeat(3, 1fr);
  /* 三行 */
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