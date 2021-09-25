<template>
  <div class="container ">
    <div class="profile-header" v-if="account">
      <div class="row cover-img" :style="{backgroundImage: `url(${account.coverImg})`}">
        <h3 class="text-light">
          {{ account.name }}
        </h3>
      </div>
      <div class="row">
        <form @submit.prevent="updateAccount()">
          <h3> Change your cover image</h3>
          <input type="text" v-model="account.coverImg"><br />
          <h3> change your name</h3>
          <input type="text" v-model="account.name" placeholder="Name"><br />
          <h3> Change profile Pic</h3>
          <input type="text" v-model="account.picture" placholder="Picture"><br />
          <h3> Change your Github</h3>
          <input type="text" v-model="account.github" placeholder="Github"><br />
          <h3> Change your Linkedin</h3>
          <input type="text" v-model="account.linkedin" placeholder="Linkedin"><br />
          <h3> Have you graduated?</h3>
          <input type="checkbox" v-model="account.graduated" placeholder="Graduate"><br />
          <button class="btn btn-success ms-1">
            Submit
          </button>
        </form>
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
