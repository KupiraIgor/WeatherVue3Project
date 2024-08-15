import axios from 'axios'

const API_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = '5796abbde9106b7da4febfae8c44c232'

const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    appid: API_KEY
  }
})

export default axiosInstance
