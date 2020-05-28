import * as getters from './getters'
import state from './states'
import * as mutations from './mutations'
import * as actions from './actions'

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
