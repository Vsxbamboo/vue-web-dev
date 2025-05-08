// src/utils/request.js
import axios from 'axios'

const baseURL = 'http://localhost:8081'

// 创建 axios 实例
const request = axios.create({
  baseURL: baseURL,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 如果有 token 就带上（假设保存在 localStorage 中）
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('请求出错：', error)
    return Promise.reject(error)
  },
)

export { request, baseURL }
