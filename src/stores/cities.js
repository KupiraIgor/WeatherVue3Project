import { ref } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/api/axiosConfig.js'
import axios from 'axios'
import { i18n } from '@/i18n'
import {
  processWeatherDataDailyFiveDay,
  processWeatherDataDailyForChart,
  processWeatherDataHourlyForChart
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
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  const generateObjCity = (weather, oneCall) => {
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
    objCity.lon = weather.coord.lon
    objCity.lat = weather.coord.lat

    objCity.hourlyOneDayForChart = processWeatherDataHourlyForChart(oneCall.hourly.slice(0, 25))
    objCity.dailyFiveDaysForChart = processWeatherDataDailyForChart(oneCall.daily.slice(0, 5))
    objCity.dailySevenDaysForChart = processWeatherDataDailyForChart(oneCall.daily.slice(0, 7))
    objCity.dailyFiveDays = processWeatherDataDailyFiveDay(oneCall.daily.slice(0, 5))
    objCity.dailySevenDays = processWeatherDataDailyFiveDay(oneCall.daily.slice(0, 7))

    objCity.daily = oneCall.daily
    objCity.hourly = oneCall.hourly
    objCity.dew_point = oneCall.current.dew_point
    return objCity
  }

  const getWeatherOneCall = async (city, id) => {
    try {
      const params = {
        units: 'metric',
        lang: i18n.global.locale.value,
        ...(id ? { id } : { q: city })
      }
      const weather = await axiosInstance.get('weather', { params })
      const oneCall = await axiosInstance.get('onecall', {
        params: {
          lat: weather.data.coord.lat,
          lon: weather.data.coord.lon,
          units: 'metric',
          lang: i18n.global.locale.value
        }
      })
      return { weather, oneCall }
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  const getWeatherOneCallCityObj = async () => {
    const { weather, oneCall } = await getWeatherOneCall(userCityFromIpAddress.value)
    const objCity = generateObjCity(weather.data, oneCall.data)
    objCity.id = idCity.value
    cities.value.push(objCity)
  }

  const getCitiesForSearch = async (city) => {
    try {
      const response = await axiosInstance.get(`find?q=${city}`)
      return response.data
    } catch (error) {
      console.error('Error fetching weather data:', error)
      throw error
    }
  }

  const getUpdateWeatherFromSearch = async (idRes, id) => {
    let index = cities.value.findIndex((obj) => obj.id === id)

    const { weather, oneCall } = await getWeatherOneCall(null, idRes)
    const objCity = generateObjCity(weather.data, oneCall.data)

    objCity.id = idCity.value
    idCity.value += 1

    if (index !== -1) {
      cities.value[index] = objCity
    }
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

  const deleteCity = (id) => {
    const index = cities.value.findIndex((item) => item.id === id)

    if (index !== -1) {
      cities.value.splice(index, 1)
    }
  }

  const addToFavorites = (city) => {
    if (favoriteCitiesId.value.length < 5) {
      const isExists = favoriteCitiesId.value.some((item) => item.idRes === city.idRes)

      if (!isExists) {
        const obj = {}
        obj.idRes = city.idRes
        obj.lon = city.lon
        obj.lat = city.lat
        favoriteCitiesId.value.push(obj)
        localStorage.setItem('favoriteCities', JSON.stringify(favoriteCitiesId.value))
      }

      return true
    } else {
      return false
    }
  }

  const deleteFromFavorites = (city) => {
    const index = favoriteCitiesId.value.findIndex((item) => item.idRes === city.idRes)

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
      try {
        const weatherPromises = favoriteCitiesId.value.flatMap((item) => [
          axiosInstance.get('weather', {
            params: { id: item.idRes, units: 'metric', lang: i18n.global.locale.value }
          }),
          axiosInstance.get('onecall', {
            params: {
              lat: item.lat,
              lon: item.lon,
              units: 'metric',
              lang: i18n.global.locale.value
            }
          })
        ])
        const weatherResponses = await Promise.all(weatherPromises)
        favoriteCities.value = []
        const weatherData = []
        for (let i = 0; i < weatherResponses.length; i += 2) {
          weatherData.push({
            weather: weatherResponses[i].data,
            oneCall: weatherResponses[i + 1].data
          })
        }
        weatherData.forEach((item) => {
          favoriteCities.value.push(generateObjCity(item.weather, item.oneCall))
        })
      } catch (error) {
        console.error('Error fetching weather data:', error)
        throw error
      }
    } else {
      return null
    }
  }

  return {
    cities,
    favoriteCities,
    favoriteCitiesId,
    getIpUserFromIpAddress,
    getCitiesForSearch,
    getUpdateWeatherFromSearch,
    deleteCity,
    addToFavorites,
    addCity,
    deleteFromFavorites,
    getFavoriteCities,
    getWeatherOneCall,
    getWeatherOneCallCityObj
  }
})
