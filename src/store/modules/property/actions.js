import { api } from '@/middleware/config'

/**
 * Fetch properties of specific landlord
 * @method getProperties
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload values of email and password
 */
const getProperties = async ({ commit, state }, payload) => {
  const limit = 100
  const pageNum = payload ? payload.page : 1
  const url = `/api/properties/landlord/${pageNum}`

  try {
    const response = await api.post(url, payload)
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
    throw new Error(err.message)
  }
}

/**
 * Add and edit properties
 * @method addNewProperty
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload property values
 */
const addNewProperty = async ({ commit, dispatch }, payload) => {
  const data = JSON.parse(payload.getAll('json'))
  const url = data.edit ? '/api/properties/edit' : '/api/properties/register'

  commit('SHOW_LOADER', true)
  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('RESET_PROPERTIES')
      commit('SHOW_LOADER', false)
      return true
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    commit('SET_ERROR_STATE', true)
    throw new Error(err)
  }
}

/**
 * Starts search of employees
 * @method searchEmployees
 * @param  {Object} Object vuex context object
 * @param {*} payload search terms
 */
const searchProperties = ({ commit, dispatch }, payload) => {
  commit('RESET_SEARCH_EMPLOYEES')
  commit('UPDATE_NO_RESULTS', false)
  dispatch('fetchSearchProperties', payload)
}

/**
 * fetch all searched property results and set them in the state
 * @method fetchSearchedProperty
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload containing search term or user ID of property to be searched
 * @return {Promise}
 */
const fetchSearchProperties = async ({ commit, state }, payload) => {
  const url = `/api/properties/landlord/search`
  try {
    const result = await api.post(url, payload)
    if (state.propertySearchResults.length) { return }
    if (result.data.results.length) {
      commit('UPDATE_NO_RESULTS', false)
      commit('PROPERTY_SEARCH_RESULTS', result.data.results)
      return
    }
    commit('UPDATE_NO_RESULTS', true)
  } catch (error) {
    commit('SET_ERROR_STATE', true)
    throw Error(error.message)
  }
}

export {
  getProperties,
  addNewProperty,
  searchProperties,
  fetchSearchProperties
}
