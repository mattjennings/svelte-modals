<script>
  import { Modals, closeModal, modals } from 'svelte-modals'

  function portal(node) {    
    document.body.appendChild(node);
    return {
      destroy() {
        node.remove();
      }
    }
  }
</script>

<div use:portal>
  <Modals>
    {#snippet backdrop()}
      <div
        class="backdrop"
        onclick={closeModal}
      ></div>
    {/snippet}
  </Modals>
</div>

<style>
  .backdrop {
    position: fixed;
    z-index: var(--sl-z-index-backdrop);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.25);
  }
</style>