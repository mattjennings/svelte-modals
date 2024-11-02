<script>
  import BaseModal from './BaseModal.svelte'

  let { isOpen, content, close } = $props()
</script>

<BaseModal {isOpen}>
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
