import { i18n } from '@/i18n/index.js'

export const useGetWindDescription = (speed) => {
  if (speed <= 0.2) return i18n.global.t('calm')
  if (speed <= 1.5) return i18n.global.t('light_air')
  if (speed <= 3.3) return i18n.global.t('light_breeze')
  if (speed <= 5.4) return i18n.global.t('gentle_breeze')
  if (speed <= 7.9) return i18n.global.t('moderate_breeze')
  if (speed <= 10.7) return i18n.global.t('fresh_breeze')
  return i18n.global.t('strong_wind')
}
