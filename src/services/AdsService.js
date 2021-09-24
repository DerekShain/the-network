import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AdsService {
  async getAds() {
    try {
      const res = await api.get('/api/ads')
      AppState.ads = res.data
      logger.log(res)
    } catch (err) {
      logger.error('Ads Error', err)
    }
  }
}

export const adsService = new AdsService()
