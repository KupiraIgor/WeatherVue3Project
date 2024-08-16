<script setup>
import { i18n } from '@/i18n/index.js'

defineProps({
  day: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card-day">
    <div>{{ i18n.global.d(day.date, 'short') }}</div>
    <div class="card-day__img">
      <img :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" alt="" />
    </div>
    <div class="card-day__temp">
      {{ $t('max') }}: <span>{{ day.maxTemp }}°C</span>
    </div>
    <div class="card-day__temp">
      {{ $t('min') }}: <span>{{ day.minTemp }}°C</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-day {
  padding: 1rem;
  background: var(--color-gray);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  min-height: 19rem;
  min-width: 12rem;

  &__img {
    img {
      width: 8rem;
      height: 8rem;
    }
  }

  &__temp {
    span {
      font-weight: 600;
    }
  }
}
</style>
