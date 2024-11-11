<script>
  import { fade } from 'svelte/transition'

  let { isOpen, close, title, message } = $props()
</script>

{#if isOpen}
  <div role="dialog" class="modal-container" transition:fade|global>
    <div class="modal-content">
      <h2>{title}</h2>
      <p>{message}</p>

      <div class="modal-actions">
        <button onclick={() => close()}>OK</button>
      </div>
    </div>
  </div>
{/if}
