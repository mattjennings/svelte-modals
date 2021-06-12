<script>
  import { ModalStack, openModal, closeModal} from 'svelte-modal-stack'
  import AlertModal from './_AlertModal.svelte' 
  import { fade } from 'svelte/transition'
</script>

# svelte-modal-stack

A simple, flexible, zero-dependency modal stack manager for Svelte.

## Getting Started

```
npm install svelte-modal-stack
```

Add `ModalStack` at the root of your app (or in your \_\_layout if using SvelteKit)

```svelte
<script>
  import { ModalStack, closeModal } from 'svelte-modal-stack'
</script>

<ModalStack>
  <div
    slot="backdrop"
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
<script>
  import { closeModal } from 'svelte-modal-stack'

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
  import { openModal } from 'svelte-modal-stack'
  import Modal from './Modal.svelte'

  function handleClick() {
    openModal(Modal, { title: "Alert", message: "This is an alert" })
  }
</script>

<button on:click={handleClick}>Open Modal</button>
```

<button
class="mt-6"
on:click={() => {
openModal(AlertModal, { title: 'Alert', message: 'This is an alert' })
}}>Try it out!</button>
