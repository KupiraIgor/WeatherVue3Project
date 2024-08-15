<script setup>
import { ref } from 'vue'
import { useCitiesStore } from '@/stores/cities.js'
import FormSearchCity from '@/components/Block/FormSearchCity.vue'
import Button from '@/components/Base/Button.vue'
import Modal from '@/components/Base/Modal.vue'
import BlockBodyInfo from '@/components/Block/BlockWeather.vue'

const props = defineProps({
  city: {
    type: Object,
    required: true
  }
})

const store = useCitiesStore()
const modalEl = ref()

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
      <FormSearchCity :id="city.id" />
      <div class="block__buttons">
        <Button>У вибране</Button>
        <Button color="red" @click="onShowModal">Delete</Button>
      </div>
    </div>
    <div class="block__body">
      <BlockBodyInfo :city="city" />
    </div>
    <Modal ref="modalEl">
      <div class="block__modal">
        <div class="block__modal-text">
          You definitely want to delete the weather for {{ city.name }}?
        </div>
        <div class="block__modal-buttons">
          <Button @click="onDeleteBlock">Yes</Button>
          <Button @click="onCloseModal">No</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="scss" scoped>
.block {
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
