import { writable } from 'svelte/store'
import { ModalsContext } from './modals-context.svelte'
import Modals, { modals } from './Modals.svelte'
import { Modal } from './modal.svelte'

const modalsStore = writable<Modal[]>([])
const actionStore = writable<ModalsContext['action']>(null)

// sync rune to modals store
$effect.root(() => {
  modalsStore.set(modals.stack)
})

// sync action to action store
$effect.root(() => {
  actionStore.set(modals.action)
})

const openModal: (typeof modals)['open'] = async (...args) => {
  try {
    return await modals.open(...args)
  } catch (e) {
    if (e instanceof Error && e.message === 'Current modal prevented closing') {
      console.error(e)
    } else {
      throw e
    }
  }
}

const closeModal = () => modals.close(1)
const closeModals = modals.close.bind(modals)
const closeAllModals = modals.closeAll.bind(modals)

function onBeforeClose(fn: () => void) {
  const modal = modals.stack[modals.stack.length - 1]

  if (!modal) {
    return
  }

  modal.onBeforeClose = fn
}

export {
  openModal,
  closeModal,
  closeModals,
  closeAllModals,
  modalsStore as modals,
  actionStore as action,
  Modals,
  onBeforeClose
}
