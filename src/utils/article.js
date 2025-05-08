import { request } from '@/utils/request'

export function getArticleCounts() {
  return request.get('/articles')
}

export function getArticlesByAuthor(author) {
  return request.get(`/articles/${author}`)
}

export function addArticle(data) {
  return request.post('/articles', data)
}

export function updateArticle(id, data) {
  return request.put(`/articles/${id}`, data)
}

export function deleteArticle(id) {
  return request.delete(`/articles/${id}`)
}
