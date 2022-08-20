<script lang="ts">
  import { createModalEventDispatcher } from 'svelte-modals'
  import BaseModal from '$lib/site/BaseModal.svelte'

  export let isOpen: boolean

  export let title: string
  export let message: string
  export let options: any[]

  const dispatch = createModalEventDispatcher()

  interface $$Events {
    select: CustomEvent<{ value: string }>
  }
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
