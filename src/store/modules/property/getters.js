
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
 * Retrieve the properties
 * @method properties
 * @param  {Object} state vuex state object
 * @return {Array} Contains properties
 */
const properties = (state) => state.properties

/**
 * Retrieve the searched properties
 * @method propertySearchResults
 * @param  {Object} state vuex state object
 * @return {Array} Contains properties
 */
const propertySearchResults = (state) => state.propertySearchResults

export {
  properties,
  showLoader,
  propertySearchResults,
  showErrorState,
  noSearchResults
}
