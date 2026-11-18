const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  assetsDir: "large",
  productionSourceMap: false,
  devServer: {
    port: 8080,
    hot: true,
    proxy: {
      "/api": {
        target: "http://121.5.9.113:8090",
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
});
