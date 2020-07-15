/**
 * Show loader animation during loading process
 * @method showLoader
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show loader state
 */
const showLoader = (state) => state.showLoader

/**
 * Show loader animation during loading process
 * @method changePasswordLoader
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show loader state
 */
const changePasswordLoader = (state) => state.changePasswordLoader

/**
 * Set error to show wrong password state
 * @method wrongCurrentPasswordError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show error state
 */
const wrongCurrentPasswordError = (state) => state.wrongCurrentPasswordError

/**
 * Show user ID duplication error
 * @method userIdDuplicationError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show error state
 */
const userIdDuplicationError = (state) => state.userIdDuplicationError

/**
 * Show user KRA duplication error
 * @method kraPinDuplicationError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show error state
 */
const kraPinDuplicationError = (state) => state.kraPinDuplicationError

export {
  showLoader,
  changePasswordLoader,
  wrongCurrentPasswordError,
  userIdDuplicationError,
  kraPinDuplicationError
}
