<template>
  <div class="col-2 d-flex m-2">
    <div class="sidebar fixed justify-content-between d-none d-md-block">
      <AccountCard />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const query = ref('')
    onMounted(async() => {
      try {
        await postsService.getPosts()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      query,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      total: computed(() => AppState.total),
      current: computed(() => AppState.current)
    }
  }
}
</script>

<style  scoped>
.sidebar{
  height: 100vh;
  position: fixed;
}
</style>
