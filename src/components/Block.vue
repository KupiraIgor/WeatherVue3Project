<script setup>
import Button from '@/components/Base/Button.vue'
import FormSearchCity from '@/components/Base/FormSearchCity.vue'
import { getWindDescription, upperCaseFirstLetter } from '@/functions/Functions.js'

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
      <FormSearchCity />
      <Button>У вибране</Button>
    </div>
    <div class="block__body">
      <div class="block__left">
        <h2 class="block__city">{{ city.name }}, {{ city.sys.country }}</h2>
        <div class="block__temp">
          <img
            :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
            :alt="city.weather[0].description"
          />
          <span>{{ Math.round(city.main.temp) }}°C</span>
        </div>
        <div class="block__desc">
          <span>Feels like {{ Math.round(city.main.feels_like) }}°C. </span>
          <span>{{ upperCaseFirstLetter(city.weather[0].description) }}. </span>
          <span>{{ getWindDescription(city.wind.speed) }}</span>
        </div>
      </div>
      <div class="block__right">
        <div>Humidity: {{ city.main.humidity }}</div>
        <!--        <div>Dew point: {{}}°C</div>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block {
  border: 1px solid var(--color-gray);
  border-radius: 1rem;
  padding: 1.5rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  &__body {
    display: flex;
    flex-wrap: wrap;
  }

  &__right {
    border-left: 1px solid var(--color-gray);
    margin-left: 5rem;
    padding-left: 5rem;
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
