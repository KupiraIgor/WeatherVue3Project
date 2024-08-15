<script setup>
defineProps({
  type: {
    type: String,
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: 'black'
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="base-button"
    :class="`_${color}`"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 8rem;
  min-height: 5.4rem;
  padding: 1rem 2rem;
  font-weight: 600;
  background: var(--color-black);
  color: var(--color-white);
  border-radius: 0.6rem;

  &._black {
    background: var(--color-black);
  }

  &._red {
    background: var(--color-red);
  }
}
</style>
