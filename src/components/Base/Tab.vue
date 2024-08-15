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

  &._active {
    background: var(--color-black);
    color: var(--color-white);
    font-weight: 500;
    pointer-events: none;
  }
}
</style>
