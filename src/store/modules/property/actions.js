import { api } from '@/middleware/config'

/**
 * Fetch properties of specific landlord
 * @method getProperties
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload values of email and password
 */
const getProperties = async ({ commit, state, dispatch }, payload) => {
  const limit = 100
  const url = `/properties/landlord/${payload.page}`
  try {
    const response = await api.get(url)
    const data = response.data.result
    if (response.status === 200) {
      response.data.result = state.properties.length === 0 ? data : [...state.properties, ...data]
      commit('GET_PROPERTIES', response.data.result)
      payload.loaded()
      if (data.length < limit) {
        payload.complete()
      }
    }
  } catch (err) {
    commit('SET_ERROR_STATE', true)
    throw new Error(err)
  }
}

export {
  getProperties
}
