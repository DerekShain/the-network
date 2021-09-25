<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
  <header>
    <Navbar />
  </header>
  <main>
    <div class="row d-flex">
      <div class="col-md-2">
        <Sidebar />
      </div>
      <div class="col-md-10">
        <router-view />
      </div>
    </div>
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
body{

  font-family: 'Montserrat', sans-serif;
}
</style>
