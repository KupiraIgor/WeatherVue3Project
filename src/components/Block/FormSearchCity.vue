<script setup>
import { onMounted, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { i18n } from '@/i18n'
import { required, minLength, helpers } from '@vuelidate/validators'
import { useCitiesStore } from '@/stores/cities.js'
import Input from '@/components/Base/Input.vue'
import Button from '@/components/Base/Button.vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['loading'])

const store = useCitiesStore()
const formData = ref({ city: '' })
const isFocusInput = ref(false)

const rulesValidate = {
  city: {
    required: helpers.withMessage(i18n.global.t('value_is_required'), required),
    minLength: helpers.withMessage(i18n.global.t('should_be_at_least_3'), minLength(3))
  }
}
const v$ = useVuelidate(rulesValidate, formData.value)

const data = ref(null)
const loading = ref(false)
const isShowSelect = ref(false)
const isEmpty = ref(false)

const onSubmitSearchCity = async () => {
  loading.value = true
  const result = await v$.value.$validate()

  if (result) {
    try {
      data.value = await store.getCitiesForSearch(formData.value.city)
      isShowSelect.value = true
      isEmpty.value = !data.value.count
    } catch (err) {
      console.error(err)
    }
  }
  loading.value = false
}

const onClickUpdateCity = async (id) => {
  emit('loading', true)
  try {
    await store.getUpdateWeatherFromSearch(id, props.id)
  } catch (err) {
    console.error(err)
  }
  emit('loading', false)
}

onMounted(() => {
  document.addEventListener('click', () => {
    if (isShowSelect.value) {
      isShowSelect.value = false
    }
  })
})
</script>

<template>
  <form class="form-city" @submit.prevent="onSubmitSearchCity">
    <div class="form-city__wrap">
      <Input
        v-model="formData.city"
        :error="v$.city.$errors.length"
        :errors="v$.city.$errors"
        input-mode="search"
        :placeholder="$t('enter_city')"
        @focus="isFocusInput = true"
        @blur="isFocusInput = false"
      />
      <div v-if="isShowSelect" class="form-city__select" :class="{ _focus: isFocusInput }">
        <div v-if="isEmpty" class="form-city__empty">{{ $t('nothing_found') }}</div>
        <template v-else>
          <button
            v-for="item of data.list"
            class="form-city__item"
            @click="onClickUpdateCity(item.id)"
          >
            <span>{{ item.name }}, {{ item.sys.country }}</span>
            <img
              :src="`https://openweathermap.org/images/flags/${item.sys.country.toLowerCase()}.png`"
              alt=""
            /></button
        ></template>
      </div>
    </div>
    <Button type="submit" :loading="loading">{{ $t('search') }}</Button>
  </form>
</template>

<style lang="scss">
.form-city {
  display: flex;

  &__wrap {
    position: relative;
  }

  .base-input {
    &__field {
      border-radius: 0.6rem 0 0 0.6rem;
      border-right: none;
    }
  }

  .base-button {
    position: relative;
    z-index: 2;
    border-radius: 0 0.6rem 0.6rem 0;
  }

  &__select {
    position: absolute;
    z-index: 1;
    max-height: 15rem;
    overflow-y: auto;
    width: calc(100% + 1px);
    border-radius: 0 0 0.6rem 0.6rem;
    border: 1px solid var(--color-gray);
    border-top: none;
    top: 4.8rem;
    background: var(--color-white);
    padding: 0.5rem;
    transition: var(--easing) var(--duration);

    &._focus {
      border-color: var(--color-black);
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 1.1rem;
    transition: var(--duration) var(--easing);
    border-radius: 0.4rem;

    &:hover {
      background: var(--color-gray-2);
    }
  }

  &__empty {
    padding: 0.5rem 1.1rem;
  }

  @media (max-width: 768px) {
    width: 100%;

    &__wrap {
      width: 100%;

      .base-input__field {
        width: 100%;
      }
    }
  }

  @media (max-width: 500px) {
    &__select {
      top: 3.9rem;
    }
  }
}
</style>
