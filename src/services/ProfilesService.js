import { AppState } from '../AppState'
import { Post } from '../models/Post'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.profile = res.data
  }

  async getOld(id) {
    AppState.current--
    AppState.pd = {}
    AppState.posts = []
    const res = await api.get(`api/posts/?creatorId=${id}&page=${AppState.current}`)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getNew(id) {
    AppState.current++
    AppState.pd = {}
    AppState.posts = []
    const res = await api.get(`api/posts/?creatorId=${id}&page=${AppState.current}`)
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const profilesService = new ProfilesService()
