<template>
  <form @submit.prevent="searchPosts" class bg-white>
    <!-- <div class="form-group">
      <label for="search" class="sr-only"></label>
      <input v-model="query"
             type="text"
             name="search"
             required
             class="form-control bg-white border-0"
             placeholder="Search for posts here!"
      >
    </div>
    <button class="btn btn-success" type="submit">
      Search
    </button> -->
    <div class="input-group mb-3">
      <input v-model="query"
             type="text"
             name="search"
             required
             class="form-control bg-white border-0"
             placeholder="Search for posts here!"
      >
      <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
        Button
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { postsService } from '../services/PostsService.js'
export default {
  setup() {
    const query = ref('')
    return {
      query,
      async searchPosts() {
        try {
          await postsService.searchPosts(query.value)
        } catch (error) {
          Pop.toast(error, 'Cant find posts')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
