<script>
  import { stack, exitBeforeEnter, transitioning } from './store'

</script>

{#if $stack.length > 0}
  <slot name="backdrop" />
{/if}

<slot name="modals">
  {#each $stack as modal, i (i)}
    <svelte:component
      this={modal.component}
      isOpen={i === $stack.length - 1 && !$transitioning}
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

<slot stack={$stack} />
