<script lang="ts" module>
  export interface ModalProps {
    isOpen: boolean
  }
</script>

<script>
  import { modals, exitBeforeEnter, transitioning, type LazyModalComponent, type ModalComponent } from './store'

  function isLazyModal(component: ModalComponent | LazyModalComponent): component is LazyModalComponent {
    return typeof component.prototype === 'undefined'
  }

  const props = $props()
</script>

{#if $modals.length > 0}
  {@render props.backdrop()}
{/if}

{#if props.children}
  {@render props.children($modals)}
{:else}
  {#each $modals as modal, i (i)}
    <!-- lazy modal -->
    {#if isLazyModal(modal.component)}
      {#await modal.component()}
        {@render props.loading?.()}
      {:then component}
        <component.default
          isOpen={i === $modals.length - 1 && !$transitioning}
          {...modal.props}
          onintrostart={() => {
            $exitBeforeEnter = true
            modal.props?.onintrostart?.()
          }}
          onoutroend={() => {
            $transitioning = false
            modal.props?.onoutroend?.()
          }}
        />
      {/await}
    {:else}
      <!-- normal modal -->
      <modal.component
        isOpen={i === $modals.length - 1 && !$transitioning}
        {...modal.props}
        onintrostart={(...args: any[]) => {          
          $exitBeforeEnter = true
          modal.props?.onintrostart?.(...args)
        }}
        onoutroend={(...args: any[]) => {
          // unsure why, but without this timeout sometimes the modal is briefly shown before being removed
          // started happening with svelte 5
          setTimeout(() => {         
            $transitioning = false  
          })
          modal.props?.onoutroend?.(...args)
        }}
      />
    {/if}
  {/each}
{/if}
