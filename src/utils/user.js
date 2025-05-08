import { request } from '@/utils/request'

export function login(data) {
  return request.post('/auth/login', data)
}

export function register(data) {
  return request.post('/users', data)
}

export function getUserInfo() {
  return request.get('/users')
}

export function getUserInfoByUsername(username) {
  return request.get(`/users/${username}`)
}

export function updatePassword(data) {
  return request.put('/users', data)
}
