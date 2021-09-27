<template>
  <div class="col-2">
    <div class="sidebar d-none d-md-block">
      <AccountCard />
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
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
      query
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
