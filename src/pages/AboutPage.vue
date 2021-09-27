<template>
  <div class="home d-flex flex-column align-items-center justify-content-center">
    <div class=" container">
      <div class="row ">
        <div class=" p-3">
          <h1>Here is some info on the icon!</h1>
        </div>
        <div class="Icon">
          <h3><div>Icons made by <a href="https://www.flaticon.com/authors/prettycons" title="prettycons">prettycons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></h3>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center pt-5">
    <Ad />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { adsService } from '../services/AdsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'

export default {
  name: 'AboutPage',
  setup() {
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {

      ad: computed(() => AppState.ads)

    }
  }
}
</script>
