
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
 * Set show loader state
 * @method CHANGE_PASSWORD_LOADER
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload values of auth state
 */
const CHANGE_PASSWORD_LOADER = (state, payload) => {
  state.changePasswordLoader = payload
}

/**
 * Set error to show wrong password state
 * @method WRONG_CURRENT_PASSWORD
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload values of auth state
 */
const WRONG_CURRENT_PASSWORD = (state, payload) => {
  state.wrongCurrentPasswordError = payload
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
  CHANGE_PASSWORD_LOADER,
  WRONG_CURRENT_PASSWORD,
  NATIONAL_ID_DUPLICATION_ERROR,
  KRA_PIN_DUPLICATION_ERROR
}
