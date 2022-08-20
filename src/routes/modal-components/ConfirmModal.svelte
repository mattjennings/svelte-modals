<script lang="ts">
  import type { CloseProp } from 'svelte-modals'
  import BaseModal from '$lib/site/BaseModal.svelte'

  export let close: CloseProp<boolean>
  export let isOpen: boolean
  export let message: string
</script>

<BaseModal {isOpen}>
  <h3 class="text-xl text-center leading-6 font-medium text-gray-900" id="modal-title">Confirm</h3>
  <p class="text-gray-500 text-center py-4">
    {message}
  </p>

  <svelte:fragment slot="actions">
    <button type="button" on:click={() => close(false)}> No </button>
    <button type="button" on:click={() => close(true)}> Yes </button>
  </svelte:fragment>
</BaseModal>
