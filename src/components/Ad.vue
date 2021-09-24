<template>
  <div class="component p-3">
    <img :src="ad.tall">
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      ads: computed(() => AppState.ads)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
