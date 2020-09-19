import { api } from '@/middleware/config'

const token = JSON.parse(localStorage.getItem('kodiAuthToken')) || {}
const role = token && token.user && token.user.role ? token.user.role : ''

/**
 * Reset all error messages
 * @method resetErrorMessages
 * @param  {Object} commit vuex mutations
 */
const resetErrorMessages = ({ commit }) => {
  commit('NATIONAL_ID_DUPLICATION_ERROR', false)
  commit('KRA_PIN_DUPLICATION_ERROR', false)
}

/**
 * Edit user profile details
 * @method editUserProfile
 * @param  {Object} payload object containing form data
 * @param  {Function} dispatch vuex actions
 * @param  {Object} commit vuex mutations
 */
const editUserProfile = async ({ commit, dispatch }, payload) => {
  if (role === 'landlord' || role === 'landlordTenant') {
    return dispatch('editLandlordProfile', payload)
  } else {
    return dispatch('editTenantProfile', payload)
  }
}

/**
 * Edit landlord/landlordTenant role profile details
 * @method editLandlordProfile
 * @param  {Object} payload object containing form data
 * @param  {Function} dispatch vuex actions
 * @param  {Object} commit vuex mutations
 */
const editLandlordProfile = async ({ commit, dispatch }, payload) => {
  dispatch('resetErrorMessages')
  commit('SHOW_LOADER', true)
  const url = '/api/landlords/profile/edit'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      if (role === 'landlordTenant') {
        return dispatch('editTenantProfile', payload)
      }
      commit('SHOW_LOADER', false)
      return response.data
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    if (err.response.status === 422) {
      if (err.response.data.Error === 'The following national ID already exists!') {
        commit('NATIONAL_ID_DUPLICATION_ERROR', true)
      } else if (err.response.data.Error === 'The following KRA Pin already exists!') {
        commit('KRA_PIN_DUPLICATION_ERROR', true)
      } else {
        commit('EMAIL_DUPLICATION_ERROR', true)
      }
    }
    throw new Error(err)
  }
}

/**
 * Edit tenant role profile details
 * @method editTenantProfile
 * @param  {Object} payload object containing form data
 * @param  {Function} dispatch vuex actions
 * @param  {Object} commit vuex mutations
 */
const editTenantProfile = async ({ commit, dispatch }, payload) => {
  dispatch('resetErrorMessages')
  commit('SHOW_LOADER', true)
  const url = '/api/tenants/profile/edit'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('SHOW_LOADER', false)
      return response.data
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    throw err.message
  }
}

/**
 * Change users password
 * @method changePassword
 * @param  {Object} payload object containing new password
 * @param  {Function} dispatch vuex actions
 * @param  {Object} commit vuex mutations
 */
const changePassword = async ({ commit, dispatch }, payload) => {
  commit('WRONG_CURRENT_PASSWORD', false)
  commit('CHANGE_PASSWORD_LOADER', true)
  const url = '/api/users/change/password'

  try {
    const response = await api.post(url, payload)
    if (response.status === 200) {
      commit('CHANGE_PASSWORD_LOADER', false)
      return response.data
    }
  } catch (err) {
    commit('CHANGE_PASSWORD_LOADER', false)
    commit('WRONG_CURRENT_PASSWORD', true)
    throw err.message
  }
}

export {
  editUserProfile,
  editLandlordProfile,
  editTenantProfile,
  changePassword,
  resetErrorMessages
}
