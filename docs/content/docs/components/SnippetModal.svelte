<script>
  import BaseModal from './BaseModal.svelte'

  let { isActive, content, close } = $props()
</script>

<BaseModal {isActive}>
  <p>
    {@render content()}
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
