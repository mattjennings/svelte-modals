<script>
  import { useModals } from '$lib/index'
  import AlertModal from './_AlertModal.svelte'
  const { stack, openModal } = useModals() 

  function showAlert() {
    openModal(AlertModal, { title: 'Alert', message: 'This is an alert', openNewModal: showAlert })
  }
</script>

<button on:click={showAlert}>open</button>
