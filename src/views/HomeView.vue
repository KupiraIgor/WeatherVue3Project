<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCitiesStore } from '@/stores/cities.js'
import Block from '@/components/Block/Block.vue'
import Loader from '@/components/Base/Loader.vue'
import Button from '@/components/Base/Button.vue'
import Modal from '@/components/Base/Modal.vue'

const store = useCitiesStore()
const { cities } = storeToRefs(store)

const modalEl = ref()
const loading = ref(true)

const onShowModal = () => {
  modalEl.value.open()
}

const fetchData = async () => {
  try {
    await store.getIpUserFromIpAddress()
    await store.getWeatherCityObj()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const onAddCity = async () => {
  const loading = ref(true)
  try {
    const response = await store.getWeatherCityObj()
    if (!response) {
      onShowModal()
    }
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
  <main class="home-page">
    <div class="container">
      <Loader v-if="loading" />
      <template v-else>
        <div v-if="cities.length" class="home-page__items">
          <Block v-for="city of cities" :key="city.id" :city="city" />
        </div>
        <div v-else class="home-page__empty">Add weather forecast</div>
        <div class="home-page__btn">
          <Button @click="onAddCity">Add city</Button>
        </div>
      </template>
      <Modal ref="modalEl">
        <div class="home-page__modal">The maximum number of cities is 5, delete to add more</div>
      </Modal>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.home-page {
  position: relative;
  padding-bottom: 5rem;
  flex: 1 1 auto;

  &__items {
    margin-bottom: 4rem;

    .block {
      margin-bottom: 4rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__btn {
    display: flex;
    justify-content: center;
  }

  &__empty {
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 3rem;
  }

  &__modal {
    font-size: 2rem;
    text-align: center;
  }
}
</style>
