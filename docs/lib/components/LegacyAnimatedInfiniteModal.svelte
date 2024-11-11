<script>
  import { createEventDispatcher } from 'svelte'

  import { closeAllModals, closeModal, modals } from 'svelte-modals/legacy'
  import { fade, fly } from 'svelte/transition'

  const dispatch = createEventDispatcher()

  export let isOpen
  export let title
  export let message
  export let openAnother

  export let transition = 'fade'
  export let withExitBeforeEnter = false

  let _transition = transition === 'fade' ? fade : fly
  let transitionArgs =
    transition === 'fade'
      ? {}
      : {
          y: 200
        }
  let index = $modals.length
</script>

{#if isOpen}
  <div
    role="dialog"
    class="modal-container"
    transition:_transition|global={transitionArgs}
    on:introstart={() => {
      if (withExitBeforeEnter) {
        dispatch('introstart')
      }
    }}
    on:outroend={() => {
      if (withExitBeforeEnter) {
        dispatch('outroend')
      }
    }}
  >
    <div class="modal-content">
      <h2>{title} #{index}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button on:click={openAnother}>Open</button>
        <button on:click={closeModal}>Close</button>
        <button on:click={closeAllModals}>Close All</button>
      </div>
    </div>
  </div>
{/if}
