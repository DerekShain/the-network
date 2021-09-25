import { AppState } from '../AppState'
import { Post } from '../models/Post'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    const res = await api.get('api/posts' + convertToQuery(query))
    AppState.posts = res.data.posts.map(g => new Post(g))
    logger.log(res)
  }

  async createPost(newPost) {
    const res = await api.post('api/posts', newPost)
    AppState.posts.unshift(new Post(res.data))
    logger.log(res)
  }

  async deletePost(postId) {
    const res = await api.delete('api/posts/' + postId)
    logger.log(res)
    AppState.posts = AppState.posts.filter(b => b.id !== postId)
  }

  async searchPosts(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    logger.log('searchPost', res)
    AppState.posts = res.data.posts.map(s => new Post(s))
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    AppState.likes.filter((f) => f.like)
    await this.getPosts()
    logger.log(res)
  }

  async getNew() {
    AppState.posts = []
    AppState.postsData = {}
    AppState.current--
    const res = await api.get(`api/posts?page=${AppState.current}`)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getOld() {
    AppState.posts = []
    AppState.postsData = {}
    AppState.current++
    const res = await api.get(`api/posts?page=${AppState.current}`)
    AppState.postsData = res.data
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const postsService = new PostsService()
