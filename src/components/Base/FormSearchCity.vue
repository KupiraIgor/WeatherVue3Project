<script setup>
import Input from '@/components/Base/Input.vue'
import Button from '@/components/Base/Button.vue'
import { onMounted, ref } from 'vue'
import { useCitiesStore } from '@/stores/cities.js'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

const store = useCitiesStore()

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const formData = ref({ city: '' })

const rulesValidate = { city: { required, minLength: minLength(3) } }

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
      data.value = await store.getDataForCity(formData.value.city)
      isShowSelect.value = true
      isEmpty.value = !data.value.count
    } catch (err) {
      console.error(err)
    }
  }

  loading.value = false
}

const onClickUpdateCity = async (name) => {
  loading.value = true
  try {
    await store.getUpdateWeatherFromSearch(name, props.id)
  } catch (err) {
    console.error(err)
  }
  loading.value = false
}

onMounted(() => {
  document.addEventListener('click', (e) => {
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
        placeholder="Введіть місто"
      />
      <div v-if="isShowSelect" class="form-city__select">
        <div v-if="isEmpty" class="form-city__empty">Nothing found</div>
        <template v-else>
          <button
            v-for="item of data.list"
            class="form-city__item"
            @click="onClickUpdateCity(item.name)"
          >
            <span>{{ item.name }}, {{ item.sys.country }}</span>
            <img
              :src="`https://openweathermap.org/images/flags/${item.sys.country.toLowerCase()}.png`"
              alt=""
            /></button
        ></template>
      </div>
    </div>
    <Button type="submit">Search</Button>
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
    padding: 0.5rem;
  }
}
</style>
