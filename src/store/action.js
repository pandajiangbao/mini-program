import {fly} from '../main'
import * as types from './mutation-types'

export default {
  getProductList ({commit}) {
    fly.get('/products')
      .then((response) => {
        commit(types.RECEIVE_PRODUCTS, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getProductListByQuery ({commit}, query) {
    return fly.get(`/products?query=${query}`)
      .then((response) => {
        commit(types.RECEIVE_PRODUCTS_BY_QUERY, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getProductListByCategory ({commit}, index) {
    fly.get(`/categories/${index}/products`)
      .then((response) => {
        commit(types.RECEIVE_PRODUCTS_BY_CATEGORY, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getProductCategoryList ({commit}) {
    fly.get('/categories')
      .then((response) => {
        commit(types.RECEIVE_PRODUCT_CATEGORIES, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getUserStarList ({state, commit}) {
    fly.get(`/users/${state.userId}/userStars`)
      .then((response) => {
        commit(types.RECEIVE_USER_STARS, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  addUserStar ({dispatch, state}, {productId}) {
    fly.post('/userStars',
      {
        userId: state.userId,
        productId: productId
      })
      .then(() => {
      // 刷新收藏列表
        return dispatch('getUserStarList')
      })
      .then(() => {
        wx.showToast({
          title: '收藏成功', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
      .catch((error) => {
        console.error(error)
        wx.showToast({
          title: '网络延迟,请稍后再试', // 提示的内容,
          icon: 'none',
          duration: 1500, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
  },
  deleteUserStar ({dispatch}, {userStarId}) {
    fly.delete(`/userStars/${userStarId}`)
      .then(() => {
      // 刷新收藏列表
        return dispatch('getUserStarList')
      })
      .then(() => {
        wx.showToast({
          title: '取消收藏', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
      .catch((error) => {
        console.error(error)
        wx.showToast({
          title: '网络延迟,请稍后再试', // 提示的内容,
          icon: 'none',
          duration: 1500, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
  },
  getUserBonusList ({state, commit}) {
    fly.get(`/users/${state.userId}/userBonuses`)
      .then((response) => {
        commit(types.RECEIVE_USER_BONUSES, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  deleteUserBonus ({dispatch}, {userBonusId}) {
    fly.delete(`/userStars/${userBonusId}`)
      .then(() => {
      // 刷新收藏列表
        return dispatch('getUserBonusList')
      })
      .catch((error) => {
        console.error(error)
      })
  },
  bonusToNewUser ({state, dispatch}) {
    fly.post(`/users/${state.userId}/userBonuses/bonusToNewUser`)
      .then(() => {
      // 刷新收藏列表
        return dispatch('getUserBonusList')
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getShoppingCartList ({commit, state}) {
    fly.get(`/users/${state.userId}/shoppingCarts`)
      .then((response) => {
        wx.setTabBarBadge({
          index: 2,
          text: String(response.data.length)
        })
        commit(types.RECEIVE_SHOPPING_CARTS, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  addShoppingCart ({dispatch, state}, {sum, amount, pid}) {
    fly.post('/shoppingCarts',
      {
        priceSum: sum,
        productAmount: amount,
        productId: pid,
        userId: state.userId
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
        console.error(error)
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
        console.error(error)
        wx.showToast({
          title: '网络延迟,请稍后再试', // 提示的内容,
          icon: 'none',
          duration: 1500, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
  },
  updateShoppingCartBatch ({dispatch}, {shoppingCartList}) {
    return fly.put(`/shoppingCarts`,
      {
        shoppingCartVOList: shoppingCartList
      })
      .then(() => {
        // 刷新购物车
        return dispatch('getShoppingCartList')
      })
      .catch((error) => {
        console.error(error)
        wx.showToast({
          title: '网络延迟,请稍后再试', // 提示的内容,
          icon: 'none',
          duration: 1500, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
  },
  deleteShoppingCart ({dispatch}, id) {
    return fly.delete(`/shoppingCarts/${id}`)
      .then(() => {
        // 刷新购物车
        return dispatch('getShoppingCartList')
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getOrder ({commit, state}) {
    fly.get(`/users/${state.userId}/orders`)
      .then((response) => {
        commit(types.RECEIVE_ORDERS, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  createOrder ({dispatch, state},
    {productPrice,
      shippingPrice,
      bonusPrice,
      totalPrice,
      addressId,
      shippingComId,
      shoppingCartList,
      orderDetailList,
      flag}) {
    let temp
    fly.post(`/orders?solo=${flag}`, {
      userId: state.userId,
      productPrice: productPrice,
      shippingPrice: shippingPrice,
      bonusPrice: bonusPrice,
      totalPrice: totalPrice,
      addressId: addressId,
      shippingComId: shippingComId,
      shoppingCartList: shoppingCartList,
      orderDetailList: orderDetailList
    })
      .then((response) => {
        temp = response.data
        // 刷新订单表
        return dispatch('getOrder')
      })
      .then(() => {
        // 刷新购物车
        return dispatch('getShoppingCartList')
      })
      .then(() => {
        wx.redirectTo({
          url: `../orderDetail/main?id=${temp}`
        })
        wx.showToast({
          title: '下单成功', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
      .catch((error) => {
        console.error(error)
        wx.showToast({
          title: '网络延迟,请稍后再试', // 提示的内容,
          icon: 'none',
          duration: 1500, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
  },
  getShippingComList ({commit, state}) {
    fly.get(`/shippingComs`)
      .then((response) => {
        commit(types.RECEIVE_SHIPPING_COMS, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  getAddressList ({commit, state}) {
    fly.get(`/users/${state.userId}/userAddresses`)
      .then((response) => {
        commit(types.RECEIVE_ADDRESS, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  addAddress ({dispatch, state}, {receiver, phoneNumber, province, city, county, detail}) {
    return fly.post(`/userAddresses`, {
      receiver: receiver,
      phoneNumber: phoneNumber,
      province: province,
      city: city,
      county: county,
      detail: detail,
      userId: state.userId
    })
      .then(() => {
        // 刷新地址
        return dispatch('getAddressList')
      })
      .then(() => {
        wx.navigateBack({delta: 1})
        wx.showToast({
          title: '添加成功', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  },
  updateAddress ({dispatch, state}, {id, receiver, phoneNumber, province, city, county, detail}) {
    return fly.put(`/userAddresses/${id}`, {
      receiver: receiver,
      phoneNumber: phoneNumber,
      province: province,
      city: city,
      county: county,
      detail: detail,
      userId: state.userId
    })
      .then(() => {
        // 刷新地址
        return dispatch('getAddressList')
      })
      .then(() => {
        wx.navigateBack({delta: 1})
        wx.showToast({
          title: '修改成功', // 提示的内容,
          duration: 1000, // 延迟时间,
          mask: true // 显示透明蒙层，防止触摸穿透,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  },
  deleteAddress ({dispatch}, id) {
    return fly.delete(`/userAddresses/${id}`)
      .then(() => {
        // 刷新购物车
        return dispatch('getAddressList')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
