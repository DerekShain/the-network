<template>
  <form @submit.prevent="searchPosts">
    <div class="input-group mb-3">
      <input v-model="query"
             type="text"
             name="search"
             required
             class="form-control bg-white border-0"
             placeholder="Search posts..."
      >
      <button class="btn btn-outline-secondary" type="submit">
        <i class="mdi mdi-card-search f-20"></i>
      </button>
      <button class="btn btn-outline-secondary" type="reset">
        <i class="mdi mdi-restart f-20"></i>
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
