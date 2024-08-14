<script setup>
import Input from '@/components/Base/Input.vue'
import Button from '@/components/Base/Button.vue'
import { onMounted, ref } from 'vue'
import { useCitiesStore } from '@/stores/cities.js'

const store = useCitiesStore()

const inputData = ref('')

const data = ref(null)
const loading = ref(false)
const isShowSelect = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    data.value = await store.getDataForCity(inputData.value)
    if (data.value.count) {
      isShowSelect.value = true
    }
    console.log(data.value)
  } catch (err) {
    console.error(err)
  }
  loading.value = false
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (isShowSelect.value) {
      isShowSelect.value = false
    }
  })
})
</script>

<template>
  <form class="form-city" @submit.prevent="onSubmit">
    <div class="form-city__wrap">
      <Input v-model="inputData" placeholder="Введіть місто" />
      <div v-if="isShowSelect" class="form-city__select">
        <div v-for="item of data.list" class="form-city__item">
          <span>{{ item.name }}, {{ item.sys.country }}</span>
          <img
            :src="`https://openweathermap.org/images/flags/${item.sys.country.toLowerCase()}.png`"
            alt=""
          />
        </div>
      </div>
    </div>
    <Button>Search</Button>
  </form>
</template>

<style lang="scss">
.form-city {
  display: flex;

  &__wrap {
    position: relative;
  }

  .base-input {
    &__field {
      border-radius: 0.6rem 0 0 0.6rem;
    }
  }

  .base-button {
    border-radius: 0 0.6rem 0.6rem 0;
  }

  &__select {
    position: absolute;
    max-height: 15rem;
    overflow-y: auto;
    width: 100%;
    border-radius: 0 0 0.6rem 0.6rem;
    border: 1px solid var(--color-gray);
    border-top: none;
    z-index: 2;
    top: 4.8rem;
    background: var(--color-white);
    padding: 0.5rem;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    transition: var(--duration) var(--easing);
    border-radius: 0.4rem;

    &:hover {
      background: var(--color-gray-2);
    }
  }
}
</style>
