<script>
  import { Modals } from 'svelte-modals'
  import { fade } from 'svelte/transition'

  const props = $props()
  function portal(node) {
    document.body.appendChild(node)
    return {
      destroy() {
        node.remove()
      }
    }
  }

  let _transition = props.fade ? fade : () => {}
</script>

<div use:portal>
  <Modals>
    {#snippet backdrop({ close })}
      <div class="backdrop" transition:_transition onclick={() => close()}></div>
    {/snippet}
  </Modals>
</div>
