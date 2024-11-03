<script>
  import BaseModal from './BaseModal.svelte'
  import { onBeforeClose } from 'svelte-modals'

  let {
    isOpen,
    close,
    message,
    onconfirm,
    oncancel,
    style,
    labels = { cancel: 'Cancel', confirm: 'OK' }
  } = $props()

  let canClose = $state(true)
  onBeforeClose(() => {
    return canClose
  })
</script>

<BaseModal {isOpen} {style}>
  <h3>Preventing Close</h3>

  <label
    ><input type="checkbox" name="checkbox" value="1" bind:checked={canClose} /> Can close</label
  >

  {#snippet actions()}
    <button
      type="button"
      onclick={() => {
        if (onconfirm) {
          onconfirm?.()
        } else {
          close('confirm')
        }
      }}
    >
      {labels?.confirm}
    </button>
    <button
      type="button"
      onclick={() => {
        if (oncancel) {
          oncancel?.()
        } else {
          close('cancel')
        }
      }}
    >
      {labels?.cancel}
    </button>
  {/snippet}
</BaseModal>
