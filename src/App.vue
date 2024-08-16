<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import { watch } from 'vue'
import { i18n } from '@/i18n/index.js'
import { useCitiesStore } from '@/stores/cities.js'

const store = useCitiesStore()
watch(
  () => i18n.global.locale.value,
  () => {
    store.updateCityWithChangeLang()
  }
)
</script>

<template>
  <div class="app">
    <TheHeader />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
