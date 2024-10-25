<script lang="ts" module>
  export interface ModalProps {
    /**
     * @deprecated - use isActive prop or getModal().isActive
     */
    isOpen: boolean

    onintrostart?: () => void
    onoutroend?: () => void
  }
</script>

<script lang="ts">
  import ModalContext from './ModalContext.svelte'
  import type { StackedModal } from './stacked-modal.svelte'
  import type { LazyModalComponent, ModalComponent } from './types'
  import { modals } from './modal-stack.svelte'

  function isLazyModal(
    component: ModalComponent | LazyModalComponent
  ): component is LazyModalComponent {
    return typeof component.prototype === 'undefined'
  }

  const props = $props()
</script>

{#if modals.stack.length > 0}
  {@render props.backdrop?.()}
{/if}

{#if props.modals}
  {@render props.modals({ modal, modals })}
{:else}
  {#each modals.stack as m, i (i)}
    {@render modal(m)}
  {/each}
{/if}

{#snippet modal(m: StackedModal)}
  <ModalContext modal={m}>
    <!-- lazy modal -->
    {#if isLazyModal(m.component)}
      {#await m.component()}
        {@render props.loading?.()}
      {:then component}
        <component.default {...m.props} />
      {/await}
    {:else}
      <!-- normal modal -->
      <m.component {...m.props} />
    {/if}
  </ModalContext>
{/snippet}
