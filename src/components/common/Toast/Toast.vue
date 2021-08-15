<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    // props: {
    //   message: {
    //     type: String,
    //     default: ""
    //   },
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      //设置默认时间duration=2000
      show(message='添加默认文字',duration=2000) {
        this.isShow = true
        this.message = message
        setTimeout( () => {
          this.isShow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top:50%;
    padding: 10px 15px;
    transform: translate(-50%,-50%);
    color: #fff;
    background-color: rgba(0,0,0,0.75);
    border-radius: 5px;
    z-index: 99
  }
</style>
