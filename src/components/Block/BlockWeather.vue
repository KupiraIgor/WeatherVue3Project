<script setup>
import Tab from '@/components/Base/Tab.vue'
import { ref } from 'vue'
import CardOneDay from '@/components/Base/CardOneDay.vue'
import BlockWeatherInfo from '@/components/Block/BlockWeatherInfo.vue'
import Chart from '@/components/Base/Chart.vue'

defineProps({
  city: {
    type: Object,
    required: true
  }
})

const activeTab = ref('day')

const onChoiceTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="block-body">
    <div class="block-body__wrap">
      <div class="block-body__tabs">
        <Tab
          class="block-body__tag"
          @click="onChoiceTab('day')"
          :class="{ _active: activeTab === 'day' }"
        >
          {{ $t('one_day') }}
        </Tab>
        <Tab
          class="block-body__tag"
          @click="onChoiceTab('5days')"
          :class="{ _active: activeTab === '5days' }"
        >
          {{ $t('five_days') }}
        </Tab>
      </div>
      <h2 class="block-body__city">{{ city.name }}, {{ city.country }}</h2>
      <BlockWeatherInfo v-if="activeTab === 'day'" :city="city" />
      <div class="block-body__days" v-else-if="activeTab === '5days'">
        <CardOneDay v-for="day of city.hourlyFiveDays" :day="day" :id="city.id" />
      </div>
    </div>

    <Chart
      v-if="activeTab === 'day'"
      :hourly-data="city.hourlyOneDayForChart"
      :title="$t('hourly_forecast')"
      :title-bottom="$t('time')"
    />
    <Chart
      v-else-if="activeTab === '5days'"
      :hourly-data="city.hourlyFiveDaysForChart"
      :title="$t('daily_forecast')"
      :title-bottom="$t('day')"
    />
  </div>
</template>

<style lang="scss" scoped>
.block-body {
  &__wrap {
    padding-bottom: 3rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-gray);
  }

  &__tabs {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__days {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  &__city {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
}
</style>
