<script setup>
import { RouterView } from 'vue-router'
import { onMounted, watch } from 'vue'
import { i18n } from '@/i18n/index.js'
import { useCitiesStore } from '@/stores/cities.js'
import TheHeader from '@/components/TheHeader.vue'
const store = useCitiesStore()

onMounted(() => {
  setTimeout(() => {
    watch(
      () => i18n.global.locale.value,
      () => {
        store.updateCityWithChangeLang()
      }
    )
  }, 0)
})
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
