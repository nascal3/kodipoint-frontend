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
 * Update the token in the localStorage
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
  setToken,
  singleUser,
  passwordUpdate,
  removeToken
}
