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
  },
  isFav: {
    type: Boolean,
    default: false
  },
  isHideForm: {
    type: Boolean,
    default: false
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

const onAddToFavorites = () => {
  store.addToFavorites(props.city)
}

const onDeleteFromFavorites = () => {
  store.deleteFromFavorites(props.city)
}
</script>

<template>
  <div class="block" :class="{ _fav: isFav }">
    <div class="block__header" :class="{ _hide: isHideForm }">
      <FormSearchCity v-if="!isHideForm" :id="city.id" @loading="(arg) => (loading = arg)" />
      <div class="block__buttons">
        <template v-if="city.idRes">
          <Button v-if="isFav" color="red" @click="onDeleteFromFavorites">
            {{ $t('delete_from') }}
          </Button>
          <Button v-else @click="onAddToFavorites">{{ $t('to_favorites') }}</Button>
        </template>

        <Button v-if="!isHideForm" color="red" @click="onShowModal">{{ $t('delete') }}</Button>
      </div>
    </div>
    <div v-if="city.idRes" class="block__body">
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

  &._fav {
    border-color: var(--color-orange);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 3rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--color-gray);

    &._hide {
      justify-content: end;
    }
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
