<script setup></script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <RouterLink to="/" class="header__logo">Weather</RouterLink>
        <nav class="header__nav">
          <RouterLink to="/" class="">Home</RouterLink>
          <RouterLink to="/selected" class="">Selected</RouterLink>
        </nav>
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
}
</style>
