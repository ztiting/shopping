<template>
  <div>
    <!-- 导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottom from './childComps/CartBottom'
  import {mapGetters} from 'vuex'
export default {
  name: 'Shopcart',
  components: {
    NavBar,
    CartList,
    CartBottom
  },
  computed: {
    //两种语法
    //1.名字相同的时候
    ...mapGetters([
      'cartLength',
      'cartList'
    ])
  //  2.想重新命名的时候
  //   ...mapGetters({
  //     length: 'cartLength',
  //     list: 'cartList'
  //   })
  }
}
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
