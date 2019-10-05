const token = localStorage.getItem('kodiAuthToken')
const status = localStorage.getItem('loggedIn')

const state = {
  token: JSON.parse(token) || {},
  showLoader: false,
  authError: false,
  loggedIn: JSON.parse(status) || false
}

export default state
