<script>
  import { modals, exitBeforeEnter, transitioning } from './store'
</script>

{#if $modals.length > 0}
  <slot name="backdrop" />
{/if}

<slot>
  {#each $modals as modal, i (i)}
    <svelte:component
      this={modal.component}
      isOpen={i === $modals.length - 1 && !$transitioning}
      on:introstart={() => {
        $exitBeforeEnter = true
      }}
      on:outroend={() => {
        $transitioning = false
      }}
      {...modal.props || {}}
    />
  {/each}
</slot>

<slot />
