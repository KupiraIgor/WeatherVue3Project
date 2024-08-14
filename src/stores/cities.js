import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axiosInstance from '@/api/axiosConfig.js'
import axios from 'axios'

export const useCitiesStore = defineStore('cities', () => {
  const cities = ref([])

  const getIpUserFromIpAddress = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/json?token=08ad19b82bf0f3')
      return response.data
    } catch (error) {
      throw error
    }
  }

  const getData = async (city) => {
    try {
      const response = await axiosInstance.get('weather', {
        params: { q: city, units: 'metric' }
      })
      cities.value.push(response.data)
    } catch (error) {
      throw error
    }
  }

  const getDataForCity = async (city) => {
    try {
      const response = await axiosInstance.get(`find?q=${city}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

  return { cities, getData, getIpUserFromIpAddress, getDataForCity }
})
