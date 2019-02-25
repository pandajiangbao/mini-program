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
  addShoppingCartList (shoppingCart) {
    fly.post('/shoppingCarts', {shoppingCart: shoppingCart})
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  updateShoppingCartList (id, shoppingCart) {
    fly.put('/shoppingCarts/' + id, {shoppingCart: shoppingCart})
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  deleteShoppingCartList (id) {
    fly.delete('/shoppingCarts/' + id)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // getMovies ({commit}) {
  //   fly.get('http://t.yushu.im/v2/movie/top250')
  //     .then((response) => {
  //       commit(types.RECEIVE_MOVIES, response.data.subjects)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
}
