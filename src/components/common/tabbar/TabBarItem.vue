<template>
  <div class="tab_bar_item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item_icon"></slot>
    </div>
    <div v-else>
      <slot name="item_icon_active"></slot>
    </div>
    <div :style = "activeStyle">
      <slot name="item_text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    link: String,
    activeColor: {
      type: String,
      default: '#d81e06'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // /home  ==>  item1(/home)  ===  true
      // /home  ==>  item1(/category)  ===  true
      // /home  ==>  item1(/shopcart)  ===  true
      // /home  ==>  item1(/profile)  ===  true
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link).catch(error => " ")
    }
  }
}
</script>

<style scoped>
.tab_bar_item{
  flex: 1;
  text-align: center;
  height: 49px;
}

.tab_bar_item div img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
.tab_bar_item p{
  margin: 0;
  font-size: 14px;
}
.active{
  color: #d81e06;
}
</style>
