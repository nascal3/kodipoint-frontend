/**
 * Reset tenants fetched
 * @method RESET_TENANTS
 * @param  {Object} state vuex state object
 */
const RESET_TENANTS = (state) => {
  state.tenants = []
}

/**
 * Reset/clear selected tenant details fetched
 * @method RESET_SELECTED_TENANT
 * @param  {Object} state vuex state object
 */
const RESET_SELECTED_TENANT = (state) => {
  state.selectedTenant = []
}

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
 * Sets no tenant results search state
 * @method UPDATE_NO_RESULTS
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains no results state
 */
const UPDATE_NO_RESULTS = (state, payload) => {
  state.noSearchResults = payload
}

/**
 * Set error state properties
 * @method SET_ERROR_STATE
 * @param  {Object} state vuex state object
 * @param  {Boolean} payload contains error state
 */
const SET_ERROR_STATE = (state, payload) => {
  state.errorState = payload
}

/**
 * Set error state of the user national ID/KRA Pin already exists/registered
 * @method TENANT_ID_DUPLICATION_ERROR
 * @param  {Object} state vuex state object
 * @param  {boolean} payload state of error
 */
const TENANT_ID_DUPLICATION_ERROR = (state, payload) => {
  state.userIdDuplicationError = payload
}

/**
 * Reset tenant search results
 * @method RESET_SEARCH_TENANTS
 * @param  {Object} state vuex state object
 */
const RESET_SEARCH_TENANTS = (state) => {
  state.tenantSearchResults = []
}

/**
 * Fetch all tenants
 * @method GET_ALL_TENANTS
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains tenants
 */
const GET_ALL_TENANTS = (state, payload) => {
  state.tenants = payload
}

/**
 * Fetch tenants search results
 * @method TENANT_SEARCH_RESULTS
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains properties
 */
const TENANT_SEARCH_RESULTS = (state, payload) => {
  state.tenantSearchResults = payload
}

/**
 * Set the tenant details that has been selected for viewing
 * @method SET_SELECTED_TENANT
 * @param  {Object} state vuex state object
 * @param  {Array} payload contains tenant details
 */
const SET_SELECTED_TENANT = (state, payload) => {
  state.selectedTenant = payload
}

export {
  RESET_TENANTS,
  RESET_SELECTED_TENANT,
  GET_ALL_TENANTS,
  TENANT_SEARCH_RESULTS,
  UPDATE_NO_RESULTS,
  SHOW_LOADER,
  SET_ERROR_STATE,
  TENANT_ID_DUPLICATION_ERROR,
  RESET_SEARCH_TENANTS,
  SET_SELECTED_TENANT
}