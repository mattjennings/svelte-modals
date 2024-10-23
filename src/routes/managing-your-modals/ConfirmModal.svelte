<script>
  import { closeModal } from 'svelte-modals'
  import BaseModal from './BaseModal.svelte'


  let {
    isOpen,
    message,
    onConfirm,
    labels = { cancel: 'Cancel', confirm: 'OK' }
  } = $props();
</script>

<BaseModal {isOpen}>
  <h3 class="text-xl text-center leading-6 font-medium text-gray-900" id="modal-title">Confirm</h3>
  <p class="text-gray-500 text-center py-4">
    {message}
  </p>

  {#snippet actions()}
      <button type="button" onclick={closeModal}> {labels?.cancel} </button>
      <button type="button" onclick={onConfirm}> {labels?.confirm} </button>
  {/snippet}
</BaseModal>
