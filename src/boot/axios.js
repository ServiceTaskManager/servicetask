import axios from 'axios'

export default async ({ Vue }) => {
  axios.defaults.baseURL = 'http://192.168.1.35:3000/api/'
  Vue.prototype.$axios = axios
}
