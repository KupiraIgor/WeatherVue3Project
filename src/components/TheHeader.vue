<script setup>
import LanguageSwitcher from '@/components/Base/LanguageSwitcher.vue'
import { Trans } from '@/i18n/index.js'
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <RouterLink :to="Trans.i18nRoute({ name: 'home' })" class="header__logo">
          Weather
        </RouterLink>
        <div class="header__wrap">
          <LanguageSwitcher />
          <nav class="header__nav">
            <RouterLink :to="Trans.i18nRoute({ name: 'home' })" class="header__link">
              {{ $t('home') }}
            </RouterLink>
            <RouterLink :to="Trans.i18nRoute({ name: 'favorites' })" class="header__link">
              {{ $t('favorites') }}
            </RouterLink>
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

  &__link {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      right: 0;
      width: 0;
      height: 1px;
      background: var(--color-black);
      transition: var(--easing) var(--duration);
    }

    &.router-link-exact-active {
      font-weight: 500;
      pointer-events: none;
    }

    &:hover {
      &::after {
        width: 100%;
        right: auto;
        left: 0;
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
