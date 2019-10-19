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
 * Remove the token
 * @method UPDATE_TOKEN
 * @param  {Object} state vuex state object
 */
const REMOVE_TOKEN = (state) => {
  state.token = null
  localStorage.removeItem('kodiAuthToken')
  localStorage.removeItem('loggedIn')
}

export {
  UPDATE_TOKEN,
  SET_LOGGEDIN_STATUS,
  SET_ERROR_STATE,
  SHOW_LOADER,
  REMOVE_TOKEN
}
