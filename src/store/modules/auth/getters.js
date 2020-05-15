/**
 * Retrieve the token saved as in localstorage
 * @method token
 * @param  {Object} state vuex state object
 * @return {Object} Contains the access token, token type, expiry of token etc
 */
const token = (state) => state.token

/**
 * Retrieve the token saved as in localstorage
 * @method user
 * @param  {Object} state vuex state object
 * @return {Object} Contains the access user info etc
 */
const user = (state) => state.user

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
 * Retrieve the error state of the email duplication registration process
 * @method authEmailError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the error state of registration duplicate email
 */
const authEmailDuplicationError = (state) => state.authEmailDuplicationError

/**
 * Retrieve the error state of duplication of email during registration
 * @method userDuplicationError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the error state of duplication of email during registration
 */
const userDuplicationError = (state) => state.userDuplicationError

/**
 * Retrieve single user by ID
 * @method singleUser
 * @param  {Object} state vuex state object
 * @return {Object} Contains users info
 */
const singleUser = (state) => state.singleUser

/**
  * Retrieve the logged in status of user
* @method loggedIn
* @param  {Object} state vuex state object
* @return {Object} Contains the successful loggedIn status of the user
*/
const loggedIn = (state) => state.loggedIn

export {
  token,
  user,
  authError,
  authEmailDuplicationError,
  userDuplicationError,
  showLoader,
  singleUser,
  loggedIn
}
