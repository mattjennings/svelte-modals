# API

<style>
h2 {
  @apply border-b-2 pb-2 border-gray-200;
}
</style>

## Modals

Handles the rendering of your modals in the stack

### Slots

#### `backdrop`

Renders when any modals are open. The slot is empty by default.

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
    background: rgba(0, 0, 0, 0.5);
}
</style>
```

<br />

#### `default`

Modals will render in the default slot. If you want to control how modals are rendered yourself,
you can do so here.

```svelte
<script>
  import { Modals, modals } from 'svelte-modals'

  $: activeModal = $modals[$modals.length-1]
</script>

<Modals>
  <!--
    only render the active modal, removing the need for isOpen props
    (warning: modal state will be lost between transitions)
  -->
  {#if activeModal}
    <svelte:component
      this={activeModal.component}
      {...activeModal.props || {}}
    />
  {/if}
</Modals>
```

## openModal

Opens a new modal

```js
import { openModal } from 'svelte-modals'

openModal(component, props, options)
```

| Param           | Type                         | Required | Description                                         |
| --------------- | ---------------------------- | -------- | --------------------------------------------------- |
| component       | <code>SvelteComponent</code> | Yes      | Your Svelte modal component                         |
| props           | <code>any</code>             | No       | Props for the modal                                 |
| options         | <code>object</code>          | No       |                                                     |
| options.replace | <code>boolean</code>         | No       | This modal will replace the last modal in the stack |

## closeModal

Closes the last modal in the stack

```js
import { closeModal } from 'svelte-modals'

closeModal()
```

## closeModals

Closes the provided amount of modals

```js
import { closeModals } from 'svelte-modals'

closeModals(2)
```

| Param  | Type                | Required | Description                   |
| ------ | ------------------- | -------- | ----------------------------- |
| amount | <code>number</code> | Yes      | The number of modals to close |

## closeAllModals

Closes all modals in the stack

```js
import { closeAllModals } from 'svelte-modals'

closeAllModals()
```

## modals

A Svelte store containing the modal components and their props

## action

A Svelte store describing how the current modal came to be active ("push" or "pop"). This can be useful for transitions if they should animate differently based on the action.
