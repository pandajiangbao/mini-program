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
      state.userInfo = {}
    }
  },
  [types.RECEIVE_PRODUCTS] (state, productList) {
    if (productList && productList.length > 0) {
      state.productList = productList
    } else {
      console.log(types.RECEIVE_PRODUCTS, '获取的数据有误')
      state.productList = []
    }
  },
  [types.RECEIVE_PRODUCT_CATEGORIES] (state, productCategoryList) {
    if (productCategoryList && productCategoryList.length > 0) {
      state.productCategoryList = productCategoryList
    } else {
      console.log(types.RECEIVE_PRODUCT_CATEGORIES, '获取的数据有误')
      state.productCategoryList = []
    }
  },
  [types.RECEIVE_SHOPPING_CARTS] (state, shoppingCartList) {
    if (shoppingCartList && shoppingCartList.length > 0) {
      state.shoppingCartList = shoppingCartList
    } else {
      console.log(types.RECEIVE_SHOPPING_CARTS, '获取的数据有误')
      state.shoppingCartList = []
    }
  },
  [types.RECEIVE_MOVIES] (state, moviesData) {
    if (moviesData && moviesData.length > 0) {
      state.movies = moviesData
    } else {
      console.log(types.RECEIVE_MOVIES, '获取的数据有误')
      state.movies = []
    }
  }
}
