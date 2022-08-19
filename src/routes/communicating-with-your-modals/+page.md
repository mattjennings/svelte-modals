<script>
  import { Modals, openModal, closeAllModals } from 'svelte-modals'
  import ConfirmModal from './ConfirmModal.svelte'
</script>

# Communicating with your modals

Modals can be communicated with by either dispatching events or returning a value to `openModal()`

## Events

`openModal()` takes a 3rd parameter that allows you to pass in handlers for dispatched events. Events must be dispatched from the modal using `createModalEventDispatcher()`

```svelte
<!-- MyModal.svelte -->
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
  import MyModal from './MyModal.svelte'

  let animal

  function handleOpen() {
    openModal(MyModal, {
      title: 'Favorite Pet?',
      message: 'Pick one',
      options: ['Dog', 'Cat']
    },
    {
      on: {
        select: (event) => {
          alert('user chose ' + event.detail)
          closeModal()
        }
      }
    })
  }
</script>

<button on:click={handleOpen}>Open Modal</button>
```

## Returning a value to `openModal()`

Sometimes you just need to return a simple value from the modal without dispatching and handling events. For these scenarios, you can await `openModal()` which will return the value passed in to `closeModal(value)`

_Note: `closeModals(amount, value)` and `closeAllModals(value)` will return the same value for all `openModal()` promises_

```svelte
<!-- ConfirmModal.svelte -->
<script>
  import { closeModal } from 'svelte-modals'

  export let isOpen
  export let message
</script>

{#if isOpen}
  <!-- ...modal content...-->

  <button type="button" on:click={() => closeModal(false)}> No </button>
  <button type="button" on:click={() => closeModal(true)}> Yes </button>
{/if}
```

```svelte example
<script>
  import { onMount } from 'svelte'
  import { openModal, closeAllModals } from 'svelte-modals'
  import ConfirmModal from './ConfirmModal.svelte'

  async function handleDelete() {
    const confirmed = await openModal(ConfirmModal, {
      message: 'This will delete very important data. Are you sure?'
    })

    if (confirmed) {
      const absolutelyConfirmed = await openModal(ConfirmModal, {
        message: 'Are you absolutely sure?'
      })

      if (absolutelyConfirmed) {
        alert('deleted!')
      }
    }
  }
</script>

<button on:click={handleDelete}>Delete Important Data</button>
```
