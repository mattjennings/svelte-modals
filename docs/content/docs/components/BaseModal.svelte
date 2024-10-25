<script>
  let { isOpen, children, actions } = $props();
</script>

{#if isOpen}
  <div
    class="modal-container"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="modal-content">      
      {@render children?.()}      
      <div class="modal-actions">
        {@render actions?.()}
      </div>
    </div>
  </div>
{/if}
