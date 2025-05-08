import { request } from '@/utils/request'

export function getContacts() {
  return request.get('/contacts')
}

export function addContact(data) {
  return request.post('/contacts', data)
}

export function deleteContact(name) {
  return request.delete(`/contacts/${name}`)
}

export function updateContact(name, data) {
  return request.put(`/contacts/${name}`, data)
}
