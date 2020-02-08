import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
import state from './states'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
