<script setup>
import Loader from '@/components/Base/Loader.vue'

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
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="base-button"
    :class="[`_${color}`, { _loading: loading }]"
    @click="emit('click')"
  >
    <Loader v-if="loading" />
    <span><slot /></span>
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  position: relative;
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
  overflow: hidden;

  .base-loader {
    transform: scale(0.8);
  }

  &._loading {
    pointer-events: none;
    opacity: 0.7;

    span {
      opacity: 0;
    }
  }

  &._black {
    background: var(--color-black);
  }

  &._red {
    background: var(--color-red);
  }

  &._orange {
    background: var(--color-orange);
  }
}
</style>
