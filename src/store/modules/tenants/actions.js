import { api } from '@/middleware/config'

/**
 * Fetch all tenants
 * @method getAllTenants
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload values of page event
 */
const getAllTenants = async ({ commit, state }, payload) => {
  const limit = 100
  const offset = Object.keys(state.tenants).length > 0 ? state.tenants.length : 0
  const params = {
    limit,
    offset
  }
  const url = `/api/tenants/all`
  commit('SET_ERROR_STATE', false)

  try {
    const response = await api.get(url, params)
    const data = response.data.result
    if (response.status === 200) {
      response.data.result = state.tenants.length === 0 ? data : [...state.tenants, ...data]
      commit('GET_ALL_TENANTS', response.data.result)
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
 * Add and edit tenant
 * @method  addNewTenant
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload tenant attributes
 */
const addNewTenant = async ({ commit, dispatch }, payload) => {
  const data = JSON.parse(payload.getAll('json'))

  commit('SHOW_LOADER', true)
  commit('auth/USER_DUPLICATION_ERROR', false, { root: true })
  const url = data.edit ? '/api/landlords/profile/edit' : '/api/landlords/register'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('RESET_TENANTS')
      commit('SHOW_LOADER', false)
      return response.data
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    if (err.response.status === 422) {
      err.response.data.Error === 'The following Email/Username already exists!'
        ? commit('auth/USER_DUPLICATION_ERROR', true, { root: true })
        : commit('USER_ID_DUPLICATION_ERROR', true)
    }
    throw new Error(err)
  }
}

/**
 * Starts search of tenants
 * @method searchTenants
 * @param  {Object} commit vuex mutations
 * @param {Object} payload search terms
 */
const searchTenants = ({ commit, dispatch }, payload) => {
  commit('RESET_SEARCH_TENANTS')
  commit('UPDATE_NO_RESULTS', false)
  dispatch('fetchSearchTenants', payload)
}

/**
 * fetch all searched landlord results and set them in the state
 * @method fetchSearchTenants
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload containing search term of tenant to be searched
 * @return {Promise}
 */
// @ts-ignore
const fetchSearchTenants = async ({ commit, state }, payload) => {
  const url = `/api/landlords/search`
  const params = {
    'search_phrase': payload.trim()
  }

  try {
    const result = await api.post(url, params)
    if (state.landlordSearchResults.length) { return }
    if (result.data.results.length) {
      commit('UPDATE_NO_RESULTS', false)
      commit('TENANT_SEARCH_RESULTS', result.data.results)
      return
    }
    commit('UPDATE_NO_RESULTS', true)
  } catch (error) {
    commit('SET_ERROR_STATE', true)
    throw Error(error.message)
  }
}

/**
 * Sets details of the tenant that has been selected
 * @method setSelectedTenant
 * @param  {Object} commit vuex mutations
 * @param {Object} payload contains landlord details
 */
const setSelectedTenant = ({ commit }, payload) => {
  commit('SET_SELECTED_TENANT', payload)
}

/**
 * Removes details of the tenant that has been selected
 * @method resetSelectedTenant
 * @param  {Object} commit vuex mutations
 */
const resetSelectedTenant = ({ commit }) => {
  commit('RESET_SELECTED_TENANT')
}

export {
  getAllTenants,
  addNewTenant,
  searchTenants,
  fetchSearchTenants,
  setSelectedTenant,
  resetSelectedTenant
}
