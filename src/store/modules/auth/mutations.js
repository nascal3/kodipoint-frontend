/**
 * Updates the token
 * @method UPDATE_TOKEN
 * @param  {Object} state vuex state object
 * @param  {Object} payload values to update
 */
const UPDATE_TOKEN = (state, payload) => {
  localStorage.setItem('kodiAuthToken', JSON.stringify(payload))
  state.token = payload
  state.user = payload.user
}

/**
 * Set loggedIn state
 * @method SET_LOGGEDIN_STATUS
 * @param  {Object} state vuex state object
 * @param  {Object} payload values of loggedIn status
 */
const SET_LOGGEDIN_STATUS = (state, payload) => {
  localStorage.setItem('loggedIn', JSON.stringify(payload))
  state.loggedIn = payload
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
 * Set error state of the auth process
 * @method SET_ERROR_STATE
 * @param  {Object} state vuex state object
 * @param  {boolean} payload state of error
 */
const SET_ERROR_STATE = (state, payload) => {
  state.authError = payload
}

/**
 * Set error state of the user already exists/registered
 * @method USER_DUPLICATION_ERROR
 * @param  {Object} state vuex state object
 * @param  {boolean} payload state of error
 */
const USER_DUPLICATION_ERROR = (state, payload) => {
  state.userDuplicationError = payload
}

/**
 * Set error state of the user email already exists/registered
 * @method USER_EMAIL_DUPLICATION_ERROR
 * @param  {Object} state vuex state object
 * @param  {boolean} payload state of error
 */
const USER_EMAIL_DUPLICATION_ERROR = (state, payload) => {
  state.authEmailDuplicationError = payload
}

/**
 * Get single user by ID
 * @method SINGLE_USER
 * @param  {Object} state vuex state object
 * @param  {Object} payload Contains users info
 */
const SINGLE_USER = (state, payload) => {
  state.singleUser = payload
}

/**
 * Clear single user result
 * @method CLEAR_SINGLE_USER
 * @param  {Object} state vuex state object
 */
const CLEAR_SINGLE_USER = (state) => {
  state.singleUser = []
}

/**
 * Remove the token
 * @method UPDATE_TOKEN
 * @param  {Object} state vuex state object
 */
const REMOVE_TOKEN = (state) => {
  state.token = null
  localStorage.clear()
}

export {
  UPDATE_TOKEN,
  SET_LOGGEDIN_STATUS,
  SET_ERROR_STATE,
  USER_DUPLICATION_ERROR,
  USER_EMAIL_DUPLICATION_ERROR,
  SHOW_LOADER,
  SINGLE_USER,
  CLEAR_SINGLE_USER,
  REMOVE_TOKEN
}
