import * as types from './mutation-types'

export default {
  [types.RECEIVE_USER_ID] (state, userId) {
    state.userId = userId
  },
  [types.RECEIVE_USER_INFO] (state, userInfo) {
    if (userInfo) {
      state.userInfo = userInfo
    } else {
      console.log(types.RECEIVE_USER_INFO, '获取的数据有误')
    }
  },
  [types.RECEIVE_PRODUCTS] (state, productList) {
    state.productList = productList
  },
  [types.RECEIVE_PRODUCTS_BY_CATEGORY] (state, productListByCategory) {
    state.productListByCategory = productListByCategory
  },
  [types.RECEIVE_PRODUCT_CATEGORIES] (state, productCategoryList) {
    state.productCategoryList = productCategoryList
  },
  [types.RECEIVE_SHOPPING_CARTS] (state, shoppingCartList) {
    state.shoppingCartList = shoppingCartList
  }
}
