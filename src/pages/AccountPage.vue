<template>
  <div class="container-fluid justify-content-center">
    <div class="profile-header p-2" v-if="account">
      <div class="row cover-img" :style="{backgroundImage: `url(${account.coverImg})`}">
        <h3 class="text-light">
          Welcome,  {{ account.name }}
          <p> Here you can edit your information. </p>
        </h3>
      </div>
      <div class="row p-2 justify-content-center">
        <div class="card bg-dark text-light" style="width: 100%;">
          <img :src="account.picture" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">
              {{ account.name }}
            </h5>
            <p class="card-text">
              Fill out the information below, providing links where they need to be.
            </p>
          </div>
          <ul class="list-group list-group-flush p-2 text-center">
            <div class="input-group-item">
              <form @submit.prevent="updateAccount()">
                <h5> Change your cover image</h5>
                <input type="text" v-model="account.coverImg" class="form-control bg-white border-1"><br />
                <h5> hange your name</h5>
                <input type="text" v-model="account.name" placeholder="Name" class="form-control bg-white border-1"><br />
                <h5> A little about yourself...</h5>
                <textarea v-model="account.bio"
                          type="text"
                          class="form-control"
                          name="body"
                          id="body"
                          rows="5"
                          placeholder="About you..."
                ></textarea><br />
                <h5> Change profile Pic</h5>
                <input type="text" v-model="account.picture" placholder="Picture" class="form-control bg-white border-1"><br />
                <h5> Change your Github</h5>
                <input type="text" v-model="account.github" placeholder="Github" class="form-control bg-white border-1"><br />
                <h5> Change your Linkedin</h5>
                <input type="text" v-model="account.linkedin" placeholder="Linkedin" class="form-control bg-white border-1"><br />
                <h5>Whose class are you in?</h5>
                <input type="text" v-model="account.class" placeholder="Class" class="form-control bg-white border-1"><br />
                <h5> Have you graduated?</h5>
                <input type="checkbox" v-model="account.graduated" placeholder="Graduate"> Check for yes <br />
                <button class="btn btn-success m-3">
                  Submit
                </button>
              </form>
            </div>
          </ul>
        </div>
      </div>
      <div class="row justify-content-center">
        <Ad />
      </div>
    </div>
    <div v-else>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    const account = computed(() => AppState.account)
    return {
      account,
      ad: computed(() => AppState.ads),
      async updateAccount() {
        try {
          await accountService.editAccount(account.value)
          Pop.toast('Profile Updated!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.cover-img{
  height: 30vh;
  background-position: center center;
}
</style>
