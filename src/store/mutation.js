import {RECEIVE_LIST, RECEIVE_MOVIES} from './mutation-type'
export default {
  [RECEIVE_LIST] (state, pandaList) {
    state.pandaList = pandaList
  },
  [RECEIVE_MOVIES] (state, moviesData) {
    state.movies = moviesData
  }
}
