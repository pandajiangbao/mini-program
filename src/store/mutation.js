import * as types from './mutation-types'

export default {
  [types.RECEIVE_LIST] (state, pandaList) {
    if (pandaList && pandaList.length > 0) {
      state.pandaList = pandaList
    } else {
      state.pandaList = null
    }
  },
  [types.RECEIVE_MOVIES] (state, moviesData) {
    if (moviesData && moviesData.length > 0) {
      state.movies = moviesData
    } else {
      state.movies = null
    }
  }
}
