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
      <div class="col-md-6 d-flex ">
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
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import { adsService } from './services/AdsService'
import Pop from './utils/Pop'
export default {
  name: 'App',
  setup() {
    onMounted(async() => {
      try {
        await adsService.getAds()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      appState: computed(() => AppState),
      ad: computed(() => AppState.ads)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
body{

  font-family: 'Montserrat', sans-serif;
}

   /* .row{
            height: 100px;
        } */
    *{
        outline: red solid 1px;
    }
</style>
