<template>
  <div class="back-top" @click="backClick">
    <img src="~assets/backTop.png"/>
  </div>
</template>

<script>
  export default {
    name: 'BackTop',
    methods: {
      backClick () {
        console.log('回到顶部')
      }
    }
  }
</script>

<style scoped>
.back-top {
  position: absolute;
  bottom: 50px;
  right: 10px;
  text-align: right;
}
  .back-top img {
    width: 50%;
  }
</style>
