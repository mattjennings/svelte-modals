<script lang="ts">
  import ModalContext from './ModalContext.svelte'
  import type { Modal, ModalProps } from './modal.svelte'
  import type { LazyModalComponent, ModalComponent } from './types'
  import { modals } from './modals.svelte'
  import type { Snippet, SvelteComponent } from 'svelte'

  function isLazyModal(
    component: ModalComponent | LazyModalComponent
  ): component is LazyModalComponent {
    return typeof component.prototype === 'undefined'
  }

  const props: {
    backdrop?: Snippet<[typeof modals]>
    modal?: Snippet<
      [
        modal: { component: ModalComponent<ModalProps<any>, {}, string>; props: ModalProps },
        modals: typeof modals
      ]
    >
    loading?: Snippet
  } = $props()
</script>

{#if modals.stack.length > 0}
  {@render props.backdrop?.(modals)}
{/if}

{#each modals.stack as m, i (m.id)}
  <ModalContext modal={m}>
    <!-- lazy modal -->
    {#if isLazyModal(m.component)}
      {#await m.component()}
        {@render props.loading?.()}
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
