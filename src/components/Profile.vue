<template>
  <div class="card m-3 shadow-lg text-light tshadow cover-img" :style="{backgroundImage: `url(${profile.coverImg})`}">
    <div class="row g-0 card-img-overlay">
      <div class="col-md-2">
        <img :src="profile.picture" class="img-fluid rounded-start shadow" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ profile.name }}
            <div class="" v-if="profile.graduated == true">
              <i class="mdi mdi-school f-20 " title="Alumni"></i>
            </div>
            <div class="" v-else>
              <i class="mdi mdi-chair-school f-20 " title="Still Learning"></i>
            </div>
          </h5>
          <li class="card-text">
            {{ profile.bio }}<br />
            Class - {{ profile.class }}
          </li>
          <p class="card-text">
            <a :href="profile.github"><i class="mdi mdi-github f-20 selectable"></i></a>
            <a :href="profile.linkedin"><i class="mdi mdi-linkedin f-20 selectable"></i></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
export default {

  setup() {
    const route = useRoute()
    const profile = computed(() => AppState.profile)
    watchEffect(async() => {
      if (route.params.id) {
        await profilesService.getProfileById(route.params.id)
      }
    })
    return {
      profile
    }
  }
}
</script>

<style scoped lang="scss">

.tshadow{
  text-shadow: 2px 2px #000000;
}
.cover-img{
  height: 30vh;
  width: 50vw;
  background-position: center center;
}
</style>
