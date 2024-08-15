<script setup>
import { ref } from 'vue'
import { getWindDescription, upperCaseFirstLetter } from '@/functions/Functions.js'
import { useCitiesStore } from '@/stores/cities.js'
import FormSearchCity from '@/components/Base/FormSearchCity.vue'
import Button from '@/components/Base/Button.vue'
import Chart from '@/components/Base/Chart.vue'
import Modal from '@/components/Base/Modal.vue'

const props = defineProps({
  city: {
    type: Object,
    required: true
  }
})

const store = useCitiesStore()
const modalEl = ref()

const onShowModal = () => {
  modalEl.value.open()
}

const onCloseModal = () => {
  modalEl.value.close()
}

const onDeleteBlock = () => {
  store.deleteCity(props.city.id)
  onCloseModal()
}
</script>

<template>
  <div class="block">
    <div class="block__header">
      <FormSearchCity :id="city.id" />
      <div class="block__buttons">
        <Button>У вибране</Button>
        <Button color="red" @click="onShowModal">Delete</Button>
      </div>
    </div>
    <div class="block__body">
      <h2 class="block__city">{{ city.name }}, {{ city.country }}</h2>
      <div class="block__temp">
        <img
          :src="`http://openweathermap.org/img/wn/${city.icon}@2x.png`"
          :alt="city.description"
        />
        <span>{{ Math.round(city.temp) }}°C</span>
      </div>
      <div class="block__desc">
        <span>Feels like {{ Math.round(city.feels_like) }}°C. </span>
        <span>{{ upperCaseFirstLetter(city.description) }}. </span>
        <span>{{ getWindDescription(city.wind_speed) }}</span>
      </div>
    </div>
    <Chart :hourly-data="city.hourly" />
    <Modal ref="modalEl">
      <div class="block__modal">
        <div class="block__modal-text">
          You definitely want to delete the weather for {{ city.name }}?
        </div>
        <div class="block__modal-buttons">
          <Button @click="onDeleteBlock">Yes</Button>
          <Button @click="onCloseModal">No</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.block {
  border: 1px solid var(--color-gray);
  border-radius: 1rem;
  padding: 2.5rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 3rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-gray);
  }

  &__body {
    padding-bottom: 3rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-gray);
  }

  &__buttons {
    display: flex;
    gap: 2rem;
  }

  &__city {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__temp {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 3.4rem;
    margin-bottom: 1rem;

    img {
      width: 6rem;
      height: 6rem;
    }
  }

  &__desc {
    font-size: 1.4rem;
    font-weight: 500;
  }

  &__modal {
    &-text {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 3rem;
    }

    &-buttons {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
  }
}
</style>
