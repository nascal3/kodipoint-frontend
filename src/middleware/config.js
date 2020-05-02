import axios from 'axios'
import * as interceptor from './interceptors'

/**
 * headers configs for requests
 * @type Object
 */
const commonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const api = axios.create({
  // baseURL: 'https://kodiend.com',
  baseURL: process.env.BASE_URL,
  headers: commonHeaders
})

interceptor.addRequestInterceptor(api)
interceptor.addResponseInterceptor(api)

export {
  api
}
