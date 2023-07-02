<script>
  import { Modals, openModal } from 'svelte-modals'
  import AnimatedAlertModal from './AnimatedAlertModal.svelte'
  import AnimatedInfiniteModal from './AnimatedInfiniteModal.svelte'
  import { fade } from 'svelte/transition'

  function openInfiniteModal(openModal, props) {
    openModal(InfiniteModal, { title: 'Modal', message: 'Try opening another one', openAnother: () => openInfiniteModal(openModal, props), ...props })
  }
  function openAnimatedInfiniteModal(openModal, props) {
    openModal(AnimatedInfiniteModal, { title: 'Modal', message: 'Try opening another one', openAnother: () => openAnimatedInfiniteModal(openModal, props), ...props })
  }
</script>

# Transitions

You can use Svelte transitions just like you would any other component.

Let's add a fade to our backdrop by adding `transition:fade`

```svelte
<script>
  import { Modals, closeModal } from 'svelte-modals'
  import { fade } from 'svelte/transition'
</script>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
    transition:fade
    on:click={closeModal}
  />
</Modals>
```

and let's do the same for the modal

```svelte
<script>
  import { closeModal } from 'svelte-modals'
  import { fade } from 'svelte/transition'

  export let isOpen
  export let title
  export let message

</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fade|global>
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

**Note:** As of Svelte 4 the `|global` modifier is necessary for the transition to work on the modal. [See Svelte docs for more information](https://svelte.dev/docs/element-directives#transition-fn).

## Transitions between Modals

If you are opening one modal after another, the intro and outro transitions of both modals will overlap. Depending on your animation, this might be ok, but often it's cleaner to transition one at a time.

You can do this by forwarding the `on:introstart` and `on:outroend` events in your modal components.

```svelte
<script>
  import { fade } from 'svelte/transition'

  export let isOpen
</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fade|global on:introstart on:outroend>
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
