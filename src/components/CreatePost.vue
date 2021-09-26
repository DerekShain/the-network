<template>
  <form @submit.prevent="createPost()">
    <div class="form-group">
      <label for="title">Add a post!</label>
      <input type="text"
             class="form-control bg-light"
             name="imgUrl"
             placeholder="Make sure it's a URL!"
             v-model="editable.imgUrl"
      >
    </div>
    <div class="form-group">
      <label for="body" class="">Body</label>
      <textarea v-model="editable.body"
                type="text"
                class="form-control"
                name="body"
                id="body"
                rows="5"
      ></textarea>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-success mt-2">
        Add your post!
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const editable = ref({ photos: [] })
    return {
      editable,
      addPhoto() {
        editable.value.photos.push({ title: 'Title', imgUrl: '//placehold.it/300x300' })
      },
      async createPost() {
        try {
          await postsService.createPost(editable.value)
          editable.value = { photos: [] }
          Pop.toast('Added', 'success')
          const modal = Modal.getInstance(document.getElementById('post-form'))
          modal.hide()
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
