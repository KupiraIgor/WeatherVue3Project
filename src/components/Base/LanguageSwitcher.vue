<script setup>
import { Trans } from '@/i18n/index.js'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()

const { availableLocales, locale } = useI18n()

const switchLanguage = (locale) => {
  Trans.switchLanguage(locale)
  try {
    router.replace({ params: { locale: locale } })
  } catch (e) {
    console.log(e)
    router.push('/')
  }
}
</script>

<template>
  <div class="switch-locale">
    <template v-for="(item, idx) of availableLocales">
      <button @click="switchLanguage(item)" :class="{ _active: locale === item }">
        {{ item }}
      </button>
      <span v-if="idx !== availableLocales.length - 1">/</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.switch-locale {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    &._active {
      font-weight: 600;
      pointer-events: none;
    }
  }
}
</style>
