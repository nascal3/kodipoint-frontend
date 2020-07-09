import { api } from '@/middleware/config'

/**
 * Fetch all tenants
 * @method getTenants
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} rootGetters of the vuex store
 * @param  {Object} payload values of page event
 */
const getTenants = async ({ commit, state, rootGetters }, payload) => {
  const limit = rootGetters['configs/setPageSize']
  const offset = Object.keys(state.tenants).length > 0 ? state.tenants.length : 0
  const url = state.tenantsListType === 'allTenants' ? '/api/tenants/all' : '/api/tenants/landlord'
  const params = {
    limit,
    offset
  }
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
 * Move tenant into rental property
 * @method  moveInTenant
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload tenant attributes
 */
const moveInTenant = async ({ commit, dispatch }, payload) => {
  commit('SHOW_LOADER', true)
  commit('auth/USER_DUPLICATION_ERROR', false, { root: true })
  const url = payload.edit ? '/api/tenantsrec/edit' : '/api/tenantsrec/movein'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('SHOW_LOADER', false)
      return response.data
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    if (err.response.status === 422) {
      err.response.data.Error === 'The entry has already been done!'
        ? commit('MOVE_IN_DUPLICATION_ERROR', true)
        : commit('NO_VACANCY_ERROR', true)
    }
    throw err
  }
}

/**
 * Get a Tenants' rental records
 * @method  getTenantRentalRecords
 * @param  {Object} commit vuex mutations
 * @param  {Object} payload tenant and landlord ID
 */
const getTenantRentalRecords = async ({ commit }, payload) => {
  commit('SHOW_LOADER', true)
  const url = '/api/tenantsrec/single'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('SET_SELECTED_TENANT_RENTAL_RECORDS', response.data.result)
      commit('SHOW_LOADER', false)
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    throw err
  }
}

/**
 * Get Tenants' rental single record
 * @method  getTenantRentalRecords
 * @param  {Object} commit vuex mutations
 * @param  {Object} payload record ID
 */
const getTenantRentalSingleRecord = async ({ commit }, payload) => {
  commit('SHOW_LOADER', true)
  const url = '/api/tenantsrec/row'
  const params = {
    'params': { 'record_id': payload }
  }

  try {
    const response = await api.get(url, params)
    if (response.status === 200) {
      commit('SET_SELECTED_TENANT_RECORD', response.data.results)
      commit('SHOW_LOADER', false)
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    throw err
  }
}

/**
 * Add or edit tenant
 * @method  addNewTenant
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload tenant attributes
 */
const addNewTenant = async ({ commit, dispatch }, payload) => {
  const data = JSON.parse(payload.getAll('data'))

  commit('SHOW_LOADER', true)
  commit('auth/USER_DUPLICATION_ERROR', false, { root: true })
  const url = data.edit ? '/api/tenants/profile/edit' : '/api/tenants/register'

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
      err.response.data.Error === 'The following national ID already exists!'
        ? commit('TENANT_ID_DUPLICATION_ERROR', true)
        : commit('auth/USER_DUPLICATION_ERROR', true, { root: true })
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
 * Fetch all searched tenants results and set them in the state
 * @method fetchSearchTenants
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload containing search term of tenant to be searched
 * @return {Promise}
 */
const fetchSearchTenants = async ({ commit, state }, payload) => {
  const url = state.tenantsListType === 'allTenants' ? '/api/tenants/search' : '/api/tenants/landlord/search'
  const params = {
    'search_phrase': payload.trim()
  }

  try {
    const data = await api.post(url, params)
    if (state.tenantSearchResults.length) { return }
    if (data.data.result.length) {
      commit('UPDATE_NO_RESULTS', false)
      commit('TENANT_SEARCH_RESULTS', data.data.result)
      return
    }
    commit('UPDATE_NO_RESULTS', true)
  } catch (error) {
    commit('SET_ERROR_STATE', true)
    throw new Error(error)
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
  getTenants,
  moveInTenant,
  addNewTenant,
  searchTenants,
  fetchSearchTenants,
  setSelectedTenant,
  resetSelectedTenant,
  getTenantRentalRecords,
  getTenantRentalSingleRecord
}
