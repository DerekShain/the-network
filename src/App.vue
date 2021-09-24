<template>
  <header>
    <Navbar />
  </header>
  <main>
    <Sidebar />
    <router-view />
  </main>
  <footer>
  </footer>

  <Modal id="post-form">
    <template #modal-title>
      <h4>Create a post!</h4>
    </template>
    <template #modal-body>
      <CreatePost />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
