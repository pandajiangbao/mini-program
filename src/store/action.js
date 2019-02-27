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
  getShoppingCartList ({commit}, userId) {
    fly.get('/user/' + userId + '/shoppingCarts')
      .then((response) => {
        commit(types.RECEIVE_SHOPPING_CARTS, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  addShoppingCart ({commit}, {sum, amount, pid, uid}) {
    return fly.post('/shoppingCarts', {
      priceSum: sum,
      productAmount: amount,
      productId: pid,
      userId: uid
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        Promise.reject(error)
      })
  },
  updateShoppingCart ({commit}, {id, shoppingCart}) {
    return fly.put('/shoppingCarts/' + id, {shoppingCart: shoppingCart})
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        Promise.reject(error)
      })
  },
  deleteShoppingCart ({commit}, id) {
    return fly.delete(`/shoppingCarts/${id}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
        Promise.reject(error)
      })
  }
}
