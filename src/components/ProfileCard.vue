<template>
  <div class="card card-custom-wide">
    <div class="card-custom-wide-img" :style="{backgroundImage: `url(${profile.coverImg})`}"></div>
    <div class="card-custom-avatar">
      <img class="img-fluid" :src="profile.picture" alt="Avatar" />
    </div>
    <div class="card-body">
      <h4 class="card-title">
        {{ profile.name }}
        <div class="" v-if="profile.graduated == true">
          <i class="mdi mdi-school f-20 " title="Alumni"></i>
        </div>
        <div class="" v-else>
          <i class="mdi mdi-chair-school f-20 " title="Still Learning"></i>
        </div>
      </h4>
      <p class="card-text">
        {{ profile.bio }}<br />
        Class - {{ profile.class }}
      </p>
      <p class="card-text">
      </p><p class="card-text">
        <a :href="profile.github" title="Check out my GitHub!"><i class="mdi mdi-github f-20 selectable p-2"></i></a>
        <a :href="profile.linkedin" title="Check out my LinkedIn!"><i class="mdi mdi-linkedin f-20 selectable p-2"></i></a>
        <a :href="`mailto:${profile.email}`" title="Email Me!"><i class="mdi mdi-email f-20 selectable p-2"></i></a>
      </p>
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

<style scoped>
.card-custom-wide {
  overflow: hidden;
  border: 0;
  width: 100%;
  box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
}

.card-custom-wide-img {
  height: 160px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

/* First left setting is a fallback */
.card-custom-wide .card-custom-avatar img {
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(10, 10, 10, 0.3);
  position: absolute;
  top: 20px;
  left: 43.3%;
  left: calc(50% - 75px);
  width: 150px;
  height: 150px;
}
</style>
