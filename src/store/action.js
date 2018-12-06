import Fly from 'flyio/dist/npm/wx'
import * as types from './mutation-types'

const fly = new Fly()

export default {
  getPandaList ({commit}) {
    fly.get('http://localhost:8082/api/pandas')
      .then((response) => {
        console.log('response :', response)
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
