<script>
  let { isOpen, children, actions } = $props();
</script>

{#if isOpen}
  <div
    class="container"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="modal-content">
      <div class="modal-body">
        {@render children?.()}
      </div>
      <div class="modal-footer">
        {@render actions?.()}
      </div>
    </div>
  </div>
{/if}

<style>
  .container {
    position: fixed;
    z-index: var(--sl-z-index-modal);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    display: inline-block;
    align-items: flex-end;
    background: var(--sl-color-bg);
    border-radius: 0.5rem;
    text-align: left;
    overflow: hidden;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(0);
    transition: all 0.3s ease-in-out;    
    margin: 2rem auto;
    min-width: 240px;
  }
  .modal-body {
    padding: 1rem;
  }
  .modal-footer {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
</style>