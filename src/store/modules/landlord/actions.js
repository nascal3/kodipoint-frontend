import { api } from '@/middleware/config'

/**
 * Fetch all landlords
 * @method getLandlords
 * @param  {Object} commit vuex mutations
 * @param  {Object} state of the vuex store
 * @param  {Object} payload values of name and national ID
 */
const getLandlords = async ({ commit, state }, payload) => {
  const limit = 100
  const pageNum = payload ? payload.page : 1
  const url = `/landlords/${pageNum}`

  try {
    const response = await api.get(url)
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
 * Add and edit properties
 * @method addNewProperty
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload property values
 */
const addNewProperty = async ({ commit, dispatch }, payload) => {
  const data = JSON.parse(payload.getAll('json'))
  const url = data.edit ? '/properties/edit' : '/properties/register'

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
 * Starts search of landlords
 * @method searchLandlords
 * @param  {Object} Object vuex context object
 * @param {*} payload search terms
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
  const url = `/landlords/search`
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

export {
  getLandlords,
  addNewProperty,
  searchLandlords,
  fetchSearchLandlords
}
