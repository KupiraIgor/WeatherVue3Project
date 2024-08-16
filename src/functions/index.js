import { i18n } from '@/i18n'
export const getWindDescription = (speed) => {
  if (speed <= 0.2) return i18n.global.t('calm')
  if (speed <= 1.5) return i18n.global.t('light_air')
  if (speed <= 3.3) return i18n.global.t('light_breeze')
  if (speed <= 5.4) return i18n.global.t('gentle_breeze')
  if (speed <= 7.9) return i18n.global.t('moderate_breeze')
  if (speed <= 10.7) return i18n.global.t('fresh_breeze')
  return i18n.global.t('strong_wind')
}

export const upperCaseFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1)
}

export function metersToKilometers(meters) {
  return meters / 1000 + 'km'
}

export const calculateDailyExtremes = (hourlyData) => {
  const days = {}

  hourlyData.forEach((item) => {
    const date = new Date(item.dt_txt)
    const dateString = date.toISOString().split('T')[0]

    if (!days[dateString]) {
      days[dateString] = {
        minTemp: item.main.temp,
        maxTemp: item.main.temp,
        iconCounts: {},
        descriptionCounts: {},
        mostFrequentIcon: item.weather[0].icon
      }
    } else {
      if (item.main.temp < days[dateString].minTemp) {
        days[dateString].minTemp = item.main.temp
      }
      if (item.main.temp > days[dateString].maxTemp) {
        days[dateString].maxTemp = item.main.temp
      }
    }

    const icon = item.weather[0].icon

    days[dateString].iconCounts[icon] = (days[dateString].iconCounts[icon] || 0) + 1
  })

  return Object.keys(days).map((date) => {
    const day = days[date]

    const mostFrequentIcon = Object.keys(day.iconCounts).reduce((a, b) =>
      day.iconCounts[a] > day.iconCounts[b] ? a : b
    )

    return {
      date: i18n.global.d(date, 'short'),
      minTemp: Math.round(day.minTemp),
      maxTemp: Math.round(day.maxTemp),
      icon: mostFrequentIcon
    }
  })
}

export const calculateDailyAverages = (forecastData) => {
  const days = {}

  forecastData.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]

    if (!days[date]) {
      days[date] = { sum: 0, count: 0 }
    }

    days[date].sum += item.main.temp
    days[date].count += 1
  })

  const labelsKeys = Object.keys(days)
  const labels = labelsKeys.map((item) => {
    return i18n.global.d(item, 'short')
  })

  const temperatures = labelsKeys.map((date) => days[date].sum / days[date].count)

  return { labels, temperatures }
}

export const processWeatherData = (oneDayForecast) => {
  const labels = oneDayForecast.map((entry) => entry.dt_txt.split(' ')[1]) // тільки час
  const temperatures = oneDayForecast.map((entry) => entry.main.temp)

  return { labels, temperatures }
}
