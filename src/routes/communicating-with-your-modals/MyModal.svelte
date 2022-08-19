<script>
  import { createModalEventDispatcher } from 'svelte-modals'
  import BaseModal from '$lib/site/BaseModal.svelte'

  export let isOpen
  export let title
  export let message
  export let options

  const dispatch = createModalEventDispatcher()
</script>

<BaseModal {isOpen}>
  <h3 class="text-xl text-center leading-6 font-medium text-gray-900" id="modal-title">
    {title}
  </h3>
  <p class="text-gray-500 text-center py-4">
    {message}
  </p>

  <svelte:fragment slot="actions">
    {#each options as option}
      <button on:click={() => dispatch('select', option)}>{option}</button>
    {/each}
  </svelte:fragment>
</BaseModal>
