import store from '@/store'

/**
 * Add request interceptor to axios
 * @method addRequestInterceptor
 * @param  {Object} api axios base configs
 */
const addRequestInterceptor = (api) => {
  return api.interceptors.request.use((config) => {
    const tokenVals = localStorage.getItem('businessAuthToken')
    const tokenObj = JSON.parse(tokenVals)
    if (tokenObj) {
      config.headers = {
        'Authorization': `Bearer: ${tokenObj.access_token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
  )
}

/**
 * Add response interceptor to axios
 * @method addResponseInterceptor
 * @param  {Object} api axios base configs
 */
const addResponseInterceptor = (api) => {
  const tokenVals = localStorage.getItem('businessAuthToken')
  const tokenObj = JSON.parse(tokenVals)
  return api.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (tokenObj && error.response && error.response.status === 401) {
      store.dispatch('auth/removeToken')
      window.location.reload()
    }
    return Promise.reject(error)
  })
}

export {
  addRequestInterceptor,
  addResponseInterceptor
}
