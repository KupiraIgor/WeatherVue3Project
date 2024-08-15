export const getWindDescription = (speed) => {
  if (speed <= 0.2) return 'Calm'
  if (speed <= 1.5) return 'Light air'
  if (speed <= 3.3) return 'Light breeze'
  if (speed <= 5.4) return 'Gentle breeze'
  if (speed <= 7.9) return 'Moderate breeze'
  if (speed <= 10.7) return 'Fresh breeze'
  return 'Strong wind'
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

    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })

    if (!days[formattedDate]) {
      days[formattedDate] = {
        minTemp: item.main.temp,
        maxTemp: item.main.temp,
        iconCounts: {},
        descriptionCounts: {},
        mostFrequentIcon: item.weather[0].icon,
        mostFrequentDescription: item.weather[0].main
      }
    } else {
      if (item.main.temp < days[formattedDate].minTemp) {
        days[formattedDate].minTemp = item.main.temp
      }
      if (item.main.temp > days[formattedDate].maxTemp) {
        days[formattedDate].maxTemp = item.main.temp
      }
    }

    const icon = item.weather[0].icon
    const description = item.weather[0].main

    days[formattedDate].iconCounts[icon] = (days[formattedDate].iconCounts[icon] || 0) + 1
    days[formattedDate].descriptionCounts[description] =
      (days[formattedDate].descriptionCounts[description] || 0) + 1
  })

  return Object.keys(days).map((date) => {
    const day = days[date]

    const mostFrequentIcon = Object.keys(day.iconCounts).reduce((a, b) =>
      day.iconCounts[a] > day.iconCounts[b] ? a : b
    )
    const mostFrequentDescription = Object.keys(day.descriptionCounts).reduce((a, b) =>
      day.descriptionCounts[a] > day.descriptionCounts[b] ? a : b
    )

    return {
      date,
      minTemp: Math.round(day.minTemp),
      maxTemp: Math.round(day.maxTemp),
      icon: mostFrequentIcon,
      main: mostFrequentDescription
    }
  })
}

export const calculateDailyAverages = (forecastData) => {
  const days = {}

  forecastData.forEach((item) => {
    const date = new Date(item.dt_txt)
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })

    if (!days[formattedDate]) {
      days[formattedDate] = { sum: 0, count: 0 }
    }

    days[formattedDate].sum += item.main.temp
    days[formattedDate].count += 1
  })

  const labels = Object.keys(days)
  const temperatures = labels.map((date) => days[date].sum / days[date].count)

  return { labels, temperatures }
}

export const processWeatherData = (oneDayForecast) => {
  const labels = oneDayForecast.map((entry) => entry.dt_txt.split(' ')[1]) // тільки час
  const temperatures = oneDayForecast.map((entry) => entry.main.temp)

  return { labels, temperatures }
}
