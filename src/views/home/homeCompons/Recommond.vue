<template>
  <div class="recommond">
    <div v-for="(item,index) in recommondList" :key="index">
      <a :href="item.link">
        <img :src="item.image"/>
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Recommond',
    props: {
      recommondList: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recommond {
  display: flex;
  width: 100%;
  padding: 15px 10px 20px;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}
.recommond div {
  flex: 1;
  text-align: center;
}
.recommond div img {
  width: 80%;
  margin-bottom: 5px;
}
</style>
