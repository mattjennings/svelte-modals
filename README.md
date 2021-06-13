# svelte-modals

A simple, flexible, zero-dependency modal manager for Svelte.

[View documentation](https://svelte-modals.mattjennings.io)

## Getting Started

```
npm install svelte-modals
```

Add `Modals` somewhere in your app. This is where the modals will render.

```svelte
<script>
  import { Modals, closeModal } from 'svelte-modals'
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

```html
<script>
  import { closeModal } from 'svelte-modals'

  // provided by Modals
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
      <button on:click="{closeModal}">OK</button>
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

```html
<script>
  import { openModal } from 'svelte-modals'
  import Modal from './Modal.svelte'

  function handleClick() {
    openModal(Modal, { title: 'Alert', message: 'This is an alert' })
  }
</script>

<button on:click="{handleClick}">Open Modal</button>
```
