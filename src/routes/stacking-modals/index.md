<script>
  import { ModalStack, useModals } from 'svelte-modal-stack'
  import Step1 from './_Step1.svelte'

  const { openModal } = useModals()
</script>

# Stacking Modals

Modals are managed using a LIFO (last in first out) stack. `openModal()` will add a new modal to the stack and hide the previous one until it is dismissed.

```svelte
<script>
  import { useModals } from 'svelte-modal-stack'

  const { openModal } = useModals()

  openModal(YourModalComponent, props)
</script>
```

Your modal components receive a boolean `isOpen` prop. It's up to you to implement `isOpen` appropriately in your modal, but typically that just means wrapping your HTML in an `if` block

```svelte
<!-- MyModal.svelte -->
<script>
  export let isOpen
</script>

{#if isOpen}
  <div role="dialog">
    <!-- ... -->
  </div>
{/if}
```

## Open modals from your modals

```svelte
<script>
  import { useModals } from 'svelte-modal-stack'
  import Step2Modal from './Step2Modal.svelte'

  const { openModal } = useModals()

  export let isOpen

</script>

{#if isOpen}
  <div role="dialog">
    <!-- ... -->

    <button
      type="button"
      on:click={() => {
        openModal(Step2Modal)
      }}
    >
      Next
    </button>
  </div>
{/if}
```

<button
class="mt-6"
on:click={() => {
openModal(Step1)
}}>
Yo dawg
</button>
