import { createI18n } from 'vue-i18n'
import { en } from '@/i18n/locales/en.js'
import { uk } from '@/i18n/locales/uk.js'
import datetimeFormats from './datetimeFormats.js'

const browserLanguage = navigator.language.split('-')[0]
const availableLanguages = ['en', 'uk']

const savedLanguage = localStorage.getItem('appLanguage')
const defaultLanguage = availableLanguages.includes(browserLanguage) ? browserLanguage : 'uk'
export const languageToUse = savedLanguage || defaultLanguage

export const i18n = createI18n({
  legacy: false,
  locale: languageToUse,
  fallbackLocale: 'uk',
  messages: {
    en: en,
    uk: uk
  },
  datetimeFormats
})
