<template>
  <div class="home d-flex flex-column align-items-center justify-content-center" v-cloak>
    <div class="card mb-3" style="max-width: 540px;">
      <img :src="profile.coverImg" class="card-img">
      <div class="row g-0 card-img-overlay">
        <div class="col-md-4">
          <img :src="profile.picture" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ profile.name }}
            </h5>
            <div class="" v-if="profile.graduated == true">
              <i class="mdi mdi-school f-20 " title="Alumni"></i>
            </div>
            <div class="" v-else>
              <i class="mdi mdi-chair-school f-20 " title="Still Learning"></i>
            </div>
            <p class="card-text">
              {{ profile.bio }}<br />
              Class - {{ profile.class }}
            </p>
            <p class="card-text">
              <a :href="profile.github"><i class="mdi mdi-github f-20 selectable"></i></a>
              <a :href="profile.linkedin"><i class="mdi mdi-linkedin f-20 selectable"></i></a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-flex row">
      <div class="col-md-2 col-sm">
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
    const profile = computed(() => AppState.profile)
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
      profile,
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ad: computed(() => AppState.ads)
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
