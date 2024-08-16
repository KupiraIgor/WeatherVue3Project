import { createI18n } from 'vue-i18n'
import { en } from '@/i18n/locales/en.js'
import { uk } from '@/i18n/locales/uk.js'
import datetimeFormats from './datetimeFormats.js'

const DEFAULT_LOCALE = 'en'
const FALLBACK_LOCALE = 'en'

export const Trans = {
  get currentLocale() {
    return i18n.global.locale.value
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Trans.currentLocale,
        ...to.params
      }
    }
  },

  isLocaleSupported(locale) {
    return i18n.global.availableLocales.includes(locale)
  },

  getUserLocale() {
    const locale = window.navigator.language || window.navigator.userLanguage || DEFAULT_LOCALE
    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0]
    }
  },

  getPersistedLocale() {
    const persistedLocale = localStorage.getItem('user-locale')
    if (Trans.isLocaleSupported(persistedLocale)) {
      return persistedLocale
    } else {
      return null
    }
  },

  guessDefaultLocale() {
    const userPersistedLocale = Trans.getPersistedLocale()
    if (userPersistedLocale) {
      return userPersistedLocale
    }
    const userPreferredLocale = Trans.getUserLocale()
    if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale
    }
    if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion
    }

    return DEFAULT_LOCALE
  },

  switchLanguage(newLocale) {
    Trans.currentLocale = newLocale
    document.querySelector('html').setAttribute('lang', newLocale)
    localStorage.setItem('user-locale', newLocale)
  },

  routeMiddleware(to, _from, next) {
    const paramLocale = to.params.locale
    if (!Trans.isLocaleSupported(paramLocale)) {
      return next(Trans.guessDefaultLocale())
    }
    Trans.switchLanguage(paramLocale)
    return next()
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    en: en,
    uk: uk
  },
  globalInjection: true,
  datetimeFormats
})
