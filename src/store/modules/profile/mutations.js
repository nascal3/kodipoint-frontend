
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
 * Set user national id duplication error state
 * @method NATIONAL_ID_DUPLICATION_ERROR
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains error state
 */
const NATIONAL_ID_DUPLICATION_ERROR = (state, payload) => {
  state.userIdDuplicationError = payload
}

/**
 * Set user KRA pin duplication error state
 * @method KRA_PIN_DUPLICATION_ERROR
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains error state
 */
const KRA_PIN_DUPLICATION_ERROR = (state, payload) => {
  state.kraPinDuplicationError = payload
}

export {
  SHOW_LOADER,
  NATIONAL_ID_DUPLICATION_ERROR,
  KRA_PIN_DUPLICATION_ERROR
}
