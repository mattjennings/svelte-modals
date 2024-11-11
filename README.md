# svelte-modals

A simple, flexible, zero-dependency modal manager for Svelte.

[View documentation](https://svelte-modals.mattjennin.gs)

## Getting Started

### Installation

```bash
npm install svelte-modals
```

### Add \<Modals /> to your app

All opened modals will be rendered inside `<Modals />`. If you're using SvelteKit, `+layout.svelte` would be appropriate
place to put it. Otherwise, wherever you want the modals to be rendered.

```svelte
<script>
  import { Modals } from 'svelte-modals'
</script>

<Modals>
  <!-- shown when any modal is opened -->
  {#snippet backdrop({ close })}
    <div class="backdrop" onclick={() => close()} />
  {/snippet}
</Modals>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
```

### Create your Modal component

Let's create a basic modal component:

```svelte
<script>
  const {
    // provided by <Modals />
    isOpen,
    close,

    // your props
    title,
    message
  } = $props()
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="actions">
        <button onclick={() => close()}>OK</button>
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
    border-radius: 6px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
</style>
```

### Try it out

Import `modals` anywhere in your app to open or close your modals

```svelte
<script>
  import { modals } from 'svelte-modals'
  import MyModal from '$lib/components/MyModal.svelte'

  function handleClick() {
    modals.open(MyModal, { title: 'Alert', message: 'This is an alert' })
  }
</script>

<button onclick={handleClick}>Open Modal</button>
```
