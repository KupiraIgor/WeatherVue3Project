<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: Number,
    default: 0
  },
  errors: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="base-input" :class="{ _error: error }">
    <input
      class="base-input__field"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <span v-for="item of errors" :key="item.$uid" class="base-input__errors">
      <span>{{ item.$message }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.base-input {
  position: relative;

  &__field {
    border: 1px solid var(--color-gray);
    padding: 1.3rem 1.6rem;
    border-radius: 0.6rem;
    min-height: 5.4rem;
  }

  &._error {
    .base-input {
      &__field {
        border-color: var(--color-red);
      }
    }
  }

  &__errors {
    display: block;
    position: absolute;
    padding: 0.4rem 0 0 1.6rem;
    font-size: 1.2rem;
    line-height: 1.1;
    color: var(--color-red);

    span {
      display: block;
      white-space: nowrap;
    }
  }
}
</style>
