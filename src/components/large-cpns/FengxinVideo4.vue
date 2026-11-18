<template>
  <div class="fx-video-box" ref="videoBox">
    <div id="FxVideo4-container" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import EZUIKit from 'ezuikit-js';

export default {
  name: 'FxVideo4',
  data() {
    return {
      player: null,
      accessToken: '',
      tokenTimer: null,
      APP_KEY: 'dccc97b05a624cfe927a1d3b1b17a29a',
      APP_SECRET: '98c5b605dc14da756b5e218ddc4e5b1d',
      deviceSerial: 'FM6472001',
      channelNo: '4',
      resizeTimer: null,
    };
  },
  async mounted() {
    await this.fetchToken();
    this.$nextTick(() => {
      this.initPlayer();
    });
    
    window.addEventListener('resize', this.handleResize);
    
    this.tokenTimer = setInterval(async () => {
      await this.fetchToken();
      this.rebuildPlayer();
    }, 4 * 60 * 60 * 1000);
  },
  beforeUnmount() {
    clearInterval(this.tokenTimer);
    clearTimeout(this.resizeTimer);
    window.removeEventListener('resize', this.handleResize);
    if (this.player) this.player.destroy();
  },
  methods: {
    async fetchToken() {
      try {
        const params = new URLSearchParams({ appKey: this.APP_KEY, appSecret: this.APP_SECRET });
        const { data } = await axios.post(
          'https://open.ys7.com/api/lapp/token/get',
          params,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (data.code === '200') {
          this.accessToken = data.data.accessToken;
          console.log('[FxVideo4] 新 Token:', this.accessToken);
        } else {
          throw new Error(data.msg);
        }
      } catch (e) {
        console.error('[FxVideo4] 获取 Token 失败', e);
      }
    },
    
    getContainerSize() {
      const box = this.$refs.videoBox;
      if (!box) return { width: 525, height: 315 };
      return {
        width: box.clientWidth,
        height: box.clientHeight
      };
    },
    
    initPlayer() {
      if (!this.accessToken) return;
      if (this.player) this.player.destroy();
      
      const { width, height } = this.getContainerSize();
      
      // 取整，避免小数像素导致滚动条
      const intWidth = Math.floor(width);
      const intHeight = Math.floor(height);
      
      console.log('[FxVideo4] 容器尺寸:', intWidth, intHeight);
      
      this.player = new EZUIKit.EZUIKitPlayer({
        id: 'FxVideo4-container',
        autoplay: true,
        accessToken: this.accessToken,
        url: `ezopen://open.ys7.com/${this.deviceSerial}/${this.channelNo}.hd.live`,
        template: 'standard',
        width: intWidth,
        height: intHeight,
      });
    },
    
    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.rebuildPlayer();
      }, 800);
    },
    
    rebuildPlayer() {
      this.initPlayer();
    },
  },
};
</script>

<style scoped>
.fx-video-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 强制隐藏播放器内部滚动条 */
#FxVideo4-container {
  overflow: hidden !important;
}

#FxVideo4-container ::-webkit-scrollbar {
  display: none;
}

#FxVideo4-container {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>