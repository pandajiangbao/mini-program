import * as types from './mutation-types'

export default {
  [types.RECEIVE_USER_ID] (state, userId) {
    state.userId = userId
  },
  [types.SET_IS_NEW_USER] (state) {
    state.isNewUser = true
  },
  [types.RECEIVE_USER_INFO] (state, userInfo) {
    if (userInfo) {
      state.userInfo = userInfo
    } else {
      console.log(types.RECEIVE_USER_INFO, '获取的数据有误')
    }
  },
  [types.RECEIVE_USER_STARS] (state, userStarList) {
    state.userStarList = userStarList
  },
  [types.RECEIVE_USER_BONUSES] (state, userBonusList) {
    state.userBonusList = userBonusList
  },
  [types.RECEIVE_PRODUCTS] (state, productList) {
    state.productList = productList
  },
  [types.RECEIVE_PRODUCTS_BY_QUERY] (state, productListByQuery) {
    state.productListByQuery = productListByQuery
  },
  [types.RECEIVE_PRODUCTS_BY_CATEGORY] (state, productListByCategory) {
    state.productListByCategory = productListByCategory
  },
  [types.RECEIVE_PRODUCT_CATEGORIES] (state, productCategoryList) {
    state.productCategoryList = productCategoryList
  },
  [types.RECEIVE_SHOPPING_CARTS] (state, shoppingCartList) {
    state.shoppingCartList = shoppingCartList
  },
  [types.RECEIVE_ORDERS] (state, orderList) {
    state.orderList = orderList
  },
  [types.RECEIVE_SHIPPING_COMS] (state, shippingComList) {
    state.shippingComList = shippingComList
  },
  [types.RECEIVE_ADDRESS] (state, addressList) {
    state.addressList = addressList
  },
  [types.SET_BONUS_ID] (state, bonusId) {
    state.selectBonusId = bonusId
  },
  [types.CLEAR_BONUS_ID] (state) {
    state.selectBonusId = null
  },
  [types.SET_ADDRESS_ID] (state, addressId) {
    state.selectAddressId = addressId
  },
  [types.CLEAR_ADDRESS_ID] (state) {
    state.selectAddressId = null
  }
}
