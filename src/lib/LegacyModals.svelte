<script>
  import { modals } from './Modals.svelte'

  function isLazyModal(component) {
    return typeof component.prototype === 'undefined'
  }

  async function getComponent(component) {
    return component().then((res) => res.default)
  }
</script>

{#if modals.stack.length > 0}
  <slot name="backdrop" />
{/if}

<slot>
  {#each modals.stack as modal, i (modal.id)}
    <!-- lazy modal -->
    {#if isLazyModal(modal.component)}
      {#await getComponent(modal.component)}
        <slot name="loading" />
      {:then component}
        <svelte:component
          this={component}
          {...modal.props}
          on:introstart={() => {
            modal.exitBeforeEnter = true
          }}
          on:outroend={() => {
            setTimeout(() => {
              modal.modals.transitioning = false
            })
          }}
        />
      {/await}
    {:else}
      <!-- normal modal -->
      <svelte:component
        this={modal.component}
        {...modal.props}
        on:introstart={() => {
          modal.exitBeforeEnter = true
        }}
        on:outroend={() => {
          setTimeout(() => {
            modal.modals.transitioning = false
          })
        }}
      />
    {/if}
  {/each}
</slot>
