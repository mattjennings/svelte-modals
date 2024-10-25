<script>
  import { openModal } from 'svelte-modals'
  const { modal, children, props } = $props()
  
  function onclick() {
    openModal(modal, props)
  }
</script>

<button onclick={onclick}>
  {@render children?.()}
</button>
