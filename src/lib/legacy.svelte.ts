import { writable } from 'svelte/store'
import { modals as modalStack } from './modal-stack.svelte'
import { default as Modals } from './Modals.svelte'
import { StackedModal } from './stacked-modal.svelte'
import { getModal } from './ModalContext.svelte'

const modals = writable<StackedModal[]>([])

// sync rune to modals store
$effect.root(() => {
  modals.set(modalStack.stack)
})

const openModal = modalStack.open.bind(modalStack)
const closeModal = () => modalStack.close(1)
const closeModals = modalStack.close.bind(modalStack)
const closeAllModals = modalStack.closeAll.bind(modalStack)

function onBeforeClose(fn: () => void) {
  const modal = modalStack.stack[modalStack.stack.length - 1]

  if (!modal) {
    return
  }

  modal.onBeforeClose = fn
}

export { openModal, closeModal, closeModals, closeAllModals, modals, Modals, onBeforeClose }
