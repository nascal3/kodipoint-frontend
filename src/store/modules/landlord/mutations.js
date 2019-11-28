/**
 * Reset landlords fetched
 * @method RESET_LANDLORDS
 * @param  {Object} state vuex state object
 */
const RESET_LANDLORDS = (state) => {
  state.landlords = []
}

/**
 * Set show loader state
 * @method SHOW_LOADER
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload values of auth state
 */
const SHOW_LOADER = (state, payload) => {
  state.showLoader = payload
}

/**
 * Sets no property results search state
 * @method UPDATE_NO_RESULTS
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains no results state
 */
const UPDATE_NO_RESULTS = (state, payload) => {
  state.noSearchResults = payload
}

/**
 * Set error state properties
 * @method SET_ERROR_STATE
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains error state
 */
const SET_ERROR_STATE = (state, payload) => {
  state.errorState = payload
}

/**
 * Reset landlord search results
 * @method RESET_SEARCH_LANDLORDS
 * @param  {Object} state vuex state object
 */
const RESET_SEARCH_LANDLORDS = (state) => {
  state.landlordSearchResults = []
}

/**
 * Fetch landlords
 * @method GET_LANDLORDS
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains properties
 */
const GET_LANDLORDS = (state, payload) => {
  state.landlords = payload
}

/**
 * Fetch landlords search results
 * @method LANDLORD_SEARCH_RESULTS
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains properties
 */
const LANDLORD_SEARCH_RESULTS = (state, payload) => {
  state.landlordSearchResults = payload
}

export {
  RESET_LANDLORDS,
  GET_LANDLORDS,
  LANDLORD_SEARCH_RESULTS,
  UPDATE_NO_RESULTS,
  SHOW_LOADER,
  SET_ERROR_STATE,
  RESET_SEARCH_LANDLORDS
}
