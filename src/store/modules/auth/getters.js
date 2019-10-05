/**
 * Retrieve the token saved as in localstorage
 * @method token
 * @param  {Object} state vuex state object
 * @return {Object} Contains the access token, token type, expiry of token etc
 */
const token = (state) => state.token

/**
 * Show loader animation during auth process
 * @method showLoader
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the show loader state
 */
const showLoader = (state) => state.showLoader

/**
 * Retrieve the error state of the auth process
 * @method authError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the error state of the auth process
 */
const authError = (state) => state.authError

/**
  * Retrieve the logged in status of user
* @method loggedIn
* @param  {Object} state vuex state object
* @return {Object} Contains the successful loggedIn status of the user
*/
const loggedIn = (state) => state.loggedIn

export {
  token,
  authError,
  showLoader,
  loggedIn
}