<script setup>
defineProps({
  day: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card-day">
    <div>{{ day.date }}</div>
    <div class="card-day__img">
      <img :src="`http://openweathermap.org/img/wn/${day.icon}@2x.png`" alt="" />
    </div>
    <div class="card-day__temp">
      Max: <span>{{ day.maxTemp }}°C</span>
    </div>
    <div class="card-day__temp">
      Min: <span>{{ day.minTemp }}°C</span>
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
