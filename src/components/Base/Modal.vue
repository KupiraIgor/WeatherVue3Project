<script setup>
import { onMounted, ref } from 'vue'

const rootEl = ref()
const bodyEl = ref()

const isShow = ref(false)

const open = () => {
  if (bodyEl.value) {
    isShow.value = true
  }
}

const close = () => {
  if (bodyEl.value) {
    isShow.value = false
  }
}

onMounted(() => {
  document.addEventListener('mouseup', (e) => {
    if (e && bodyEl.value && !bodyEl.value.contains(e.target)) {
      close()
    }
  })
})

defineExpose({ open, close })
</script>

<template>
  <div v-show="isShow" ref="rootEl" class="modal">
    <div ref="bodyEl" class="modal__body">
      <slot />
      <button type="button" class="modal__btn" @click="close"></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(176, 176, 176, 0.25);

  &__body {
    position: relative;
    width: 100%;
    max-width: 530px;
    margin: 0 20px;
    padding: 65px 55px;
    border-radius: 10px;
    background: var(--color-white);
    box-shadow: 0 2px 15px rgb(0 0 0 / 15%);
    transform: scale(0.9);
  }

  &__btn {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    height: 30px;
    background-image: url("data:image/svg+xml,%3Csvg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.755 0C13.2975 0 15 1.785 15 4.44V10.5682C15 13.2157 13.2975 15 10.755 15H4.2525C1.71 15 0 13.2157 0 10.5682V4.44C0 1.785 1.71 0 4.2525 0H10.755ZM9.7575 5.22825C9.5025 4.9725 9.09 4.9725 8.8275 5.22825L7.5 6.5625L6.165 5.22825C5.9025 4.9725 5.49 4.9725 5.235 5.22825C4.98 5.48325 4.98 5.90325 5.235 6.1575L6.57 7.49325L5.235 8.82075C4.98 9.08325 4.98 9.49575 5.235 9.75C5.3625 9.8775 5.535 9.94575 5.7 9.94575C5.8725 9.94575 6.0375 9.8775 6.165 9.75L7.5 8.42325L8.835 9.75C8.9625 9.88575 9.1275 9.94575 9.2925 9.94575C9.465 9.94575 9.63 9.8775 9.7575 9.75C10.0125 9.49575 10.0125 9.08325 9.7575 8.82825L8.4225 7.49325L9.7575 6.1575C10.0125 5.90325 10.0125 5.48325 9.7575 5.22825Z' fill='%23999999'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: center;
    transition: 0.3s ease;
  }
  @media (max-width: 550px) {
    &__body {
      padding: 35px 25px;
    }
  }
}
</style>
