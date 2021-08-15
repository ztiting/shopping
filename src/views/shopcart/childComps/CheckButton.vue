<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/tick.svg" alt=""/>
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #ccc;
    width: 28px!important;
    height: 28px!important;
  }

  .check-button img {
    width: 25px;
  }

  .check {
    border-color: #d81e06;
    background-color: #d81e06;
  }
</style>
