<script>
  import { closeModal } from 'svelte-modals/legacy'

  const {
    // provided by <Modals />
    isOpen,
    title,
    message
  } = $props()
</script>

{#if isOpen}
  <div role="dialog" class="modal-container">
    <div class="modal-content">
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button onclick={() => closeModal()}>OK</button>
      </div>
    </div>
  </div>
{/if}
