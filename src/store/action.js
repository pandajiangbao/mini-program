import {RECEIVE_LIST, RECEIVE_MOVIES} from './mutation-type'
import pandaData from '../utils/pandaData'
export default {
  getPandaList ({commit}) {
    commit(RECEIVE_LIST, pandaData)
  },
  getMovies ({commit}, moviesData) {
    commit(RECEIVE_MOVIES, moviesData)
  }
}
