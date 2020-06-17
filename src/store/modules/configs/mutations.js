
/**
 * Get logged in users information
 * @method LOGGEDIN_USER_INFO
 * @param  {Object} state vuex state object
 * @param  {Object} payload contains error state
 */
const LOGGEDIN_USER_INFO = (state, payload) => {
  state.loggedInUserInfo = payload
}

export {
  LOGGEDIN_USER_INFO
}
