<template>
  <div v-if="Object.keys(goods).length !== 0">
    <div>{{goods.title}}</div>
    <div>
      <span>{{goods.newPrice}}</span>
      <span>{{goods.oldPrice}}</span>
      <span v-if="goods.discount">{{goods.discount}}</span>
    </div>
    <div>
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div>
      <span v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon"/>
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

</style>
