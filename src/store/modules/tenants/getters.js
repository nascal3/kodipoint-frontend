
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
 * Show error state of the user national ID/KRA Pin already exists/registered
 * @method userIdDuplicationError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show error state
 */
const tenantIdDuplicationError = (state) => state.tenantIdDuplicationError

/**
 * Show no search results state
 * @method noSearchResults
 * @param  {Object} state vuex state object
 * @return {boolean} Contains no search results state
 */
const noSearchResults = (state) => state.noSearchResults

/**
 * Retrieve the tenants
 * @method tenants
 * @param  {Object} state vuex state object
 * @return {Array} Contains tenants
 */
const tenants = (state) => state.tenants

/**
 * Retrieve the searched tenants
 * @method tenantsSearchResults
 * @param  {Object} state vuex state object
 * @return {Array} Contains searched tenants results
 */
const tenantSearchResults = (state) => state.tenantSearchResults

/**
 * Retrieve the details of the tenant that is selected
 * @method selectedTenant
 * @param  {Object} state vuex state object
 * @return {Object} Contains details of the tenant that is selected
 */
const selectedTenant = (state) => state.selectedTenant

export {
  tenants,
  showLoader,
  tenantSearchResults,
  showErrorState,
  tenantIdDuplicationError,
  noSearchResults,
  selectedTenant
}
