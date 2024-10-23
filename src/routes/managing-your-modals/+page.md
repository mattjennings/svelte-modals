<script>
  import { Modals, openModal, closeAllModals } from 'svelte-modals'
  import ConfirmModal from './ConfirmModal.svelte'
  import confetti from 'canvas-confetti';
  import Step1 from './Step1.svelte'

  function handleDelete() {
    openModal(ConfirmModal, {
      message: "This will delete very important data",
      onConfirm: () => {
        openModal(ConfirmModal, {
          message: "Are you absolutely sure?",
          labels: {
            cancel: 'No',
            confirm: 'Yes'
          },          
          onConfirm: () => {
            closeAllModals()
            confetti.create(document.getElementById('canvas'), {
              resize: true,
              useWorker: true,
            })({ particleCount: 200, spread: 200 });
          }
        })
      }
    })
  }
</script>

# Managing your modals

Modals are managed using a LIFO (last in first out) stack. `openModal()` will add a new modal to the stack and hide the previous one until it is dismissed.

```svelte
<script>
  import { onMount } from 'svelte'
  import { openModal, closeAllModals } from 'svelte-modals'
  import ConfirmModal from './ConfirmModal.svelte'

  function handleDelete() {
    openModal(ConfirmModal, {
      message: "This will delete very important data",
      onConfirm: () => {

        openModal(ConfirmModal, {
          message: "Are you absolutely sure?",
          labels: {
            cancel: 'No',
            confirm: 'Yes'
          },
          onConfirm: () => {
            closeAllModals()
            deleteImportantData()
          }
        })

      }
    })
  }
</script>

<button onclick={handleDelete}>Delete Important Data</button>
```

<button class="mt-6 !bg-red-600 !text-white !border-red-50" onclick={handleDelete}>Delete Important Data</button>

Your modal components will receive an `isOpen` prop. Modals stay mounted regardless if they are showing or not, so you'll need to wrap your contents in an `if` block to hide them.

```svelte
<!-- MyModal.svelte -->
<script>
  const { isOpen } = $props()
</script>

{#if isOpen}
  <div role="dialog">
    <!-- ... -->
  </div>
{/if}
```

If you are using Typescript, you can use the `ModalProps` type for $props

```svelte
<!-- MyModal.svelte -->
<script lang="ts">
  import type { ModalProps } from 'svelte-modals'
  const { isOpen } = $props<ModalProps>()
</script>

{#if isOpen}
  <div role="dialog">
    <!-- ... -->
  </div>
{/if}
```
