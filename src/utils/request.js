import axios from 'axios'
import Vue from 'vue'
import store from '../store/index'

const service = axios.create({
  baseURL: '',
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    let token = store.state.token.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {

  }
)

service.interceptors.response.use(
  response => {
    let responseJson = response.data
    return response
  },
  error => {
    let message
    switch (error.response.status) {
      case 401:
        message = 'Token错误'
        break
      default:
        message = error.response.data.message
        break
    }
    Vue.prototype.$message({
      message: message,
      type: 'error'
    })
    return Promise.reject('error')
  }
)

export default service
