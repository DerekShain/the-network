<template>
  <div class="container-fluid">
    <div class="card mb-3 shadow-lg" style="max-width: 540px;">
      <router-link :to="{name: 'Profile', params: {id: post.creatorId}}" class="selectable">
        <img :src="post.img" class="img-fluid rounded-start" alt="...">
      </router-link>
      <div class="row g-0">
        <div class="col-md-4">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ post.creator.name }}
            </h5>
            <div class="" style="right: 1rem; top: 1rem" v-if="account.id == post.creatorId">
              <i class="mdi mdi-close text-danger f-20 selectable" @click="deletePost()">Delete Post</i>
            </div>
            <p class="card-text">
              {{ post.body }}
            </p>
            <p class="card-text">
              <small class="text-muted">Added: {{ new Date(post.updatedAt).toDateString() }}</small>
            </p>
            <p>
              <i class="mdi mdi-thumb-up-outline selectable" @click="likePost()"> Likes {{ post.likes.length }}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete?')
          if (!yes) { return }
          await postsService.deletePost(props.post.id)
          Pop.toast('Deleted!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async likePost() {
        try {
          await postsService.likePost(props.post.id)
          Pop.toast('Thanks for the like!', 'success')
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
