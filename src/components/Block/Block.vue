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
const modalDeleteEl = ref()
const modalMaxEl = ref()
const modalDeleteFavEl = ref()
const loading = ref(false)

const onShowModalDelete = () => {
  modalDeleteEl.value.open()
}

const onShowModalDeleteFav = () => {
  modalDeleteFavEl.value.open()
}

const onShowModalMax = () => {
  modalMaxEl.value.open()
}

const onCloseModalDelete = () => {
  modalDeleteEl.value.close()
}

const onCloseModalDeleteFav = () => {
  modalDeleteFavEl.value.close()
}

const onDeleteBlock = () => {
  store.deleteCity(props.city.id)
  onCloseModalDelete()
}

const onAddToFavorites = () => {
  const response = store.addToFavorites(props.city)
  if (!response) {
    onShowModalMax()
  }
}

const onDeleteFromFavorites = () => {
  store.deleteFromFavorites(props.city)
  onCloseModalDeleteFav()
}
</script>

<template>
  <div class="block" :class="{ _fav: isFav }">
    <div class="block__header" :class="{ _hide: isHideForm }">
      <FormSearchCity v-if="!isHideForm" :id="city.id" @loading="(arg) => (loading = arg)" />
      <div class="block__buttons">
        <template v-if="city.idRes">
          <Button v-if="isFav" color="red" @click="onShowModalDeleteFav" class="block__btn">
            {{ $t('delete_from') }}
          </Button>
          <Button v-else @click="onAddToFavorites" class="block__btn">
            {{ $t('to_favorites') }}
          </Button>
        </template>
        <Button v-if="!isHideForm" color="red" @click="onShowModalDelete" class="block__btn">
          {{ $t('delete') }}
        </Button>
      </div>
    </div>
    <div v-if="city.idRes" class="block__body">
      <BlockBodyInfo :city="city" />
    </div>
    <Modal ref="modalDeleteEl">
      <div class="block__modal">
        <div class="block__modal-text">
          <template v-if="city.name">
            {{ $t('you_definitely_want_to_delete') }} {{ city.name }}?
          </template>
          <template v-else>{{ $t('you_definitely_want') }}</template>
        </div>
        <div class="block__modal-buttons">
          <Button @click="onDeleteBlock">{{ $t('yes') }}</Button>
          <Button @click="onCloseModalDelete">{{ $t('no') }}</Button>
        </div>
      </div>
    </Modal>
    <Modal ref="modalDeleteFavEl">
      <div class="block__modal">
        <div class="block__modal-text">
          {{ $t('you_definitely_want_to_delete_from', { city: city.name }) }}
        </div>
        <div class="block__modal-buttons">
          <Button @click="onDeleteFromFavorites">{{ $t('yes') }}</Button>
          <Button @click="onCloseModalDeleteFav">{{ $t('no') }}</Button>
        </div>
      </div>
    </Modal>
    <Modal ref="modalMaxEl">
      <div class="block__modal-max">{{ $t('maximum_cities_5') }}</div>
    </Modal>
    <Loader v-if="loading" bg />
  </div>
</template>

<style lang="scss" scoped>
.block {
  position: relative;
  border: 1px solid transparent;
  border-radius: 1rem;
  padding: 2.5rem;
  box-shadow: 0 1rem 3.5rem rgba(23, 39, 80, 0.3);

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
    &-max {
      font-size: 2rem;
      text-align: center;
    }

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

  @media (max-width: 768px) {
    &__header {
      flex-direction: column-reverse;
      gap: 2rem;
    }

    &__buttons {
      width: 100%;
    }

    &__btn {
      flex: 1 1 50%;
    }
  }

  @media (max-width: 500px) {
    &__buttons {
      flex-wrap: wrap;
    }
  }
}
</style>
