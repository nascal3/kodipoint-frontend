import { api } from '@/middleware/config'

/**
 * Fetch all landlords
 * @method getLandlords
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} rootGetters of the vuex store
 * @param  {Object} payload values of page event
 */
const getLandlords = async ({ commit, state, rootGetters }, payload) => {
  const limit = rootGetters['configs/setPageSize']
  const offset = Object.keys(state.landlords).length > 0 ? state.landlords.length : 0
  const params = {
    limit,
    offset
  }
  const url = `/api/landlords/all`
  commit('SET_ERROR_STATE', false)

  try {
    const response = await api.get(url, params)
    const data = response.data.result
    if (response.status === 200) {
      response.data.result = state.landlords.length === 0 ? data : [...state.landlords, ...data]
      commit('GET_LANDLORDS', response.data.result)
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
 * Add and edit landlord
 * @method  addNewLandlord
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload property values
 */
const addNewLandlord = async ({ commit, dispatch }, payload) => {
  const data = JSON.parse(payload.getAll('data'))

  commit('SHOW_LOADER', true)
  commit('USER_ID_DUPLICATION_ERROR', false)
  commit('auth/USER_DUPLICATION_ERROR', false, { root: true })
  const url = data.edit ? '/api/landlords/profile/edit' : '/api/landlords/register'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('RESET_LANDLORDS')
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
 * Starts search of landlords
 * @method searchLandlords
 * @param  {Object} commit vuex mutations
 * @param {Object} payload search terms
 */
const searchLandlords = ({ commit, dispatch }, payload) => {
  commit('RESET_SEARCH_LANDLORDS')
  commit('UPDATE_NO_RESULTS', false)
  dispatch('fetchSearchLandlords', payload)
}

/**
 * fetch all searched landlord results and set them in the state
 * @method fetchSearchLandlords
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload containing search term of landlord to be searched
 * @return {Promise}
 */
// @ts-ignore
const fetchSearchLandlords = async ({ commit, state }, payload) => {
  const url = `/api/landlords/search`
  const params = {
    'search_phrase': payload.trim()
  }

  try {
    const result = await api.post(url, params)
    if (state.landlordSearchResults.length) { return }
    if (result.data.results.length) {
      commit('UPDATE_NO_RESULTS', false)
      commit('LANDLORD_SEARCH_RESULTS', result.data.results)
      return
    }
    commit('UPDATE_NO_RESULTS', true)
  } catch (error) {
    commit('SET_ERROR_STATE', true)
    throw Error(error.message)
  }
}

/**
 * Sets details of the landlord that has been selected
 * @method setSelectedLandlord
 * @param  {Object} commit vuex mutations
 * @param {Object} payload contains landlord details
 */
const setSelectedLandlord = ({ commit }, payload) => {
  commit('SET_SELECTED_LANDLORD', payload)
}

/**
 * Removes details of the landlord that has been selected
 * @method resetSelectedLandlord
 * @param  {Object} commit vuex mutations
 */
const resetSelectedLandlord = ({ commit }) => {
  commit('RESET_SELECTED_LANDLORD')
}

export {
  getLandlords,
  addNewLandlord,
  searchLandlords,
  fetchSearchLandlords,
  setSelectedLandlord,
  resetSelectedLandlord
}
