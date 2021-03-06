import { AppState } from '../AppState'
import { Post } from '../models/Post'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class PostsService {
  async getPosts(query = '') {
    AppState.posts = []
    AppState.current = 1
    const res = await api.get('api/posts' + convertToQuery(query))
    AppState.pd = res.data
    AppState.posts = res.data.posts.map(g => new Post(g))
    AppState.data.older = res.data.older
    AppState.data.newer = res.data.newer
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.unshift(new Post(res.data))
  }

  async deletePost(postId) {
    await api.delete('api/posts/' + postId)
    AppState.posts = AppState.posts.filter(b => b.id !== postId)
  }

  async searchPosts(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    AppState.total = res.data.total_pages
    AppState.current = res.data.page
    AppState.posts = res.data.posts.map(s => new Post(s))
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    const i = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(i, 1, new Post(res.data))
    AppState.posts = [...AppState.posts]
  }

  async getOld() {
    AppState.current--
    AppState.posts = []
    AppState.pd = {}
    const res = await api.get(`api/posts?page=${AppState.current}`)
    AppState.pd = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getNew() {
    AppState.current++
    AppState.posts = []
    AppState.pd = {}
    const res = await api.get(`api/posts?page=${AppState.current}`)
    AppState.pd = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const postsService = new PostsService()
