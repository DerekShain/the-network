<template>
  <div class="home d-flex flex-column align-items-center justify-content-center">
    <div class=" container-flex row">
      <div class="col ">
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="col">
        <Ad v-for="a in ad" :key="a.id" :ad="a" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { adsService } from '../services/AdsService'
import { AppState } from '../AppState'
// import { profilesService } from '../services/ProfilesService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPosts()
        // await profilesService.getProfileById()
        await adsService.getAds()
        // await postsService.likePost()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts),
      // profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      ad: computed(() => AppState.ads),
      like: computed(() => AppState.likes)
    }
  }
}
</script>

<style scoped lang="scss">

.sidebar{
  height: 100vh;
  position: fixed;
}
</style>
