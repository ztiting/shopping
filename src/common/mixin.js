import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('123')
  }
}


export const backTop = {
  components: {
    BackTop
  },
  data() {
    return {
      isBack: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}
