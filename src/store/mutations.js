//导入常量
import {
  ADD_COUNT,
  ADD_TO_CART
} from './mutation-types'
export default {
  //写法一：在mutations中添加购物车，但是由于添加的时候既有数量加一，又有添加数据，
  // 这种复杂的可以放在action中处理
  //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事比较单一一点
  // addCart(state,payload) {
  //   let oldProduct = null
  //   state.cartList.push(payload)
  //
  //   //1.查找之前数组中是否有该商品
  //   //1.1方法一 遍历
  //   for(let item of state.cartList) {
  //     if(item.iid === payload.iid) {
  //       oldProduct = payload
  //     }
  //   }
  //
  //   //1.2 方法二 find
  //   // let oldProduct = state.cartList.find(function(item){
  //   //   return item.iid === payload.iid
  //   // })
  //
  //   // let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   //这里的既有数量加一，又有添加商品
  //   if (oldProduct) {
  //     oldProduct.count += 1
  //   } else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  // addCount(state, payload) {
  //   payload.count++
  // },

  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
