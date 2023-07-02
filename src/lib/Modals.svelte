<script>
  import { modals, exitBeforeEnter, transitioning } from './store'

  function isLazyModal(component) {
    return typeof component.prototype === 'undefined'
  }

  async function getComponent(component) {
    return component().then((res) => res.default)
  }
</script>


<slot>
  {#each $modals as modal, i (i)}
    {#if $modals.length - 1 === i}
      <slot name="backdrop" />
    {/if}
    <!-- lazy modal -->
    {#if isLazyModal(modal.component)}
      {#await getComponent(modal.component)}
        <slot name="loading" />
      {:then component}
        <svelte:component
          this={component}
          isOpen={i === $modals.length - 1 && !$transitioning}
          {...modal.props}
          on:introstart={() => {
            $exitBeforeEnter = true
          }}
          on:outroend={() => {
            $transitioning = false
          }}
        />
      {/await}
    {:else}
      <!-- normal modal -->
      <svelte:component
        this={modal.component}
        isOpen={i === $modals.length - 1 && !$transitioning}
        {...modal.props}
        on:introstart={() => {
          $exitBeforeEnter = true
        }}
        on:outroend={() => {
          $transitioning = false
        }}
      />
    {/if}
  {/each}
</slot>
