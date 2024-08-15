<script setup>
import { getWindDescription, upperCaseFirstLetter } from '@/functions/Functions.js'
import Button from '@/components/Base/Button.vue'
import FormSearchCity from '@/components/Base/FormSearchCity.vue'
import Chart from '@/components/Base/Chart.vue'
defineProps({
  city: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="block">
    <div class="block__header">
      <FormSearchCity :id="city.id" />
      <Button>У вибране</Button>
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
}
</style>
