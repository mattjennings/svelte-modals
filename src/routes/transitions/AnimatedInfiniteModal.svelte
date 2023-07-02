<script>
  import { createEventDispatcher } from 'svelte'

  import { closeModal, modals } from 'svelte-modals'
  import { fade, fly } from 'svelte/transition'

  const dispatch = createEventDispatcher()

  export let isOpen
  export let title
  export let message
  export let openAnother

  export let transition = 'fade'
  export let exitBeforeEnter = false

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
    class="modal"
    transition:_transition|global={transitionArgs}
    on:introstart={() => {
      if (exitBeforeEnter) {
        dispatch('introstart')
      }
    }}
    on:outroend={() => {
      if (exitBeforeEnter) {
        dispatch('outroend')
      }
    }}
  >
    <div class="contents">
      <h2>{title} #{index}</h2>
      <p>{message}</p>
      <div class="actions">
        <button on:click={closeModal}>Close</button>
        <button on:click={openAnother}>Open</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 320px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  h2 {
    text-align: center;
    font-size: 24px;
  }

  p {
    text-align: center;
    margin-top: 16px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
  }
</style>
