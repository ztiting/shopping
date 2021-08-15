import Toast from './Toast'
const obj = {}

obj.install = function(Vue) {
  //Toast对象有自己的模板，不会显示，所以要添加在body上(这种方法不行)
  // document.body.appendChild(Toast.$el)

  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.new方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastConstructor()
  //3.将组件对象，手动挂载到某一元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //Toast对象放在原型上
  Vue.prototype.$toast = toast
}

export default obj
