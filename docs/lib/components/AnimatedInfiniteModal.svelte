<script>
  import { closeModal, modals } from 'svelte-modals/legacy'
  import { fade, fly } from 'svelte/transition'

  let { isOpen, title, message, openAnother, withExitBeforeEnter, exitBeforeEnter } = $props()

  let index = $modals.length

  let _use = withExitBeforeEnter ? exitBeforeEnter : () => undefined
</script>

{#if isOpen}
  <div role="dialog" class="modal-container" use:_use transition:fade|global>
    <div class="modal-content">
      <h2>{title} #{index}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button onclick={openAnother}>Open</button>
        <button onclick={closeModal}>Close</button>
      </div>
    </div>
  </div>
{/if}
