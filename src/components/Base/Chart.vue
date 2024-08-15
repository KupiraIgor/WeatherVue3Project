<script setup>
import { Chart } from 'chart.js/auto'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  hourlyData: {
    type: Array,
    required: true
  }
})

const chartCanvas = ref(null)
let chart = null

const processWeatherData = () => {
  const labels = props.hourlyData.map((entry) => entry.dt_txt.split(' ')[1]) // тільки час
  const temperatures = props.hourlyData.map((entry) => entry.main.temp)

  return { labels, temperatures }
}

const createChart = async () => {
  const processedData = processWeatherData()

  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: processedData.labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          borderColor: '#ff5c13',
          data: processedData.temperatures,
          cubicInterpolationMode: 'monotone',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time'
          },
          grid: {
            display: false
          }
        },
        y: {
          title: {
            display: true,
            text: 'Temperature (°C)'
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
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style>
canvas {
  max-width: 100%;
  height: 20rem;
}
</style>
