<script>
  import { closeModal } from 'svelte-modals'
  import BaseModal from './BaseModal.svelte'

  let { isOpen, message, onconfirm } = $props()
</script>

<BaseModal {isOpen}>
  <h3>
    {message}
  </h3>

  {#snippet actions()}
    <div />
    <button type="button" onclick={() => {
      closeModal()
      onconfirm()
    }}> OK </button>
  {/snippet}
</BaseModal>

<style>
  h3 {
    text-align: center;
    font-size: 24px;
  }
</style>
