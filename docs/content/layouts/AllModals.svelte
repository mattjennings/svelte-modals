<script>
  import { Modals } from 'svelte-modals'
</script>

<Modals>
  {#snippet backdrop({ close })}
    <div class="backdrop" onclick={() => close()}></div>
  {/snippet}

  {#snippet modal(modal, modals)}
    <modal.component {...modal.props} isOpen={modals.stack.length > 0} />
  {/snippet}
</Modals>
