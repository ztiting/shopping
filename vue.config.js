module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'network': '@/network',
        'common': '@/common',
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views'
      }
    }
  }
}
