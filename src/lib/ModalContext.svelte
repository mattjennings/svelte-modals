<script lang="ts" module>
  import { setContext, getContext } from 'svelte'

  const key = Symbol('modal')
  function setModal(modal: Modal) {
    setContext(key, modal)
  }

  export function getModal(): Modal {
    return getContext(key)
  }

  export function onBeforeClose(callback: () => void) {
    try {
      const modal = getModal()
      modal.onBeforeClose = callback
    } catch (e) {
      console.error('onBeforeClose must be called inside a component rendered by ModalStack')
      return
    }
  }
</script>

<script lang="ts">
  import type { Modal } from './modal.svelte'

  const { modal, children }: { modal: Modal; children: any } = $props()

  setModal(modal)
</script>

{@render children()}
