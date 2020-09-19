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
 * Retrieve the error state of the google auth process
 * @method authGoogleError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the error state of the google auth process
 */
const authGoogleError = (state) => state.authGoogleError

/**
 * Retrieve the error state of the email duplication registration process
 * @method authEmailError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the error state of registration duplicate email
 */
const authEmailDuplicationError = (state) => state.authEmailDuplicationError

/**
 * Retrieve the error state of the gmail duplication registration process
 * @method authGmailError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the error state of registration duplicate email
 */
const authGmailDuplicationError = (state) => state.authGmailDuplicationError

/**
 * Retrieve the error state of the registration process
 * @method registrationError
 * @param  {Object} state vuex state object
 * @return {boolean} Contains the error state of registration duplicate email
 */
const registrationError = (state) => state.registrationError

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
  authGoogleError,
  authEmailDuplicationError,
  authGmailDuplicationError,
  registrationError,
  userDuplicationError,
  showLoader,
  singleUser,
  loggedIn
}
