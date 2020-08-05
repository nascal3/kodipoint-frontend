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
 * Fetch all properties
 * @method getAllProperties
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} rootGetters of the vuex store
 * @param  {Object} payload values of page event
 */
const getAllProperties = async ({ commit, state, rootGetters }, payload) => {
  const limit = rootGetters['configs/setPageSize']
  const offset = Object.keys(state.properties).length > 0 ? state.properties.length : 0
  const params = {
    limit,
    offset
  }
  const url = `/api/properties/all`

  try {
    const response = await api.post(url, params)
    const data = response.data.result
    if (response.status === 200) {
      response.data.result = state.properties.length === 0 ? data : [...state.properties, ...data]
      commit('GET_ALL_PROPERTIES', response.data.result)
      payload.loaded()
      if (data.length < limit) {
        payload.complete()
      }
    }
  } catch (err) {
    commit('SET_ERROR_STATE', true)
    throw err.message
  }
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
 * Starts search of properties
 * @method searchProperties
 * @param  {Object} Object vuex context object
 * @param  {Function} dispatch vuex actions
 * @param {*} payload search terms
 */
const searchProperties = ({ commit, dispatch }, payload) => {
  commit('RESET_SEARCH_PROPERTIES')
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
    throw error.message
  }
}

/**
 * fetch all tenants living a selected property
 * @method fetchTenantsInProperty
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload containing property ID of selected property
 */
const fetchTenantsInProperty = async ({ commit, state }, payload) => {
  commit('SHOW_LOADER', true)
  const url = `/api/tenantsrec/property`
  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('PROPERTY_TENANTS', response.data.result)
      commit('SHOW_LOADER', false)
    }
  } catch (error) {
    commit('SHOW_LOADER', false)
    throw error.message
  }
}

/**
 * fetch single property single values
 * @method fetchSingleProperty
 * @param  {Object} commit vuex mutations
 * @param  {Object} payload containing property ID of property
 * @return {Promise} property details
 */
const fetchSingleProperty = async ({ commit }, payload) => {
  commit('SHOW_LOADER', true)
  const url = `/api/properties/single`

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('SHOW_LOADER', false)
      return response.data.results
    }
  } catch (error) {
    commit('SHOW_LOADER', false)
    throw error.message
  }
}

/**
 * delete property service for a selected property
 * @method deletePropertyService
 * @param  {Object} commit vuex mutations
 * @param  {Function} dispatch vuex actions
 * @param  {Object} payload containing property ID of property service
 * @return {Promise} property service deleted
 */
const deletePropertyService = async ({ commit, dispatch }, payload) => {
  commit('SHOW_LOADER', true)
  const url = `/api/properties/deleteservice`
  // eslint-disable-next-line camelcase
  const { id, property_id } = payload

  try {
    const response = await api.post(url, { 'id': id })
    if (response.status === 200) {
      commit('SHOW_LOADER', false)
      return await dispatch('fetchSingleProperty', { 'id': property_id })
    }
  } catch (error) {
    commit('SHOW_LOADER', false)
    throw error.message
  }
}

export {
  resetErrors,
  getProperties,
  addNewProperty,
  searchProperties,
  getAllProperties,
  fetchSearchProperties,
  fetchTenantsInProperty,
  fetchSingleProperty,
  deletePropertyService
}
