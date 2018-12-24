import {fly} from '../main'
import * as types from './mutation-types'

export default {
  getPandaList ({commit}) {
    console.log(fly.config)
    console.log(fly.config.header)
    console.log('fly.config.headers :', fly.config.headers)
    fly.get('http://localhost:8082/api/pandas')
      .then((response) => {
        console.log('response :', response)
        console.log(fly.config.headers)
        commit(types.RECEIVE_LIST, response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getMovies ({commit}) {
    fly.get('http://t.yushu.im/v2/movie/top250')
      .then((response) => {
        commit(types.RECEIVE_MOVIES, response.data.subjects)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
