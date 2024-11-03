<script>
  import { Modals } from 'svelte-modals/legacy'
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
    <div slot="backdrop" class="backdrop" on:click={() => modals.close()} />
  </Modals>
</div>
