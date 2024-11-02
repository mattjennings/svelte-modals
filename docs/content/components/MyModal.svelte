<script>
  const { isActive, close, title, message } = $props()
</script>

{#if isActive}
  <div role="dialog" class="modal-container">
    <div class="modal-content">
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button onclick={() => close()}>OK</button>
      </div>
    </div>
  </div>
{/if}
