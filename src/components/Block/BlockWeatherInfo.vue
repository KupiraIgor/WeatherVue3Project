<script setup>
import { getWindDescription, metersToKilometers, upperCaseFirstLetter } from '@/functions/index.js'

defineProps({
  city: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="block-info">
    <div class="block-info__left">
      <div class="block-info__date">
        {{ $d(new Date(), 'long') }}
      </div>
      <div class="block-info__temp">
        <img
          :src="`http://openweathermap.org/img/wn/${city.icon}@2x.png`"
          :alt="city.description"
        />
        <span>{{ Math.round(city.temp) }}°C</span>
      </div>
      <div class="block-info__desc">
        <span>{{ $t('feels_like') }} {{ Math.round(city.feels_like) }}°C. </span>
        <span>{{ upperCaseFirstLetter(city.description) }}. </span>
        <span>{{ getWindDescription(city.wind_speed) }}</span>
      </div>
    </div>
    <div class="block-info__right">
      <div class="block-info__item">
        {{ $t('humidity') }}: <span>{{ city.humidity }}%</span>
      </div>
      <div class="block-info__item">
        {{ $t('visibility') }}: <span>{{ metersToKilometers(city.visibility) }}</span>
      </div>
      <div class="block-info__item">
        {{ $t('pressure') }}: <span>{{ city.pressure }} hPa</span>
      </div>
      <div class="block-info__item">
        {{ $t('wind_speed') }}: <span>{{ city.wind_speed }}m/s</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.block-info {
  display: flex;
  flex-wrap: wrap;
  min-height: 19rem;

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 5rem;
    margin-left: 5rem;
    border-left: 1px solid var(--color-gray);
  }

  &__date {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__temp {
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 3.4rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  &__desc {
    font-weight: 500;
  }

  &__item {
    span {
      font-weight: 500;
      font-size: 1.8rem;
    }
  }

  @media (max-width: 900px) {
    display: block;

    &__right {
      margin-left: 0;
      padding-left: 0;
      border: none;
    }
  }
}
</style>
