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
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
          <li>
            <button class=" btn btn-dark text-light selectable" type="button" data-bs-toggle="modal" data-bs-target="#post-form">
              <b>Add a post!</b>
            </button>
          </li>
          <li>
            <Search />
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
// import { profilesService } from '../services/ProfilesService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getPosts()
        // await profilesService.getProfileById()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.posts),
      // profile: computed(() => AppState.profile),
      account: computed(() => AppState.account)
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
