import {RECEIVE_LIST} from './mutation-type'
import pandaData from '../utils/pandaData'
export default {
  getPandaList ({commit}) {
    commit(RECEIVE_LIST, pandaData)
  }
}
