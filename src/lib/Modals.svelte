<script lang="ts" module>
  export const modals = new ModalStack()

  export interface ModalsProps {
    context?: ModalStack
    backdrop?: Snippet<[modals: ModalStack]>
    modal?: Snippet<
      [
        modal: {
          component: ModalComponent<ModalProps<any>, {}, string>
          props: ModalProps
        },
        modals: ModalStack
      ]
    >
    loading?: Snippet<[modals: ModalStack]>
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte'
  import StackedModalContext from './StackedModalContext.svelte'
  import type { ModalProps } from './stacked-modal.svelte'
  import { ModalStack } from './modal-stack.svelte'
  import type { LazyModalComponent, ModalComponent } from './types'

  function isLazyModal(
    component: ModalComponent | LazyModalComponent
  ): component is LazyModalComponent {
    return typeof component.prototype === 'undefined'
  }

  const props: ModalsProps = $props()
</script>

{#if modals.stack.length > 0}
  {@render props.backdrop?.(modals)}
{/if}

{#each modals.stack as m, i (m.id)}
  <StackedModalContext modal={m}>
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
  </StackedModalContext>
{/each}
