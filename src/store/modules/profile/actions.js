import { api } from '@/middleware/config'

/**
 * Edit user profile details
 * @method editUserProfile
 * @param  {Object} payload object containing form data
 * @param  {Object} commit vuex mutations
 */
const editUserProfile = async ({ commit }, payload) => {
  const tokenString = localStorage.getItem('kodiAuthToken')
  const token = JSON.parse(tokenString)
  const role = token.user.role
  commit('SHOW_LOADER', true)

  const url = {
    landlord: '/api/landlords/profile/edit',
    landlordTenant: '/api/landlords/single',
    tenant: '/api/tenants/profile/edit'
  }

  try {
    const response = await api.get(url[role])
    if (response.status === 200) {
      commit('LOGGEDIN_USER_INFO', response.data.results)
    }
  } catch (err) {
    commit('SHOW_LOADER', false)
    if (err.response.status === 422) {
      err.response.data.Error === 'The following Email/Username already exists!'
        ? commit('auth/USER_DUPLICATION_ERROR', true, { root: true })
        : commit('USER_ID_DUPLICATION_ERROR', true)
    }
    throw new Error(err)
  }
}

export {
  editUserProfile
}
