import { api } from '@/middleware/config'

/**
 * Update the token in the localStorage
 * @method setToken
 * @param  {Object} commit vuex mutations
 * @param  {Object} state vuex state object
 * @param  {Object} payload token values to update
 */
const setToken = ({ commit, state }, payload) => {
  commit('UPDATE_TOKEN', payload)
  commit('SET_LOGGEDIN_STATUS', true)
}

/**
 * register new user
 * @method createUser
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload values of email, role, name and password
 */
const createUser = async ({ commit, dispatch }, payload) => {
  const url = '/api/users/register'
  commit('SHOW_LOADER', true)
  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      dispatch('setToken', response.data)
      commit('SET_ERROR_STATE', false)
      commit('SHOW_LOADER', false)
      return response.data
    }
  } catch (err) {
    if (err.response.status === 422) {
      commit('USER_EMAIL_DUPLICATION_ERROR', true)
    }
    commit('SHOW_LOADER', false)
  }
}

/**
 * login user
 * @method login
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload values of email and password
 */
const login = async ({ commit, dispatch }, payload) => {
  const url = '/api/users/login'
  commit('SHOW_LOADER', true)
  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      dispatch('setToken', response.data)
      commit('SET_ERROR_STATE', false)
      commit('SHOW_LOADER', false)
    }
  } catch (err) {
    commit('SET_ERROR_STATE', true)
    commit('SHOW_LOADER', false)
  }
}

/**
 * login user with google Auth
 * @method loginGoogleAuth
 * @param  {Object} commit vuex mutations
 * @param  {Function} dispatch vuex actions
 * @param  {Object} payload values of email and password
 */
const loginGoogleAuth = async ({ commit, dispatch }, payload) => {
  const url = '/api/google/auth'
  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      dispatch('setToken', response.data)
      commit('SET_GOOGLE_AUTH_ERROR_STATE', false)
      commit('SET_ERROR_STATE', false)
      commit('SHOW_LOADER', false)
    }
  } catch (err) {
    commit('SET_GOOGLE_AUTH_ERROR_STATE', true)
  }
}

/**
 * register new user via google auth
 * @method createGoogleUser
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload values of email, role, name and imageUrl
 */
const createGoogleUser = async ({ commit, dispatch }, payload) => {
  commit('USER_GMAIL_DUPLICATION_ERROR', false)
  const url = '/api/google/register'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      dispatch('setToken', response.data)
      commit('SET_ERROR_STATE', false)
      return response.data
    }
  } catch (err) {
    if (err.response.status === 422) {
      commit('USER_GMAIL_DUPLICATION_ERROR', true)
    } else {
      commit('REGISTRATION_ERROR', true)
    }
  }
}

/**
 * Get single user by ID
 * @method singleUser
 * @param  {Object} commit vuex mutations
 * @param  {Object} payload values of users ID
 */
const singleUser = async ({ commit }, payload) => {
  const url = `/api/users/user/${payload}`

  try {
    const response = await api.get(url)
    if (response.status === 200) {
      commit('SINGLE_USER', response.data.results)
    }
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Update the user password
 * @method passwordUpdate
 * @param  {Object} commit vuex mutations
 * @param  {Object} dispatch vuex actions
 * @param  {Object} payload values of email and password
 */
const passwordUpdate = async ({ commit, dispatch }, payload) => {
  const url = '/api/user/changepassword'
  commit('SHOW_LOADER', true)
  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('SET_ERROR_STATE', false)
      commit('SHOW_LOADER', false)
    }
  } catch (err) {
    console.log(err)
    commit('SET_ERROR_STATE', true)
    commit('SHOW_LOADER', false)
  }
}

/**
 * Remove the token in the localStorage
 * @method removeToken
 * @param  {Object} commit vuex mutations
 */
const removeToken = ({ commit }) => {
  commit('SET_LOGGEDIN_STATUS', false)
  commit('SET_ERROR_STATE', false)
  commit('REMOVE_TOKEN')
}

export {
  login,
  loginGoogleAuth,
  setToken,
  singleUser,
  createUser,
  createGoogleUser,
  passwordUpdate,
  removeToken
}
