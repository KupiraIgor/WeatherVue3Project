import './assets/scss/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { en } from '@/i18n/en.js'
import { uk } from '@/i18n/uk.js'
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/uk'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const browserLanguage = navigator.language.split('-')[0]
const availableLanguages = ['en', 'uk']

const savedLanguage = localStorage.getItem('appLanguage')
const defaultLanguage = availableLanguages.includes(browserLanguage) ? browserLanguage : 'uk'
const languageToUse = savedLanguage || defaultLanguage
export const i18n = createI18n({
  legacy: false,
  locale: languageToUse,
  fallbackLocale: 'uk',
  messages: {
    en: en,
    uk: uk
  }
})
moment.locale(languageToUse)
app.use(i18n)
app.use(createPinia())
app.use(router)

app.mount('#app')
