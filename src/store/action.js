import {fly} from '../main'
import * as types from './mutation-types'

export default {
  getProductList ({commit}) {
    fly.get('/products')
      .then((response) => {
        commit(types.RECEIVE_PRODUCTS, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getProductListByQuery ({commit}, query) {
    return fly.get(`/products?query=${query}`)
      .then((response) => {
        commit(types.RECEIVE_PRODUCTS_BY_QUERY, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getProductListByCategory ({commit}, index) {
    fly.get(`/categories/${index}/products`)
      .then((response) => {
        commit(types.RECEIVE_PRODUCTS_BY_CATEGORY, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getProductCategoryList ({commit}) {
    fly.get('/categories')
      .then((response) => {
        commit(types.RECEIVE_PRODUCT_CATEGORIES, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getShoppingCartList ({commit, state}) {
    fly.get(`/user/${state.userId}/shoppingCarts`)
      .then((response) => {
        commit(types.RECEIVE_SHOPPING_CARTS, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  addShoppingCart ({dispatch, state}, {sum, amount, pid, uid}) {
    fly.post('/shoppingCarts',
      {
        priceSum: sum,
        productAmount: amount,
        productId: pid,
        userId: uid
      })
      .then(() => {
      // 刷新购物车
        return dispatch('getShoppingCartList')
      })
      .then(() => {
        wx.showToast({
          title: '添加成功', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
      .catch((error) => {
        console.log(error)
        wx.showToast({
          title: '网络延迟,请稍后再试', // 提示的内容,
          icon: 'none',
          duration: 1500, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
  },
  updateShoppingCart ({dispatch, state}, {id, sum, amount, isSelected}) {
    return fly.put(`/shoppingCarts/${id}`,
      {
        priceSum: sum,
        productAmount: amount,
        isSelected: isSelected
      })
      .then(() => {
        // 刷新购物车
        return dispatch('getShoppingCartList')
      })
      .catch((error) => {
        console.log(error)
        wx.showToast({
          title: '网络延迟,请稍后再试', // 提示的内容,
          icon: 'none',
          duration: 1500, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
  },
  deleteShoppingCart ({dispatch, state}, id) {
    return fly.delete(`/shoppingCarts/${id}`)
      .then(() => {
        // 刷新购物车
        return dispatch('getShoppingCartList')
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getOrder ({commit, state}) {
    fly.get(`/user/${state.userId}/orders`)
      .then((response) => {
        commit(types.RECEIVE_ORDERS, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  createOrder ({dispatch, state},
    {productPrice,
      shippingPrice,
      bonusPrice,
      totalPrice,
      addressId,
      shippingComId,
      orderDetailList}) {
    return fly.post('/orders', {
      userId: state.userId,
      productPrice: productPrice,
      shippingPrice: shippingPrice,
      bonusPrice: bonusPrice,
      totalPrice: totalPrice,
      addressId: addressId,
      shippingComId: shippingComId,
      orderDetailList: orderDetailList
    })
      .then(() => {
        // 刷新订单表
        return dispatch('getOrder')
      })
      .then(() => {
        wx.showToast({
          title: '下单成功', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
