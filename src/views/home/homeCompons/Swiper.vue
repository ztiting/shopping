<template>
<!--  在swiper外加一层，是为了防止网速的情况下抖动的bug-->
  <div>
    <swiper ref="mySwiper" :options="swiperOptions" >
      <swiper-slide v-for="(item,index) in bannerList" :key="index">
        <a :href="item.link">
          <img :src="item.image" class="nav-img" @load="imgLoad"/>
        </a>
      </swiper-slide>
      <!-- 用于分页-->
      <div class="swiper-pagination" slot="pagination"></div>

    </swiper>
  </div>

</template>

<script>
  export default {
    name: 'HomeSwiper',
    props: {
      bannerList:{
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        swiperOptions: {
          //参数选项，显示小点
          pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          autoplay: 1000,
          speed: 500
        },
        isLoad: false
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(0, 1000, false)
    },
    methods: {
      imgLoad() {
        if(!this.isLoad) {
          this.$emit("swiperImageLoad")
          this.isLoad = true
        }
      }
    }
  }
</script>

<style>
.nav-img {
  width: 100%;
}
</style>
