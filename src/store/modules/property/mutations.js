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
 * Set error state properties
 * @method SET_ERROR_STATE
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains error state
 */
const SET_ERROR_STATE = (state, payload) => {
  state.errorState = payload
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

export {
  RESET_PROPERTIES,
  GET_PROPERTIES,
  SHOW_LOADER,
  SET_ERROR_STATE
}
