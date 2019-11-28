
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
 * Show no search results state
 * @method noSearchResults
 * @param  {Object} state vuex state object
 * @return {boolean} Contains no search results state
 */
const noSearchResults = (state) => state.noSearchResults

/**
 * Retrieve the landlords
 * @method landlords
 * @param  {Object} state vuex state object
 * @return {Array} Contains landlords
 */
const landlords = (state) => state.landlords

/**
 * Retrieve the searched properties
 * @method landlordSearchResults
 * @param  {Object} state vuex state object
 * @return {Array} Contains properties
 */
const landlordSearchResults = (state) => state.landlordSearchResults

export {
  landlords,
  showLoader,
  landlordSearchResults,
  showErrorState,
  noSearchResults
}
