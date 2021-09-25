import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class ProfilesService {
  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    logger.log('profile res', res)
    AppState.profile = res.data
  }
}

export const profilesService = new ProfilesService()
