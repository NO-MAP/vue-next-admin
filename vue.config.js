module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: "http://10.180.198.101:8010",
        changeOrigin: true,
      }
    }
  }
}