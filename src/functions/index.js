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

export const processWeatherDataDailyFiveDay = (data) => {
  return data.map((item) => {
    return {
      date: new Date(item.dt * 1000),
      maxTemp: item.temp.max,
      minTemp: item.temp.min,
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
