module.exports = {
  devServer: {
    proxy: {
      '/app': {
        target: 'http://geek.itheima.net/',
        // target: 'http://localhost:8000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/app': ''
        }
      }
    }
  }
}
