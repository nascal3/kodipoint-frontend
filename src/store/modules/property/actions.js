import { api } from '@/middleware/config'

/**
 * Fetch properties of specific landlord
 * @method getProperties
 * @param  {Object} commit vuex mutations
 * @param  {Object} payload values of email and password
 */
const getProperties = async ({ commit, state }, payload) => {
  const limit = 100
  const pageNum = payload ? payload.page : 1
  const url = `/properties/landlord/${pageNum}`

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

/**
 * Add new properties
 * @method addNewProperty
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload property values
 */
const addNewProperty = async ({ commit, dispatch }, payload) => {
  const url = payload.edit ? '/properties/edit' : '/properties/register'
  const params = {
    ...payload.params
  }
  commit('SHOW_LOADER', true)
  try {
    const response = await api.post(url, params)
    if (response.status === 200) {
      commit('RESET_PROPERTIES')
      commit('SHOW_LOADER', false)
      dispatch('getProperties')
      return true
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    throw new Error(err)
  }
}

export {
  getProperties,
  addNewProperty
}
