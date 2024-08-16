<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCitiesStore } from '@/stores/cities.js'
import Loader from '@/components/Base/Loader.vue'
import Block from '@/components/Block/Block.vue'

const store = useCitiesStore()
const loading = ref(true)

const { favoriteCitiesId } = storeToRefs(store)
const { favoriteCities } = storeToRefs(store)

const fetchData = async () => {
  try {
    await store.getFavoriteCities()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <main class="favorites-page">
    <div class="container">
      <Loader v-if="loading" />
      <template v-else>
        <div v-if="favoriteCities.length" class="favorites-page__items">
          <Block
            v-for="city of favoriteCities"
            :key="city.idRes"
            :city="city"
            :is-fav="favoriteCitiesId.some((item) => item.idRes === city.idRes)"
            is-hide-form
            is-seven-days
          />
        </div>
        <div v-else class="favorites-page__empty">{{ $t('dont_have_favorite') }}</div>
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.favorites-page {
  &__items {
    margin-bottom: 4rem;

    .block {
      margin-bottom: 4rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__empty {
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 3rem;
  }
}
</style>
