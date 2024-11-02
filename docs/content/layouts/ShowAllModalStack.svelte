<script>
  import { ModalStack } from 'svelte-modals'
</script>

<ModalStack>
  {#snippet backdrop({ close })}
    <div class="backdrop" onclick={() => close()}></div>
  {/snippet}

  {#snippet modal(modal, modals)}
    <modal.component {...modal.props} isOpen={modals.stack.length > 0} />
  {/snippet}
</ModalStack>
