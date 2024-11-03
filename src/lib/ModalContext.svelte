<script lang="ts" module>
  import { setContext, getContext } from 'svelte'
  import { on } from 'svelte/events'

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
      console.error('onBeforeClose must be called inside a component rendered by Modals')
      return
    }
  }

  export function exitBeforeEnter(node: HTMLElement) {
    const modal = getModal()
    modal.exitBeforeEnter = true

    const onoutroend = on(node, 'outroend', () => {
      // unsure why, but without this timeout sometimes
      // the modal is briefly shown before being removed
      // started happening with svelte 5
      setTimeout(() => {
        modal.modals.transitioning = false
      })
    })

    $effect(() => {
      return () => {
        onoutroend()
      }
    })
  }
</script>

<script lang="ts">
  import type { Modal } from './modal.svelte'

  const { modal, children }: { modal: Modal; children: any } = $props()

  setModal(modal)
</script>

{@render children()}
