
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

export {
  SHOW_LOADER,
  SET_ERROR_STATE
}
