import { api } from '@/middleware/config'

/**
 * Reset Errors
 * @method resetErrors
 */
const resetErrors = ({ commit }) => {
  commit('SET_ERROR_STATE', false)
  commit('LR_NUMBER_DUPLICATION_ERROR', false)
}

/**
 * Fetch properties of specific landlord
 * @method getProperties
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} rootGetters of the vuex store
 * @param  {Object} payload values of page event
 */
const getProperties = async ({ commit, state, rootGetters }, payload) => {
  const limit = rootGetters['configs/setPageSize']
  const offset = Object.keys(state.properties).length > 0 ? state.properties.length : 0
  const params = {
    limit,
    offset,
    user_id: payload.user_id
  }
  const url = `/api/properties/landlord`

  try {
    const response = await api.post(url, params)
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
 * @param  {Function} dispatch vuex actions
 * @param  {Object} payload property values
 */
const addNewProperty = async ({ commit, dispatch }, payload) => {
  const data = JSON.parse(payload.getAll('data'))
  const url = data.edit ? '/api/properties/edit' : '/api/properties/register'

  dispatch('resetErrors')
  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('RESET_PROPERTIES')
      commit('SHOW_LOADER', false)
      return true
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    if (err.response.status === 422) {
      commit('LR_NUMBER_DUPLICATION_ERROR', true)
      throw err
    }
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
  resetErrors,
  getProperties,
  addNewProperty,
  searchProperties,
  fetchSearchProperties
}
