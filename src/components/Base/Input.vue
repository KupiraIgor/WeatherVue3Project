<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="base-input">
    <input
      class="base-input__field"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  &__field {
    border: 1px solid var(--color-gray);
    padding: 1.3rem 1.6rem;
    border-radius: 0.6rem;
    min-height: 5.4rem;
  }
}
</style>
