<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },


    //组件创建完后调用
    mounted() {
      // 1.创建scroll创建对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
        observeDOM: true
      })

      //2.监听滚动的位置
     if(this.probeType === 2 || this.probeType === 3) {
       this.scroll.on('scroll', (position) => {
         this.$emit("scroll",position)
       })
     }
      //3.监听上拉加载事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit("pullingUp")
          // setTimeOut(() => {
          //   this.scroll.finishPullUp()
          // },2000)
        })
      }

    },
    methods: {
      scrollTo(x,y,time=300) {
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
        // console.log("---")
      }

    }

  }
</script>

<style scoped>
</style>
