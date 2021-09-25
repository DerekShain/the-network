<template>
  <div class="home d-flex flex-column align-items-center justify-content-center">
    <div class="container-flex row">
      <div class="col-md-2 col-sm">
        <Profile v-for="a in profiles" :key="a.id" :profile="a" />
      </div>
      <div class="col-md-4 col-sm">
        <Post v-for="p in posts" :key="p.id" :post="p" />
      </div>
      <div class="col-md-4 col-sm">
        <Ad v-for="a in ad" :key="a.id" :ad="a" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { adsService } from '../services/AdsService'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
export default {

  setup() {
    const route = useRoute()
    async function getPosts() {
      try {
        await postsService.getPosts({ creatorId: route.params.id })
      } catch (error) {
        Pop.toast(error, 'error')
      }
    }
    watchEffect(async() => {
      if (route.params.id) {
        await profilesService.getProfileById(route.params.id)
        getPosts()
        await adsService.getAds()
      }
    })
    return {
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ad: computed(() => AppState.ads),
      profile: computed(() => AppState.profiles)
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
