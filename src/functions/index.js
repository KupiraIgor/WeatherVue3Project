import { i18n } from '@/i18n'

export const processWeatherDataDailyFiveDay = (data) => {
  return data.map((item) => {
    return {
      date: new Date(item.dt * 1000),
      maxTemp: Math.round(item.temp.max),
      minTemp: Math.round(item.temp.min),
      icon: item.weather[0].icon,
      id: item.id
    }
  })
}

export const processWeatherDataDailyForChart = (data) => {
  const labels = data.map((entry) => i18n.global.d(new Date(entry.dt * 1000), 'short'))
  const temperatures = data.map((entry) => entry.temp.day)

  return { labels, temperatures }
}

export const processWeatherDataHourlyForChart = (data) => {
  const arr = data.map((entry) => i18n.global.d(new Date(entry.dt * 1000), 'hour'))
  const temperatures = data.map((entry) => entry.temp)
  const labels = arr.filter((_, index) => index % 2 === 0)

  return { labels, temperatures }
}
