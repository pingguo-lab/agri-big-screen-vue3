<template>
  <div class="fx-video-box" ref="videoBox">
    <div id="FxVideo6-container" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import EZUIKit from 'ezuikit-js';

export default {
  name: 'FxVideo6',
  data() {
    return {
      player: null,
      accessToken: '',
      tokenTimer: null,
      resizeTimer: null,
      APP_KEY: 'dccc97b05a624cfe927a1d3b1b17a29a',
      APP_SECRET: '98c5b605dc14da756b5e218ddc4e5b1d',
      deviceSerial: 'FM6472001',
      channelNo: '11', // 第一行第三个
    };
  },
  async mounted() {
    await this.fetchToken();
    this.$nextTick(() => {
      this.initPlayer();
    });
    
    // 监听窗口变化
    window.addEventListener('resize', this.handleResize);
    
    // 每 4 小时刷新 token
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
          console.log('[FxVideo6] 新 Token:', this.accessToken);
        } else {
          throw new Error(data.msg);
        }
      } catch (e) {
        console.error('[FxVideo6] 获取 Token 失败', e);
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
      console.log('[FxVideo6] 容器尺寸:', width, height);
      
      this.player = new EZUIKit.EZUIKitPlayer({
        id: 'FxVideo6-container',
        autoplay: true,
        accessToken: this.accessToken,
        url: `ezopen://open.ys7.com/${this.deviceSerial}/${this.channelNo}.hd.live`,
        template: 'standard',
        width: width,        // 实际像素宽度
        height: height,      // 实际像素高度
      });
    },
    
    handleResize() {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.rebuildPlayer();
      }, 500);
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
</style>