<script>
  import { ModalStack, useModals } from 'svelte-modal-stack'
  import AnimatedAlertModal from './_AnimatedAlertModal.svelte'
  import AnimatedInfiniteModal from './_AnimatedInfiniteModal.svelte'
  import { fade } from 'svelte/transition'

  function openInfiniteModal(openModal, props) {
    openModal(InfiniteModal, { title: 'Modal', message: 'Try opening another one', openAnother: () => openInfiniteModal(openModal, props), ...props })
  }
  function openAnimatedInfiniteModal(openModal, props) {
    openModal(AnimatedInfiniteModal, { title: 'Modal', message: 'Try opening another one', openAnother: () => openAnimatedInfiniteModal(openModal, props), ...props })
  }
</script>

## Animations

You can use Svelte transitions just like you would any other component.

Let's add a fade to our backdrop by adding `transition:fade`

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

and let's do the same for the modal

```svelte
<script>
  import { useModals } from 'svelte-modal-stack'
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

<ModalStack let:openModal>
  <div
    slot="backdrop"
    let:closeModal
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
  <button
    class="mt-6"
    on:click={() => {
      openModal(AnimatedAlertModal, { title: 'Alert', message: 'This is an alert' })
    }}
  >
    Try it out
  </button>
</ModalStack>

## Transitions between Modals

If you are opening one modal after another, the transitions will overlap. Sometimes this is desired, but most times probably not.

To change this, modals can transition one at a time as long as they forward the `on:introstart` and `on:outroend` events.

```svelte
<script>
  import { fade } from 'svelte/transition'

  export let isOpen
</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fade on:introstart on:outroend>
    <!-- ... -->
  </div>
{/if}
```

Let's see how they compare:

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
    Before
  </button>
</ModalStack>

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
      openAnimatedInfiniteModal(openModal, { exitBeforeEnter: true })
    }}
  >
    After
  </button>
</ModalStack>
