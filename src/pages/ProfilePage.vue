<template>
  <div class="d-flex  flex-column align-items-center justify-content-center p-2" v-if="profile">
    <ProfileCard />
    <div class="d-flex cardsSpace">
      <Post v-for="p in posts" :key="p.id" :post="p" class="p-2" />
    </div>
    <div class="col-12 d-flex justify-content-around m-2">
      <button class="btn btn-secondary" @click="getOld('?'+pd.newer)" v-if="pd.newer">
        Previous
      </button>
      <div class="" v-if="!pd.newer"></div>
      <div class="text-muted text-dark">
        {{ pd.page }}
      </div>
      <div class="" v-if="!pd.older"></div>
      <button class="btn btn-secondary" @click="getNew('?'+pd.older)" v-if="pd.older">
        Next
      </button>
    </div>
    <div class="row justify-content-center">
      <Ad />
    </div>
  </div>

  <div class="row p-5 m-5" v-else>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
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
      posts: computed(() => AppState.posts),
      pd: computed(() => AppState.pd),
      async getOld() {
        try {
          await profilesService.getOld(route.params.id)
        } catch (error) {
          Pop.toast('error', error)
        }
      },
      async getNew() {
        try {
          await profilesService.getNew(route.params.id)
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.cardsSpace{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
