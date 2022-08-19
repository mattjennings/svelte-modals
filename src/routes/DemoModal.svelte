<script>
  import { closeAllModals, closeModal, modals, createModalEventDispatcher } from 'svelte-modals'
  import { cubicOut } from 'svelte/easing'
  import { fade, fly, scale } from 'svelte/transition'

  export let isOpen

  const dispatch = createModalEventDispatcher()

  const title = `Alert #${$modals.length}`
  const message = 'This is an alert'
  const stackIndex = $modals.length

  const transitions = [
    [fade, {}],
    [scale, {}],
    [spin, { duration: 500 }]
  ]

  const [transition, transitionArgs] = transitions[stackIndex % transitions.length]

  function spin(node, { duration }) {
    return {
      duration,
      css: (t) => {
        const eased = cubicOut(t)
        return `
					transform: scale(${eased}) rotate(${eased * 360}deg);
					opacity: ${eased};
				`
      }
    }
  }
</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:transition={transitionArgs} on:introstart on:outroend>
    <div class="contents">
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="actions">
        <button on:click={closeModal}>Close</button>
        {#if stackIndex > 1}
          <button on:click={closeAllModals}>Close All</button>
        {/if}
        <button on:click={() => dispatch('open')}>Open Another</button>
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
    min-width: 240px;
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
    gap: 8px;
  }
</style>
