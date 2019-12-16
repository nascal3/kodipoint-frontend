/**
 * Checks for the role and redirect user to according to role/permissions
 * @method redirectPage
 * @param  {string} role of the user logged in
 * @return {Object} page to redirect user to according to role/permissions
 */
const redirectPage = (role) => {
  if (!role) return { name: 'error' }
  if (role === 'admin') {
    return { name: 'landlords' }
  } else if (role === 'landlord' || role === 'landlord/tenant') {
    return { name: 'properties' }
  } else if (role === 'tenant') {
    return { name: 'summary' }
  }
}

/**
 * Checks if the token exists in the local localStorage
 * @method checkToken
 * @param  {Object} to target route being navigated to
 * @param  {Object} from the current route being navigated from
 * @param  {Function} next this function is called to resolve the hook. \
 * The action depends on the arguments provided to
 * @return {void}
 */
const checkToken = (to, from, next) => {
  const token = localStorage.getItem('kodiAuthToken')
  if (token) {
    const role = JSON.parse(token).user.role
    const page = redirectPage(role)
    next(page)
    return
  }
  next()
}

/**
 * Checks if the token exists in the local localStorage
 * @method checkAuth
 * @param  {Object} to target route being navigated to
 * @param  {Object} from the current route being navigated from
 * @param  {Function} next this function is called to resolve the hook. \
 * The action depends on the arguments provided to
 * @return {void}
 */
const checkAuth = (to, from, next) => {
  const loggedIn = localStorage.getItem('loggedIn')
  const token = localStorage.getItem('kodiAuthToken')
  const status = JSON.parse(loggedIn)
  if (status && token) {
    next()
    return
  }
  next({ name: 'login' })
}

export {
  checkToken,
  checkAuth,
  redirectPage
}
