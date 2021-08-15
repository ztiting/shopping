<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" @click="backClick">&lt;</div>
      <div slot="center"  class="nav-bar-center">
        <span v-for="(item,index) in title"
              :key="index"
              @click="itemClick(index)"
              :class="{active: currentIndex === index}">{{item}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    components: {
      NavBar
    },
    data() {
      return {
        title: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
.nav-bar-center {
  display: flex;
}

.nav-bar-center span {
  flex: 1
}
.active {
  color: var(--color-tint);
}
</style>
