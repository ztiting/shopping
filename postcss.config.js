module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,// 视窗的宽度，对应的是设计稿的宽度
      viewportHeight: 750,//视窗的高度，对应的是设计稿的高度
      unitPrecision: 5, //指定px转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw',//指定需要转换的视窗单位，建议使用vw
      selectorBlackList: ['ignore','tab-bar','tab_bar_item'],//指定不需要转换的类(不需要转化的class)
      //每次添加不需要转化的类比较麻烦，可以在不需要转化的class再添加一个类名 ignore
      minPixelValue: 1,   //小于或等于1px不转换为视窗单位
      mediaQuery: false,  //允许在媒体查询中转换'px'
      exclude: [/^Tarbar/]
    }
  }
}
