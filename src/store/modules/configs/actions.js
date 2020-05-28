import { api } from '@/middleware/config'

/**
 * Get details of the logged in user
 * @method getLoggedInUserInfo
 * @param  {Object} commit vuex mutations
 */
const getLoggedInUserInfo = async ({ commit }) => {
  const tokenString = localStorage.getItem('kodiAuthToken')
  const token = JSON.parse(tokenString)
  const role = token.user.role

  const url = {
    landlord: '/api/landlords/single',
    landlordTenant: '/api/landlords/single',
    tenant: '/api/tenants/single',
    admin: `/api/users/user/${token.user.id}`,
    superU: `/api/users/user/${token.user.id}`
  }

  try {
    const response = await api.get(url[role])
    if (response.status === 200) {
      commit('LOGGEDIN_USER_INFO', response.data.results)
    }
  } catch (err) {
    throw new Error(err)
  }
}

export {
  getLoggedInUserInfo
}
