import {RECEIVE_LIST} from './mutation-type'
export default {
  [RECEIVE_LIST] (state, pandaList) {
    state.pandaList = pandaList
  }
}
