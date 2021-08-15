<template>
  <div class="detail">
    <detail-nav-bar ref="nav"  class="detail-nav"
                    @titleClick="titleClick" ></detail-nav-bar>
    <scroll class="content2"
            ref="scroll"
            :probe-type = "3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="goods" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart = "addToCart"/>
    <back-top @click.native="backClick" v-show="isBack"/>
<!--    <toast :message="message" :show="show"></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'
  // import Toast from 'components/common/Toast/Toast'

  import {getDetail, Goods, Shop, GoodParam, getRecommend} from 'network/detail'
  import {debounce} from 'common/utils'
  import {itemListenerMixin,backTop} from 'common/mixin'
  import {mapActions} from 'vuex'
  export default {
    name: 'Detail',
    components: {
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll,
      BackTop,
      // Toast
    },
    data() {
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs : [],
        getThemeTopY: null,
        currentIndex: null,
        // cartList: []
        // message: '',
        // show: false
      }
    },
    mixins: [itemListenerMixin,backTop],
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.data.result
        //1.获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //4.获取商品信息
        this.detailInfo = data.detailInfo

        //5.参数信息
        this.paramInfo = new GoodParam(data.itemParams.info, data.itemParams.rule)

        //6.取出评论信息
        if( data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // //第一次值获取不对
        // //原因：this.$refs.params.$el.offsetTop  = undefind $el压根没有渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.goods.$el.offsetTop)
        //
        // this.$nextTick(() => {
        //   //第二次获取值依然不对
        //   //原因： 图片没有计算在内
        //   //根据最新的数据，对应的DOM已经渲染出来了
        //   //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
        //   //offsetTop值不对的时候，都是因为图片加载的问题
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.goods.$el.offsetTop)
        // })
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
        console.log( this.recommends)
      })

    //  4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push((this.$refs.params.$el.offsetTop - 44))
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.goods.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
      })
    },
    mounted () {

    },
    updated () {

    },
    destroyed () {
      this.$bus.$on('itemImgLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopYs.length
        //条件一： 防止赋值过于频繁
        //条件二： 判断区间
        // for(let i = 0; i< length; i++) {
        //   if((this.currentIndex !== i) && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY <
        //     this.themeTopYs[i+1]) || (i === length -1 && positionY> this.themeTopYs[i]))){
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //
        //   }
        // }


        for(let i = 0; i< length; i++) {
          if((this.currentIndex !== i) && (positionY > this.themeTopYs[i] && positionY <
            this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //是否回到顶部
        this.isBack = position.y<-1000
      },
      //添加购物车
      addToCart() {
      //  1.获取添加到购物车的信息
        const product = {}
        product.img = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.realPrice = this.goods.realPrice
        product.iid = this.iid

      //  2.将商品添加到购物车里
      //  mutations中添加方法用commit触发
      //   this.$store.commit("addCart",product)

      //  action中触发方法用dispatch，dispatch可以回调promise
      //   this.$store.dispatch("addCart",product)
      //   this.$store.dispatch("addCart",product).then(res => {
      //     console.log(res)
      //   })

        this.addCart(product).then(res => {
          // this.show = true
          // this.message = res
          //
          // setTimeout( () => {
          //   this.show = false
          //   this.message = ''
          // }, 1500)
          // console.log(this.$toast)
          this.$toast.show(res,1500)
        })
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content2 {
    height: calc(100% - 44px);
  }
</style>
