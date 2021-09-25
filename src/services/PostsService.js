import { AppState } from '../AppState'
import { Post } from '../models/Post'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class PostsService {
  async getPosts(query = {}) {
    AppState.posts = []
    AppState.current = 1
    const res = await api.get('api/posts' + convertToQuery(query))
    AppState.posts = res.data.posts.map(g => new Post(g))
    AppState.postsData = res.data
    logger.log(res)
  }

  async findPostByQuery(query) {
    const res = await api.get(`api/posts/?query=${query}`)
    AppState.posts = res.data.posts.map(m => new Post(m))
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
    logger.log('searchPost', res)
    AppState.posts = res.data.posts.map(s => new Post(s))
  }

  async likePost(id) {
    const res = await api.post(`api/posts/${id}/like`)
    AppState.likes.filter((f) => f.like)
    await this.getPosts()
    logger.log('like post', res)
  }
}

export const postsService = new PostsService()
