<template>
  <div class="home d-flex align-items-center ">
    <div class="row">
      <div class="col p-2">
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
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPosts()
        await adsService.getAds()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      ad: computed(() => AppState.ads),
      likeIds: computed(() => AppState.likeIds),
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
</style>
