<script>
  import { closeModal } from 'svelte-modals'
  import BaseModal from './BaseModal.svelte'

  let {
    isOpen,
    message,
    onconfirm,
    oncancel = closeModal,
    labels = { cancel: 'Cancel', confirm: 'OK' }
  } = $props();
</script>

<BaseModal {isOpen}>
  <h3>Confirm</h3>
  <p>
    {message}
  </p>

  {#snippet actions()}
      <button type="button" onclick={oncancel}> {labels?.cancel} </button>
      <button type="button" onclick={onconfirm}> {labels?.confirm} </button>
  {/snippet}
</BaseModal>

<style>
  h3 {
    text-align: center;
    font-size: 24px;
  }

  p {
    text-align: center;
    margin-top: 16px;
  }
  </style>