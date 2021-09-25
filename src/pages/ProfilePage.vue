<template>
  <div class=" d-flex  flex-column align-items-center justify-content-center" v-if="profile">
    <div class="card mb-3 shadow-lg text-light tshadow" style="max-width: 540px;">
      <img :src="profile.coverImg" class="card-img ">
      <div class="row g-0 card-img-overlay">
        <div class="col-md-4">
          <img :src="profile.picture" class="img-fluid rounded-start shadow" alt="...">
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
      </div>
      <div class="col-md-4 col-sm">
        <Ad v-for="a in ad" :key="a.id" :ad="a" />
      </div>
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
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ad: computed(() => AppState.ads),
      data: computed(() => AppState.data),
      pd: computed(() => AppState.pd),
      async getOld() {
        try {
          await postsService.getOld()
        } catch (error) {
          Pop.toast('error', error)
        }
      },
      async getNew() {
        try {
          await postsService.getNew()
        } catch (error) {
          Pop.toast('error', error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

.sidebar{
  height: 100vh;
  position: fixed;
}

.tshadow{
  text-shadow: 2px 2px #000000;
}
</style>
