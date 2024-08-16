<script setup>
import { i18n } from '@/i18n'

const changeLanguage = (locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('appLanguage', locale)
  // window.location.reload()
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <RouterLink to="/" class="header__logo">Weather</RouterLink>
        <div class="header__wrap">
          <div class="header__locale">
            <button
              @click="changeLanguage('en')"
              :class="{ _active: i18n.global.locale.value === 'en' }"
            >
              en
            </button>
            <span>/</span>
            <button
              @click="changeLanguage('uk')"
              :class="{ _active: i18n.global.locale.value === 'uk' }"
            >
              uk
            </button>
          </div>
          <nav class="header__nav">
            <RouterLink to="/" class="">{{ $t('home') }}</RouterLink>
            <RouterLink to="/favorites" class="">{{ $t('favorites') }}</RouterLink>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 2rem 0;

  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__nav {
    display: flex;
    gap: 2rem;
    align-items: center;
    font-size: 2rem;
  }

  &__logo {
    font-size: 3rem;
    background: ghostwhite;
    padding: 0.5rem 2rem;
    border-radius: 1.5rem;
  }

  &__locale {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      &._active {
        font-weight: 600;
      }
    }
  }

  &__wrap {
    display: flex;
    align-items: center;
    gap: 3rem;
  }
}
</style>
