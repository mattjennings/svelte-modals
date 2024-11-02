<script>
  import BaseModal from './BaseModal.svelte'

  let { isActive, message, close } = $props()
</script>

<BaseModal {isActive}>
  <h3>Alert</h3>
  <p>
    {message}
  </p>
  {#snippet actions()}
    <button
      type="button"
      onclick={() => {
        close()
      }}
    >
      OK
    </button>
  {/snippet}
</BaseModal>
