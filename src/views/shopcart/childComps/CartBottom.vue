<template>
  <div class="bottom-bar">
    <div class="left">
      <CheckButton :is-checked="isSelectAll"></CheckButton>
      <span class="item" @click="checkClick">全选</span>

    </div>
    <span class="center">合计: {{totalPrice}}</span>
    <div class="right" @click = "calcClick">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import {mapGetters} from 'vuex'
  export default {
    name: 'CartBottom',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥'+this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.realPrice * item.count
        },0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count
        },0)
      },
      isSelectAll() {
        // return !this.$store.state.cartList.filter(item => item.checked).length
        if(this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.isSelectAll) {
          this.$toast.show("请选择购买的商品",2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    border-color: #d81e06;
    position: relative;
    display: flex;
    justify-content:space-between;
    padding:0 10px
  }
  .left {
    flex: 1;
    display: flex;
  }

  .right {
    flex: 1;
    text-align: right;
  }
  .center {
    flex: 2
  }
</style>
