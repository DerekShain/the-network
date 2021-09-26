<template>
  <div class="row m-0 p-0">
    <div class="col-md-6 " v-if="ads[0] !=null">
      <img :src="ads[0].banner" class="img-fluid" alt="">
    </div>
    <div class="col-md-6 " v-if="ads[0] !=null">
      <img :src="ads[1].banner" class="img-fluid" alt="">
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { adsService } from '../services/AdsService'
export default {
  name: 'Ads',
  setup() {
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.toast(error.message, 'error')
      }
    })
    return {
      ads: computed(() => AppState.ads)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
