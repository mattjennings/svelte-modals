<script>
  import BaseModal from './BaseModal.svelte'

  let {
    isOpen,
    close,
    message,
    onconfirm,
    oncancel,
    style,
    labels = { cancel: 'Cancel', confirm: 'OK' }
  } = $props()
</script>

<BaseModal {isOpen} {style}>
  <h3>Confirm</h3>
  <p>
    {message}
  </p>

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
