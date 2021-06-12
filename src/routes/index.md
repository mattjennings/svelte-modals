<script>
  import { ModalStack, useModals } from 'svelte-modal-stack'
  import AlertModal from './_AlertModal.svelte' 
  import { fade } from 'svelte/transition'
</script>

# svelte-modal-stack

```
npm install svelte-modal-stack
```

## Basic Usage

Add `ModalStack` at the root of your app (or in your \_\_layout if using SvelteKit)

```svelte
<script>
  import { ModalStack } from 'svelte-modal-stack'
</script>

<ModalStack>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    on:click={closeModal}
  />

  <!-- rest of your app here, or <slot /> if using __layout -->
</ModalStack>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50)
  }
</style>
```

Create your Modal component

```svelte
<!-- Modal.svelte -->
<script>
  import { useModals } from 'svelte-modal-stack'

  const { closeModal } = useModals()

  // provided by ModalStack
  export let isOpen

  export let title
  export let message

</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="actions">
        <button on:click={closeModal}>OK</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  h2 {
    text-align: center;
    font-size: 24px;
  }

  p {
    text-align: center;
    margin-top: 16px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }

</style>
```

Open it

```svelte
<script>
  import { useModals } from 'svelte-modal-stack'
  import Modal from './Modal.svelte'

  const { openModal } = useModals()

  function handleClick() {
    openModal(Modal, { title: "Alert", message: "This is an alert" })
  }
</script>

<button on:click={handleClick}>Open Modal</button>
```

<ModalStack let:openModal>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    on:click={closeModal}
  />
  <button
  class="mt-6"
    on:click={() => {
      openModal(AlertModal, { title: 'Alert', message: 'This is an alert' })
    }}
  >
    Try it out!
  </button>
</ModalStack>
