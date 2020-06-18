/**
 * Show loader animation during loading process
 * @method showLoader
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show loader state
 */
const showLoader = (state) => state.showLoader

/**
 * Show error state
 * @method showErrorState
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show error state
 */
const showErrorState = (state) => state.errorState

export {
  showLoader,
  showErrorState
}
