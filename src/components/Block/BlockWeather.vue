<script setup>
import { ref } from 'vue'
import BlockWeatherInfo from '@/components/Block/BlockWeatherInfo.vue'
import CardOneDay from '@/components/Base/CardOneDay.vue'
import Chart from '@/components/Base/Chart.vue'
import Tab from '@/components/Base/Tab.vue'

const props = defineProps({
  city: {
    type: Object,
    required: true
  },
  isSevenDays: {
    type: Boolean,
    default: false
  }
})

const activeTab = ref('day')

const tabs = [
  { text: 'one_day', tab: 'day', show: true },
  { text: 'five_days', tab: '5days', show: !props.isSevenDays },
  { text: 'seven_days', tab: '7days', show: props.isSevenDays }
]

const onChoiceTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="block-body">
    <div class="block-body__wrap">
      <div class="block-body__tabs">
        <template v-for="tab of tabs">
          <Tab
            v-if="tab.show"
            class="block-body__tag"
            @click="onChoiceTab(tab.tab)"
            :class="{ _active: activeTab === tab.tab }"
          >
            {{ $t(tab.text) }}
          </Tab>
        </template>
      </div>
      <h2 class="block-body__city">{{ city.name }}, {{ city.country }}</h2>
      <BlockWeatherInfo v-if="activeTab === 'day'" :city="city" />
      <div class="block-body__days" v-else-if="activeTab === '5days' && !isSevenDays">
        <CardOneDay v-for="day of city.dailyFiveDays" :day="day" :id="city.id" />
      </div>
      <div class="block-body__days" v-else-if="activeTab === '7days' && isSevenDays">
        <CardOneDay v-for="day of city.dailySevenDays" :day="day" :id="city.id" />
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
      :hourly-data="city.dailyFiveDaysForChart"
      :title="$t('daily_forecast')"
      :title-bottom="$t('day')"
    />
    <Chart
      v-else-if="activeTab === '7days'"
      :hourly-data="city.dailySevenDaysForChart"
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    grid-gap: 2rem;
  }

  &__city {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
}
</style>
