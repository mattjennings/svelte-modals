<script>
  import { ModalStack, openModal } from 'svelte-modal-stack'
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

# Animations

You can use Svelte transitions just like you would any other component.

Let's add a fade to our backdrop by adding `transition:fade`

```svelte
<script>
  import { ModalStack, closeModal } from 'svelte-modal-stack'
  import { fade } from 'svelte/transition'
</script>

<ModalStack>
  <div
    slot="backdrop"
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
  import { closeModal } from 'svelte-modal-stack'
  import { fade } from 'svelte/transition'

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

<button
class="mt-6"
on:click={() => {
openModal(AnimatedAlertModal, { title: 'Alert', message: 'This is an alert' })
}}> Try it out</button>

## Transitions between Modals

If you are opening one modal after another, the intro and outro transitions of both modals will overlap. Depending on your animation, this might be ok, but often it's cleaner to transition one at a time.

You can do this by forwarding the `on:introstart` and `on:outroend` events in your modal components.

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

Let's see how the transitions compare:

<button
on:click={() => {
openAnimatedInfiniteModal(openModal)
}}>Overlapped</button>

<button
on:click={() => {
openAnimatedInfiniteModal(openModal, { exitBeforeEnter: true })
}}>Deferred</button>
