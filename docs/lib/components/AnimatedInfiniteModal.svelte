<script>
  import { modals, exitBeforeEnter } from 'svelte-modals'
  import { fade, fly } from 'svelte/transition'

  let { isOpen, close, title, message, openAnother, withExitBeforeEnter } = $props()

  let _use = withExitBeforeEnter ? exitBeforeEnter : () => undefined
</script>

{#if isOpen}
  <div role="dialog" class="modal-container" use:_use transition:fade|global>
    <div class="modal-content">
      <h2>{title} #{modals.stack.length}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button onclick={openAnother}>Open</button>
        <button onclick={() => close()}>Close</button>
      </div>
    </div>
  </div>
{/if}
