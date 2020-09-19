const token = localStorage.getItem('kodiAuthToken')
const userInfo = token ? JSON.parse(token) : {}
const status = localStorage.getItem('loggedIn')

const state = {
  token: JSON.parse(token) || null,
  user: userInfo.user,
  showLoader: false,
  authError: false,
  authGoogleError: false,
  authEmailDuplicationError: false,
  authGmailDuplicationError: false,
  registrationError: false,
  singleUser: {},
  loggedIn: JSON.parse(status) || false,
  userDuplicationError: false
}

export default state
