import { writable } from 'svelte/store'
import { modals as modalStack } from './modal-stack.svelte'
import { default as Modals } from './Modals.svelte'
import { StackedModal } from './stacked-modal.svelte'

const openModal = modalStack.open.bind(modalStack)
const closeModal = () => modalStack.close(1)
const closeAllModals = modalStack.closeAll.bind(modalStack)
const modals = writable<StackedModal[]>([])

$effect.root(() => {
  modals.set(modalStack.stack)
})

export { openModal, closeModal, closeAllModals, modals, Modals }
