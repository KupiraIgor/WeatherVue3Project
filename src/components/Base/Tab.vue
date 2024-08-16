<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button class="tab" @click="emit('click')"><slot /></button>
</template>

<style lang="scss" scoped>
.tab {
  background: var(--color-gray);
  padding: 0.3rem 1rem;
  border-radius: 2rem;
  min-width: 8rem;
  box-shadow: 0 0.7rem 2rem rgba(0, 0, 0, 0.3);
  transition: var(--easing) var(--duration);

  &._active {
    background: var(--color-black);
    color: var(--color-white);
    font-weight: 500;
    pointer-events: none;
  }

  &:hover {
    box-shadow: none;
  }
}
</style>
