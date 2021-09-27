<template>
  <div class="a-box">
    <div class="img-container">
      <div class="img-inner">
        <div class="inner-skew">
          <router-link :to="{name: 'Profile', params: {id: post.creatorId}}" class="selectable">
            <img v-if="post.img" :src="post.img">
            <img v-else :src="post.creator.picture">
          </router-link>
        </div>
      </div>
    </div>
    <div class="text-container overflow-auto text-light">
      <h3>{{ post.name }}</h3>
      <div>
        {{ post.body }}
        <div class="" style="right: 1rem; top: 1rem" v-if="account.id == post.creatorId">
          <i class="mdi mdi-close text-danger f-20 selectable" @click="deletePost()">Delete Post</i>
        </div><br />

        <i class="mdi mdi-thumb-up-outline selectable" @click="likePost()"> Likes {{ post.likeIds.length }}</i><br />

        <small class="text-muted">Added: {{ new Date(post.updatedAt).toDateString() }}</small><br />
      </div>
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
      type: Post,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      pd: computed(() => AppState.pd),
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
          Pop.cool('Nice!', 'success')
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped>
body {
  text-align: center;
  color: #eceeec;
  padding: 30px;
  background: #f3f4f5;
  font-family: Arial;
}

.a-box {
  display: inline-block;
  width: 400px;
  text-align: center;
}

.img-container {
    height: 230px;
    width: 200px;
    overflow: hidden;
    border-radius: 0px 0px 20px 20px;
    display: inline-block;
}

.img-container img {
    transform: skew(0deg, -13deg);
    height: 250px;
    margin: -35px 0px 0px -70px;
}

.inner-skew {
    display: inline-block;
    border-radius: 20px;
    overflow: hidden;
    padding: 0px;
    transform: skew(0deg, 13deg);
    font-size: 0px;
    margin: 30px 0px 0px 0px;
    background: #1e2b37;
    height: 250px;
    width: 200px;
}

.text-container {
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
  padding: 120px 20px 20px 20px;
  border-radius: 20px;
  background:  #1e2b37;
;
  margin: -120px 0px 0px 0px;
  line-height: 19px;
  font-size: 14px;
}

.text-container h3 {
  margin: 20px 0px 10px 0px;
  color: #04bcff;
  font-size: 18px;
}
</style>
