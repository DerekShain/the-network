<template>
  <div class="cardsSpace">
    <Post v-for="p in posts" :key="p.id" :post="p" class="p-3" />
  </div>
  <div class="col-12 d-flex justify-content-around">
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

<style>

.sidebar{
  height: 100vh;
  position: fixed;
}

.cardsSpace{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
