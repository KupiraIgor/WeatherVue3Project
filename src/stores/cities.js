import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/api/axiosConfig.js'
import axios from 'axios'

export const useCitiesStore = defineStore('cities', () => {
  const userCityFromIpAddress = ref(null)
  const cities = ref([])
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

    objCity.hourly = forecast.list.slice(0, 9)

    return objCity
  }

  const getWeather = async (city) => {
    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        axiosInstance.get('weather', {
          params: { q: city, units: 'metric' }
        }),
        axiosInstance.get('forecast', {
          params: { q: city, units: 'metric' }
        })
      ])

      return { weather: weatherResponse, forecast: forecastResponse }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  const getWeatherCityObj = async () => {
    if (cities.value.length < 5) {
      const { weather, forecast } = await getWeather(userCityFromIpAddress.value)
      const objCity = generateObjCity(weather.data, forecast.data)

      objCity.id = idCity.value
      idCity.value += 1

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

  return {
    cities,
    getWeatherCityObj,
    getIpUserFromIpAddress,
    getCitiesForSearch,
    getUpdateWeatherFromSearch,
    deleteCity
  }
})
