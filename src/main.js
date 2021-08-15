import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//加载element组件库
import ElementUI from 'element-ui';
//加载element组件库的样式
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import toast from 'components/common/Toast'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false
//事件总线
Vue.prototype.$bus = new Vue()
//全局注册组件库
Vue.use(ElementUI);
Vue.use(toast)

//解决移动端300ms延迟问题(test)
FastClick.attach(document.body)

//使用图片懒加载的图片
Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  loading: require('./assets/img/home/recommend-bg.png')
})
//创建实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
