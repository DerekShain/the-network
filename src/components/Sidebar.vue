<template>
  <div class="col-2 d-flex">
    <div class="sidebar fixed justify-content-between bg-dark d-none d-md-block">
      <div class="top-part">
        <div class="text-white p-3">
          <h3 class="p-3">
            Hello
          </h3>
          <ul>
            <img :src="account.picture" width="150" />
          </ul>
          <ul>
            {{ account.name }}
          </ul>
        </div>
        <div class="links">
          <div class="row-3">
            <li>
              <button class=" btn btn-dark text-light selectable" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
                <b>Add a post!</b>
              </button>
            </li>
            <li>
              <Search />
            </li>
          </div>
          <div class="row p-5">
            <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
              About
            </router-link><br />
          </div>
        </div>
      </div>
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
