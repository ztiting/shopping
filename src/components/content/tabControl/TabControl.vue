<template>
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item,index) in titles"
         :key="index"
          :class="{active: index === currentIndex}"
          @click="selectItem(index)">
         <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      selectItem(index) {
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
  }
  .active span {
   padding-bottom: 5px;
    border-bottom: 2px solid var(--color-tint);
  }
</style>
