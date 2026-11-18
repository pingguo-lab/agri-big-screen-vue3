<template>
  <div class="video-box">
    <div id="video5-container" style="width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import EZUIKit from 'ezuikit-js';

export default {
  name: 'Video5',
  data() {
    return {
      player: null,
      accessToken: '',
      tokenTimer: null,
      
      APP_KEY: 'dccc97b05a624cfe927a1d3b1b17a29a',
      APP_SECRET: '98c5b605dc14da756b5e218ddc4e5b1d',
      deviceSerial: 'FM6472001',
      channelNo: 8,
    };
  },
  async mounted() {
    await this.fetchToken();
    this.initPlayer();
    
    this.tokenTimer = setInterval(async () => {
      await this.fetchToken();
      this.rebuildPlayer();
    }, 4 * 60 * 60 * 1000); 
  },
  beforeUnmount() {
    clearInterval(this.tokenTimer);
    if (this.player) this.player.destroy();
  },
  methods: {
    /* 纯前端获取 Token */
    async fetchToken() {
      try {
        const params = new URLSearchParams({
          appKey: this.APP_KEY,
          appSecret: this.APP_SECRET,
        });
        const { data } = await axios.post(
          'https://open.ys7.com/api/lapp/token/get',
          params,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (data.code === '200') {
          this.accessToken = data.data.accessToken;
          console.log('[Video5] 新 Token:', this.accessToken);
        } else {
          throw new Error(data.msg);
        }
      } catch (e) {
        console.error('[Video5] 获取 Token 失败', e);
      }
    },
    initPlayer() {
      if (!this.accessToken) return;
      if (this.player) this.player.destroy();
      this.player = new EZUIKit.EZUIKitPlayer({
        id: 'video5-container',
        autoplay: true,
        accessToken: this.accessToken,
        url: `ezopen://open.ys7.com/${this.deviceSerial}/${this.channelNo}.hd.live`,
        template: 'standard',
        width: '100%',
        height: '100%',
      });
    },
    rebuildPlayer() {
      this.initPlayer();
    },
  },
};
</script>

<style scoped>
.video-box {
  width: 100%;
  height: 100%;
}
</style>