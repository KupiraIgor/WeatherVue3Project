<script setup>
import { ref } from 'vue'
import { useCitiesStore } from '@/stores/cities.js'
import FormSearchCity from '@/components/Block/FormSearchCity.vue'
import Button from '@/components/Base/Button.vue'
import Modal from '@/components/Base/Modal.vue'
import BlockBodyInfo from '@/components/Block/BlockWeather.vue'
import Loader from '@/components/Base/Loader.vue'

const props = defineProps({
  city: {
    type: Object,
    required: true
  }
})

const store = useCitiesStore()
const modalEl = ref()
const loading = ref(false)

const onShowModal = () => {
  modalEl.value.open()
}

const onCloseModal = () => {
  modalEl.value.close()
}

const onDeleteBlock = () => {
  store.deleteCity(props.city.id)
  onCloseModal()
}
</script>

<template>
  <div class="block">
    <div class="block__header">
      <FormSearchCity :id="city.id" @loading="(arg) => (loading = arg)" />
      <div class="block__buttons">
        <Button>{{ $t('to_favorites') }}</Button>
        <Button color="red" @click="onShowModal">{{ $t('delete') }}</Button>
      </div>
    </div>
    <div class="block__body">
      <BlockBodyInfo :city="city" />
    </div>
    <Modal ref="modalEl">
      <div class="block__modal">
        <div class="block__modal-text">
          {{ $t('you_definitely_want_to_delete') }} {{ city.name }}?
        </div>
        <div class="block__modal-buttons">
          <Button @click="onDeleteBlock">{{ $t('yes') }}</Button>
          <Button @click="onCloseModal">{{ $t('no') }}</Button>
        </div>
      </div>
    </Modal>
    <Loader v-if="loading" bg />
  </div>
</template>

<style lang="scss" scoped>
.block {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-gray);
  border-radius: 1rem;
  padding: 2.5rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 3rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-gray);
  }

  &__buttons {
    display: flex;
    gap: 2rem;
  }

  &__modal {
    &-text {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 3rem;
    }

    &-buttons {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
  }
}
</style>
