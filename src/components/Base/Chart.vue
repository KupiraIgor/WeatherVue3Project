<script setup>
import { Chart } from 'chart.js/auto'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { i18n } from '@/i18n'

const props = defineProps({
  hourlyData: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  titleBottom: {
    type: String,
    required: true
  }
})

const chartCanvas = ref(null)
let chart = null

const createChart = async () => {
  const processedData = props.hourlyData

  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: processedData.labels,
      datasets: [
        {
          borderColor: '#ff5c13',
          data: processedData.temperatures,
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          displayName: false
        }
      ]
    },

    options: {
      plugins: {
        legend: {
          display: false
        }
      },
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: props.titleBottom
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: `${i18n.global.t('temperature')} (°C)`
          },
          grid: {
            display: false
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<template>
  <div class="chart">
    <h3 class="chart__title">{{ title }}</h3>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  &__title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.2rem;
  }
  canvas {
    max-width: 100%;
  }
}
</style>
