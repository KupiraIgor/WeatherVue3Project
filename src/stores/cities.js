import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/api/axiosConfig.js'
import axios from 'axios'
import { i18n } from '@/i18n'
import {
  calculateDailyAverages,
  calculateDailyExtremes,
  processWeatherData
} from '@/functions/index.js'

export const useCitiesStore = defineStore('cities', () => {
  const userCityFromIpAddress = ref(null)
  const cities = ref([])
  const favoriteCitiesId = ref(JSON.parse(localStorage.getItem('favoriteCities')) || [])
  const favoriteCities = ref([])
  const idCity = ref(0)

  const getIpUserFromIpAddress = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json?token=08ad19b82bf0f3')
      userCityFromIpAddress.value = response.data.city
    } catch (error) {
      throw error
    }
  }

  const generateObjCity = (weather, forecast) => {
    const objCity = {}

    objCity.name = weather.name
    objCity.country = weather.sys.country
    objCity.icon = weather.weather[0].icon
    objCity.description = weather.weather[0].description
    objCity.temp = weather.main.temp
    objCity.feels_like = weather.main.feels_like
    objCity.wind_speed = weather.wind.speed
    objCity.humidity = weather.main.humidity
    objCity.visibility = weather.visibility
    objCity.pressure = weather.main.pressure
    objCity.idRes = weather.id

    objCity.hourlyOneDayForChart = processWeatherData(forecast.list.slice(0, 9))
    objCity.hourlyFiveDaysForChart = calculateDailyAverages(forecast.list)
    objCity.hourlyFiveDays = calculateDailyExtremes(forecast.list)

    return objCity
  }

  const getWeather = async (city) => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axiosInstance.get('weather', {
          params: { q: city, units: 'metric', lang: i18n.global.locale.value }
        }),
        axiosInstance.get('forecast', {
          params: { q: city, units: 'metric', lang: i18n.global.locale.value }
        })
      ])

      return { weather: weatherResponse, forecast: forecastResponse }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  const getWeatherCityObj = async () => {
    const { weather, forecast } = await getWeather(userCityFromIpAddress.value)
    const objCity = generateObjCity(weather.data, forecast.data)
    objCity.id = idCity.value

    cities.value.push(objCity)
  }

  const addCity = () => {
    if (cities.value.length < 5) {
      const objCity = {}
      idCity.value += 1
      objCity.id = idCity.value
      objCity.idRes = null

      cities.value.push(objCity)
      return true
    } else {
      return false
    }
  }

  const getUpdateWeatherFromSearch = async (city, id) => {
    let index = cities.value.findIndex((obj) => obj.id === id)

    const { weather, forecast } = await getWeather(city)
    const objCity = generateObjCity(weather.data, forecast.data)

    objCity.id = idCity.value
    idCity.value += 1

    if (index !== -1) {
      cities.value[index] = objCity
    }
  }

  const getCitiesForSearch = async (city) => {
    try {
      const response = await axiosInstance.get(`find?q=${city}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  const deleteCity = (id) => {
    const index = cities.value.findIndex((item) => item.id === id)

    if (index !== -1) {
      cities.value.splice(index, 1)
    }
  }

  const addToFavorites = (city) => {
    const isExists = favoriteCitiesId.value.includes(city.idRes)

    if (!isExists) {
      favoriteCitiesId.value.push(city.idRes)
      localStorage.setItem('favoriteCities', JSON.stringify(favoriteCitiesId.value))
    }
  }

  const deleteFromFavorites = (city) => {
    const index = favoriteCitiesId.value.findIndex((item) => item === city.idRes)

    if (index !== -1) {
      favoriteCitiesId.value.splice(index, 1)
      localStorage.setItem('favoriteCities', JSON.stringify(favoriteCitiesId.value))
    }

    if (favoriteCities.value.length) {
      const index = favoriteCities.value.findIndex((item) => item.idRes === city.idRes)

      if (index !== -1) {
        favoriteCities.value.splice(index, 1)
      }
    }
  }

  const getFavoriteCities = async () => {
    if (favoriteCitiesId.value.length) {
      favoriteCities.value = []
      try {
        const weatherPromises = favoriteCitiesId.value.flatMap((id) => [
          axiosInstance.get('weather', {
            params: { id: id, units: 'metric', lang: i18n.global.locale.value }
          }),
          axiosInstance.get('forecast', {
            params: { id: id, units: 'metric', lang: i18n.global.locale.value }
          })
        ])

        const weatherResponses = await Promise.all(weatherPromises)

        const weatherData = []
        for (let i = 0; i < weatherResponses.length; i += 2) {
          weatherData.push({
            weather: weatherResponses[i].data,
            forecast: weatherResponses[i + 1].data
          })
        }

        weatherData.forEach((item) => {
          favoriteCities.value.push(generateObjCity(item.weather, item.forecast))
        })
      } catch (error) {
        console.error('Error fetching weather data:', error)
        throw error
      }
    } else {
      return null
    }
  }

  const updateCityWithChangeLang = () => {
    cities.value.forEach(async (item) => {
      if (item.idRes) {
        const { weather, forecast } = await getWeather(item.name)
        const objCity = generateObjCity(weather.data, forecast.data)
        objCity.id = item.id

        const index = cities.value.findIndex((i) => i.id === item.id)

        if (index !== -1) {
          cities.value[index] = objCity
        }
      }
    })
    getFavoriteCities()
  }

  return {
    cities,
    favoriteCities,
    favoriteCitiesId,
    getWeatherCityObj,
    getIpUserFromIpAddress,
    getCitiesForSearch,
    getUpdateWeatherFromSearch,
    deleteCity,
    addToFavorites,
    addCity,
    deleteFromFavorites,
    getFavoriteCities,
    updateCityWithChangeLang
  }
})
