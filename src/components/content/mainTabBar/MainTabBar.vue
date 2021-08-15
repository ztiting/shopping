<template>
 <div>
   <tab-bar>
     <!-- 父传子   link  activeColor-->
     <tab-bar-item link = "/home" activeColor = "blue">
       <template v-slot:item_icon>
         <img  src="~assets/img/tabbar/home.png" class="set_img"/>
       </template>
       <template #item_icon_active>
         <img src="~assets/img/tabbar/home_active.png" class="set_img"/>
       </template>
       <template #item_text>
         <p>首页</p>
       </template>
     </tab-bar-item>
     <tab-bar-item link = "/category">
       <template v-slot:item_icon>
          <img slot="item_icon" src="~assets/img/tabbar/category.png" class="set_img"/>
       </template>
       <template #item_icon_active>
          <img slot="item_icon_active" src="~assets/img/tabbar/category_active.png" class="set_img"/>
       </template>
       <template #item_text>
          <p slot="item_text">分类</p>
       </template>
     </tab-bar-item>
     <tab-bar-item link = "/shopcart">
       <template v-slot:item_icon>
          <img slot="item_icon" src="~assets/img/tabbar/shopcart.png" class="set_img"/>
       </template>
       <template #item_icon_active>
          <img slot="item_icon_active" src="~assets/img/tabbar/shopcart_active.png" class="set_img"/>
       </template>
       <template #item_text>
           <p slot="item_text">购物车</p>
       </template>
     </tab-bar-item>
     <tab-bar-item link = "/profile">
       <template v-slot:item_icon>
           <img slot="item_icon" src="~assets/img/tabbar/profile.png" class="set_img"/>
       </template>
       <template #item_icon_active>
          <img slot="item_icon_active" src="~assets/img/tabbar/profile_active.png" class="set_img"/>
       </template>
       <template #item_text>
          <p slot="item_text">我的</p>
       </template>
     </tab-bar-item>
   </tab-bar>
 </div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'
export default {
   name: 'MainTabBar',
   components: {
    TabBar,
    TabBarItem
  },
  options: {
    multipleSlots:true
  }
}
</script>

<style>
.set_img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
