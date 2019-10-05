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
  if (localStorage.getItem('kodiAuthToken')) {
    next({ name: 'summary' })
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
  const status = JSON.parse(loggedIn)
  if (status) {
    next()
    return
  }
  next({ name: 'login' })
}

export {
  checkToken,
  checkAuth
}