<template>
  <div class="container-fluid">
    <div class="card mb-3 shadow-lg" style="max-width: 540px;">
      <router-link :to="{name: 'Profile', params: {id: post.creatorId}}" class="selectable">
        <img v-if="post.img" :src="post.img" class="img-fluid rounded-start" alt="...">
        <div class="row g-0">
          <div class="col-md-4">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                {{ post.name }}
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
            </div>
          </div>
        </div>
      </router-link>
      <p>
        <i class="mdi mdi-thumb-up-outline selectable" @click="likePost()"> Likes {{ post.likeIds.length }}</i>
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
import { Post } from '../models/Post'
export default {
  props: {
    post: {
      // NOTE Specific type of Post
      type: Post,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
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
