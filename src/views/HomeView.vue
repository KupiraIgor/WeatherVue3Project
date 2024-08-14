<script setup>
import Block from '@/components/Block.vue'
import { onMounted, ref } from 'vue'
import Loader from '@/components/Base/Loader.vue'
import { useCitiesStore } from '@/stores/cities.js'
import { storeToRefs } from 'pinia'

const store = useCitiesStore()

const { cities } = storeToRefs(store)

const userCityFromIpAddress = ref(null)
const data = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchData = async () => {
  try {
    userCityFromIpAddress.value = await store.getIpUserFromIpAddress()
    data.value = await store.getData(userCityFromIpAddress.value.city)
    console.log(cities.value)
  } catch (err) {
    error.value = 'Щось пішло не так'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <main>
    <div class="container">
      <Loader v-if="loading" />
      <template v-else>
        <Block v-for="city of cities" :key="city.id" :city="city" />
      </template>
    </div>
  </main>
</template>
