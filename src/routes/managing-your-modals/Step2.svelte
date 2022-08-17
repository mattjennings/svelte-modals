<script>
  import BaseModal from './BaseModal.svelte'
  import { closeAllModals, closeModal } from 'svelte-modals'

  export let isOpen
</script>

<BaseModal {isOpen}>
  <h3 class="text-xl leading-6 font-medium text-gray-900" id="modal-title">Step 2</h3>
  <p class="text-gray-500 pt-2">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
    pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
  </p>

  <svelte:fragment slot="actions">
    <button type="button" on:click={closeModal}> Back </button>
    <button type="button" on:click={closeAllModals}> Done </button>
  </svelte:fragment>
</BaseModal>
