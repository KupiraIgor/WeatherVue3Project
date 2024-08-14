import axios from 'axios'

const API_URL = 'https://api.openweathermap.org/data/2.5/'
const API_KEY = 'd6c2ad51b1df3335f67556adb598b2c1'

const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    appid: API_KEY
  }
})

export default axiosInstance
