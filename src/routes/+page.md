<script>
  import { Modals, openModal, closeModal, modals} from 'svelte-modals'
  import AlertModal from './AlertModal.svelte' 
  import DemoModal from './DemoModal.svelte'

  import { fade } from 'svelte/transition'

  function openDemoModal() {
    openModal(DemoModal, {}, {
      on: {
        open: openDemoModal
      }
    })
  }
</script>

# Svelte Modals

A simple, flexible, zero-dependency modal manager for Svelte.

<button on:click={openDemoModal}>Try me out!</button>

## Getting Started

```
npm install svelte-modals
```

### Usage

Add the `Modals` component somewhere in your app. This is where all of your modals will render.

(If you're using SvelteKit, `+layout.svelte` would be appropriate)

```svelte
<script>
  import { Modals, closeModal } from 'svelte-modals'
  import { fade } from 'svelte/transition'
</script>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
    on:click={closeModal}
  />
</Modals>

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

_Note: Svelte Modals is **not** a UI library. The styling and functionality of your modals is up to you!_

```svelte
<!-- AlertModal.svelte -->
<script>
  import { closeModal } from 'svelte-modals'

  export let isOpen // provided by svelte-modals - it is true when it's the topmost modal

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

Open it!

```svelte example
<script>
  import { openModal } from 'svelte-modals'
  import AlertModal from './AlertModal.svelte'

  function handleClick() {
    openModal(AlertModal, { title: "Alert", message: "This is an alert" })
  }
</script>

<button on:click={handleClick}>Open</button>
```
