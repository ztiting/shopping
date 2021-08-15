<template>
  <div id="home">
    <!--导航-->
    <nav-bar class="home-nav">
      <template #center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control" v-show="isFixed">
    </tab-control>
    <!-- 轮播图-->
    <scroll class="content"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            ref="scroll">
      <home-swiper v-if="banners.length > 0"
                   :bannerList="banners"
                   @swiperImageLoad="swiperImageLoad">
      </home-swiper>
      <recommond :recommondList="recommends"></recommond>
      <feature/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   :class="{fixed: isFixed}">
      </tab-control>
      <goods-list :goods="showGoods" ></goods-list>
      <goods-list/>
    </scroll>
    <back-top @click.native="backClick" v-show="isBack"/>
<!--    element ui-->
<!--    <el-carousel :interval="5000" arrow="always">-->
<!--      <el-carousel-item v-for="item in 4" :key="item">-->
<!--        <h3>{{ item }}</h3>-->
<!--      </el-carousel-item>-->
<!--    </el-carousel>-->
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from 'components/content/tabControl/TabControl'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from "./homeCompons/Swiper"
  import Recommond from './homeCompons/Recommond'
  import Feature from './homeCompons/Feature'

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from 'common/utils'

  export default {
    name: 'Home',
    components: {
      NavBar,
      TabControl,
      Scroll,
      GoodsList,
      BackTop,
      HomeSwiper,
      Recommond,
      Feature,

      // Carrousel
    },
    data() {
     return {
       banners: [],
       recommends: [],
       goods: {
         'pop': {page: 0, list: []},
         'new': {page: 0, list: []},
         'sell': {page: 0, list: []}
       },
       currentType: 'pop',
       isBack: false,
       tabOffsetTop: 0,
       isFixed: false,
       //itemImgListener: null
       // saveY: 0,

     }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    // destroyed () {
    // },
    // activated () {
    //   this.$refs.scroll.scrollTo(0, this.saveY,0)
    //   this.$refs.scroll.refresh()
    // },
    // deactivated () {
    // //   this.saveY = this.$refs.scroll.getScrollY()
    //       //2.取消全局事件监听
    // this.$bus.$off("itemImgLoad",this.itemImgListener)
    // },
    created() {
      //1.请求多个数据
      this.getHomeMultiInfo()

      //2.请求商品数据
      this.getGoodsInfo('pop')
      this.getGoodsInfo('new')
      this.getGoodsInfo('sell')
    },

    mounted() {
      //3.监听item图片加载完成
      //防抖动（例如input框搜素，每输入就会向服务器请求，速度太快的，请求也多，对服务器压力很大
      // 比如输入衣服 用拼音 yifu 就会请求四次）   节流  在规定时间内刷新一次
      const refresh = this.debounce(this.$refs.scroll.refresh,500)
      // 对监听的事件进行保存
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on("itemImageLoad",this.itemImgListener)

      // 获取组件的offsetTop

    },
    methods: {
      /**
       * 事件监听相关方法
       */
      //防抖 (放在util.js中，可以共用)
      debounce(func,delay) {
        let timer = null
        return function(...args) {
          if(timer) clearTimeout(timer)

          timer = setTimeout( () => {
            func.apply(this, args)
          },delay)
        }
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        // 1.判断backtop是否显示
        this.isBack = position.y<-1000
        //2.判断tabcontrol是否吸顶（position:fixed）
        this.isFixed = position.y <(-this.tabOffsetTop)
      },
      loadMore() {
        this.getGoodsInfo(this.currentType)
      },
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        //这里这样写是因为在子组件写了方法
        this.$refs.scroll.scrollTo(0,0)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 网络请求相关方法（）
       */
      getHomeMultiInfo(){
        getHomeMultidata().then( res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list

        })
      },
      getGoodsInfo(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then( res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }
  .home-nav {
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;

  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .tab-control {
    /*position: sticky;*/
    position: relative;
    background: #fff;
    z-index: 9
  }
  .content {
    /*height: calc(100%);*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .nav-img{
    width: 100%;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    z-index: 9;
  }
</style>
