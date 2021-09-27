import { AppState } from '../AppState'
import { Post } from '../models/Post'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class PostsService {
  async getPosts(query = '') {
    AppState.posts = []
    const res = await api.get('api/posts' + convertToQuery(query))
    AppState.posts = res.data.posts.map(g => new Post(g))
    AppState.data.older = res.data.older
    AppState.data.newer = res.data.newer
    AppState.pd = res.data
    AppState.current = 1
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
    logger.log('likes', res.data.likes)
    const i = AppState.posts.findIndex(p => p.id === id)
    AppState.posts.splice(i, 1, new Post(res.data))
    AppState.posts = [...AppState.posts]
  }

  async getOld() {
    AppState.current--
    AppState.pd = {}
    AppState.posts = []
    const res = await api.get(`api/posts?page=${AppState.current}`)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getNew() {
    AppState.current++
    AppState.pd = {}
    AppState.posts = []
    const res = await api.get(`api/posts?page=${AppState.current}`)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const postsService = new PostsService()
