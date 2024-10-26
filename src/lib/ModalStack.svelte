<script lang="ts">
  import ModalContext from './ModalContext.svelte'
  import type { Modal } from './modal.svelte'
  import type { LazyModalComponent, ModalComponent } from './types'
  import { modals } from './modals.svelte'
  import type { Snippet } from 'svelte'

  function isLazyModal(
    component: ModalComponent | LazyModalComponent
  ): component is LazyModalComponent {
    return typeof component.prototype === 'undefined'
  }

  const props: {
    modals?: Snippet<[{ modal: Snippet<[Modal]>; modals: typeof modals }]>
    backdrop?: Snippet<[{ close: typeof modals.close }]>
    loading?: Snippet
  } = $props()
</script>

{#if modals.stack.length > 0}
  {@render props.backdrop?.({ close: modals.close.bind(modals) })}
{/if}

{#if props.modals}
  {@render props.modals({ modal, modals })}
{:else}
  {#each modals.stack as m, i (m.id)}
    {@render modal(m)}
  {/each}
{/if}

{#snippet modal(m: Modal)}
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
