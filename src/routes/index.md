<script>
  import { ModalStack, useModals } from '$lib/index'
  import AlertModal from './_components/AlertModal.svelte' 
  import AnimatedAlertModal from './_components/AnimatedAlertModal.svelte'
  import InfiniteModal from './_components/InfiniteModal.svelte'
  import AnimatedInfiniteModal from './_components/AnimatedInfiniteModal.svelte'
  import { fade } from 'svelte/transition'

  function openInfiniteModal(openModal, props) {
    openModal(InfiniteModal, { title: 'Modal', message: 'Try opening another one', openAnother: () => openInfiniteModal(openModal, props), ...props })
  }
  function openAnimatedInfiniteModal(openModal, props) {
    openModal(AnimatedInfiniteModal, { title: 'Modal', message: 'Try opening another one', openAnother: () => openAnimatedInfiniteModal(openModal, props), ...props })
  }
</script>

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

# svelte-modal-stack

```
npm install svelte-modal-stack
```

## Basic Usage

Add `ModalStack` at the root of your app (or \_\_layout if using SvelteKit):

```svelte
<script>
  import { ModalStack } from 'svelte-modal-stack'
</script>

<ModalStack exitBeforeEnter>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    on:click={closeModal}
  />

  <!-- rest of your app here, or <slot /> if using SvelteKit -->
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

Create your Modal component:

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

Open it:

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

Try it out!

<ModalStack let:openModal>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    on:click={closeModal}
  />
  <button
    on:click={() => {
      openModal(AlertModal, { title: 'Alert', message: 'This is an alert' })
    }}
  >
    Open Modal
  </button>
</ModalStack>

You can use `useModals()` inside a modal as well, which means you can open modals from within modals

<ModalStack let:openModal>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    on:click={closeModal}
  />
  <button
    on:click={() => {
      openInfiniteModal(openModal)
    }}
  >
    Yo dawg
  </button>
</ModalStack>

## Animations

Modals can use Svelte transitions:

```svelte
<script>
  import { ModalStack } from 'svelte-modal-stack'
  import { fade } from 'svelte/transition'
</script>

<ModalStack>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
  <!-- ... -->
</ModalStack>
```

```svelte
<!-- Modal.svelte -->
<script>
  import { useModals } from '$lib/index'
  import { fade } from 'svelte/transition'

  const { closeModal } = useModals()

  export let isOpen
  export let title
  export let message

</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fade>
    <div class="contents">
      <h2>{title}</h2>
      <p>{message}</p>
      <div class="actions">
        <button on:click={closeModal}>OK</button>
      </div>
    </div>
  </div>
{/if}
```

Try it out!

<ModalStack let:openModal>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
  <button
    on:click={() => {
      openModal(AnimatedAlertModal, { title: 'Alert', message: 'This is an alert' })
    }}
  >
    Open Modal
  </button>
</ModalStack>

## Transitions between Modals

By default, transitions of both the opening and closing Modal will play at the same time. Try opening a few modals and notice how the fades
overlap.

Depending on your transition, it might be desired:

<ModalStack let:openModal>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
  <button
    on:click={() => {
      openAnimatedInfiniteModal(openModal, { transition: 'fly' })
    }}
  >
    Fly Transition
  </button>
</ModalStack>

or not desired:

<ModalStack let:openModal>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
  <button
    on:click={() => {
      openAnimatedInfiniteModal(openModal)
    }}
  >
    Fade Transition
  </button>
</ModalStack>

`ModalStack` takes an `exitBeforeEnter` prop which will make modals transition one at a time

```svelte
<ModalStack exitBeforeEnter>
  <!-- ... -->
</ModalStack>
```

However, **this requires your modal components pass up the `on:outroend` event.** Otherwise, `ModalStack` won't be able to tell when your modal has finished transitioning.

```svelte
<script>
  import { useModals } from '$lib/index'
  import { fade } from 'svelte/transition'

  const { closeModal, stack } = useModals()

  export let isOpen
  export let title
  export let message
  export let openAnother

  let index = $stack.length

</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fade on:outroend>
    <div class="contents">
      <h2>{title} #{index}</h2>
      <p>{message}</p>
      <div class="actions">
        <button on:click={closeModal}>Close</button>
        <button on:click={openAnother}>Open</button>
      </div>
    </div>
  </div>
{/if}
```

<ModalStack let:openModal exitBeforeEnter>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
  <button
    on:click={() => {
      openAnimatedInfiniteModal(openModal)
    }}
  >
    Better Fade Transition
  </button>
</ModalStack>
