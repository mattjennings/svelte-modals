# Modal Components

Modals are managed using a LIFO (last in first out) stack. A modal is added to the stack when you call `openModal()` and removed once they are closed.

Modals are given the following props:

- `isOpen` - whether or not the modal is currently being shown
- `close` - a function that closes the modal, optionally taking a value to return to `openModal()`

## isOpen

All modals in the stack are kept mounted, so you will need to use `isOpen` to hide its contents for when it is not being shown:

```svelte
<!-- MyModal.svelte -->
<script>
  export let isOpen
  export let close
</script>

{#if isOpen}
  <div role="dialog">
    <!-- ... -->
  </div>
{/if}
```

While this may seem inconvenient, this allows the state of the component to be persisted while it is temporarily hidden.

## close()

You may want to return a value from the modal once it closes. `openModal()` returns a promise that is resolved once the modal is closed, and the returned value can be provided with the `close(value)` prop.

```svelte
<!-- ConfirmModal.svelte -->
<script>
  export let isOpen
  export let close

  export let message
</script>

{#if isOpen}
  <!-- ...modal content...-->

  <button type="button" on:click={() => close(false)}> No </button>
  <button type="button" on:click={() => close(true)}> Yes </button>
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

**Note**: Modals can also be closed with exported functions `closeModal()`, `closeModals(amount)`, or `closeAllModals()`. When these are called, `openModal()` resolves with no value. [See API](/api)

### Typescript

If you are using Typescript, you can type `close` with `CloseProp<Result>` and it will properly type the return value of `openModal`

```svelte
<script>
  import { CloseProp } from 'svelte-modals'

  export let isOpen: boolean
  export let close: CloseProp<boolean>

  export let message: string
</script>

{#if isOpen}
  <!-- ...modal content...-->

  <button type="button" on:click={() => close(false)}> No </button>
  <button type="button" on:click={() => close(true)}> Yes </button>
{/if}
```

## Preventing Close

You can prevent the modal from being closed by using `onBeforeClose()`. If the passed in function returns false, the modal will not be closed.

```svelte
<script>
import { onBeforeClose } from 'svelte-modals'

let dirty = false

onBeforeClose(() => {
  if (dirty) {
    alert('You have unsaved changes!')

    // prevents modal from closing
    return false
  }
})
</script>

<FancyForm bind:dirty />
```

Any close function (`close` prop or `closeModal` etc) will return false if the modal is prevented from closing.
