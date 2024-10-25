<script lang="ts" module>
  import { setContext, getContext } from 'svelte'

  const key = Symbol('modal')
  function setModal(modal: StackedModal) {
    setContext(key, modal)
  }

  export function getModal(): StackedModal {
    return getContext(key)
  }
</script>

<script lang="ts">
  import type { StackedModal } from './stacked-modal.svelte'

  const { modal, children } = $props<{ modal: StackedModal; children: any }>()

  setModal(modal)
</script>

{@render children()}
