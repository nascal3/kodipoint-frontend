/**
 * reset properties fetched
 * @method RESET_PROPERTIES
 * @param  {Object} state vuex state object
 */
const RESET_PROPERTIES = (state) => {
  state.properties = []
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
 * Show Property tenants table modal
 * @method SHOW_PROPERTY_TENANTS
 * @param  {Object} state vuex state object
 * @param  {String} payload values of show state
 */
const SHOW_PROPERTY_TENANTS = (state, payload) => {
  state.showPropertyTenants = payload
}

/**
 * Set tenants living in selected Property
 * @method PROPERTY_TENANTS
 * @param  {Object} state vuex state object
 * @param  {Array} payload values of show state
 */
const PROPERTY_TENANTS = (state, payload) => {
  state.propertyTenants = payload
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
 * Reset properties search results
 * @method RESET_SEARCH_PROPERTIES
 * @param  {Object} state vuex state object
 */
const RESET_SEARCH_PROPERTIES = (state) => {
  state.propertySearchResults = []
}

/**
 * Fetch properties
 * @method GET_PROPERTIES
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains properties
 */
const GET_PROPERTIES = (state, payload) => {
  state.properties = payload
}

/**
 * Fetch all properties
 * @method GET_ALL_PROPERTIES
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains properties
 */
const GET_ALL_PROPERTIES = (state, payload) => {
  state.properties = payload
}

/**
 * Fetch properties search results
 * @method PROPERTY_SEARCH_RESULTS
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains properties
 */
const PROPERTY_SEARCH_RESULTS = (state, payload) => {
  state.propertySearchResults = payload
}

/**
 * Set error state for duplicate LR number
 * @method LR_NUMBER_DUPLICATION_ERROR
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains error state
 */
const LR_NUMBER_DUPLICATION_ERROR = (state, payload) => {
  state.lrNumberDuplicationError = payload
}

export {
  RESET_PROPERTIES,
  GET_PROPERTIES,
  GET_ALL_PROPERTIES,
  PROPERTY_SEARCH_RESULTS,
  UPDATE_NO_RESULTS,
  SHOW_LOADER,
  SHOW_PROPERTY_TENANTS,
  PROPERTY_TENANTS,
  SET_ERROR_STATE,
  RESET_SEARCH_PROPERTIES,
  LR_NUMBER_DUPLICATION_ERROR
}
