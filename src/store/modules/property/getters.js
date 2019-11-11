
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

/**
 * Retrieve the properties
 * @method properties
 * @param  {Object} state vuex state object
 * @return {Array} Contains properties
 */
const properties = (state) => state.properties

export {
  properties,
  showLoader,
  showErrorState
}
