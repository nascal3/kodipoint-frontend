
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
const userIdDuplicationError = (state) => state.userIdDuplicationError

/**
 * Show error state of the user KRA Pin already exists/registered
 * @method kraPinDuplicationError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show error state
 */
const kraPinDuplicationError = (state) => state.kraPinDuplicationError

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

/**
 * Retrieve the details of the landlord that is selected
 * @method selectedLandlord
 * @param  {Object} state vuex state object
 * @return {Object} Contains details of the landlord that is selected
 */
const selectedLandlord = (state) => state.selectedLandlord

/**
 * Retrieve the approved Landlord state
 * @method approvedLandlord
 * @param  {Object} state vuex state object
 * @return {Boolean} Contains landlords  approved state
 */
const approvedLandlord = (state) => state.approvedLandlord

export {
  landlords,
  showLoader,
  landlordSearchResults,
  showErrorState,
  userIdDuplicationError,
  kraPinDuplicationError,
  noSearchResults,
  selectedLandlord,
  approvedLandlord
}
