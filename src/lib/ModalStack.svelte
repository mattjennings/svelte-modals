<script module lang="ts">
  export interface ModalStackProps {
    backdrop?: Snippet<[modals: Modals]>
    modal?: Snippet<
      [
        modal: {
          component: ModalComponent<ModalProps<any>, {}, string>
          props: ModalProps
        },
        modals: Modals
      ]
    >
    loading?: Snippet<[modals: Modals]>
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import ModalContext from './ModalContext.svelte'
  import type { ModalProps } from './modal.svelte'
  import { modals, Modals } from './modals.svelte'
  import type { LazyModalComponent, ModalComponent } from './types'

  function isLazyModal(
    component: ModalComponent | LazyModalComponent
  ): component is LazyModalComponent {
    return typeof component.prototype === 'undefined'
  }

  const props: ModalStackProps = $props()
</script>

{#if modals.stack.length > 0}
  {@render props.backdrop?.(modals)}
{/if}

{#each modals.stack as m, i (m.id)}
  <ModalContext modal={m}>
    <!-- lazy modal -->
    {#if isLazyModal(m.component)}
      {#await m.component()}
        {@render props.loading?.(modals)}
      {:then component}
        {#if props.modal}
          {@render props.modal({ component: component.default, props: m.props }, modals)}
        {:else}
          <component.default {...m.props} />
        {/if}
      {/await}
    {:else}
      <!-- normal modal -->
      {#if props.modal}
        {@render props.modal({ component: m.component, props: m.props }, modals)}
      {:else}
        <m.component {...m.props} />
      {/if}
    {/if}
  </ModalContext>
{/each}
