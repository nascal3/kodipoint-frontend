
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
 * Show state for duplication of moving in record error
 * @method moveInDuplicationError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show error state
 */
const moveInDuplicationError = (state) => state.moveInDuplicationError

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

/**
 * Show tenant management dialog
 * @method showManageTenantDialog
 * @param  {Object} state vuex state object
 * @return {Object} Contains state of close or open dialog
 */
const showManageTenantDialog = (state) => state.showManageTenantDialog

/**
 * Show tenant rental records that has been selected for viewing
 * @method tenantRentalRecords
 * @param  {Object} state vuex state object
 * @return {Object} Contains state of close or open dialog
 */
const tenantRentalRecords = (state) => state.tenantRentalRecords

/**
 * Show error state for house not vacant being moved into
 * @method noVacancyError
 * @param  {Object} state vuex state object
 * @return {Object} Contains state of error
 */
const noVacancyError = (state) => state.noVacancyError

/**
 * Set tenants list type to show
 * @method tenantsListType
 * @param  {Object} state vuex state object
 * @return {String} Contains type of tenant list
 */
const tenantsListType = (state) => state.tenantsListType

export {
  tenants,
  showLoader,
  tenantSearchResults,
  showErrorState,
  tenantIdDuplicationError,
  moveInDuplicationError,
  noSearchResults,
  selectedTenant,
  showManageTenantDialog,
  tenantRentalRecords,
  noVacancyError,
  tenantsListType
}
