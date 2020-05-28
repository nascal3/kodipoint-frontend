/**
 * Retrieve the set page limit size
 * @method setPageSize
 * @param  {Object} state vuex state object
 * @return {Object} Contains the set page limit size
 */
const setPageSize = (state) => state.pageSize

/**
 * Retrieve logged In User Info
 * @method loggedInUserInfo
 * @param  {Object} state vuex state object
 * @return {Object} Contains the set page limit size
 */
const loggedInUserInfo = (state) => state.loggedInUserInfo

export {
  setPageSize,
  loggedInUserInfo
}
