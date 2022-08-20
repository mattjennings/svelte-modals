<script>
  import { Modals, openModal, closeAllModals } from 'svelte-modals'
</script>

## Dispatching Events

Modals can dispatch events using `createModalEventDispatcher()`. These events can be handled by providing event handlers to `openModal()`

```svelte
<!-- EventsModal.svelte -->
<script>
  import { createModalEventDispatcher } from 'svelte-modals'

  export let isOpen
  export let options

  const dispatch = createModalEventDispatcher()
</script>

{#if isOpen}
  <!-- ...modal content...-->
  {#each options as option}
    <button on:click={() => dispatch('select', option)}>{option}</button>
  {/each}
{/if}
```

```svelte example
<script>
  import { closeModal, openModal } from 'svelte-modals'
  import EventsModal from './EventsModal.svelte'

  let animal

  function handleOpen() {
    openModal(EventsModal, {
      title: 'Favorite Pet?',
      message: 'Pick one',
      options: ['Dog', 'Cat']
    },
    {
      on: {
        select: (event) => {
          alert('you chose ' + event.detail)
          closeModal()
        }
      }
    })
  }
</script>

<button on:click={handleOpen}>Open Modal</button>
```
