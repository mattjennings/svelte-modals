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
  {#snippet backdrop()}
    <div
      class="backdrop"
      transition:fade
      onclick={closeModal}
    />
  {/snippet}
</Modals>
```

and let's do the same for the modal

```svelte
<script>
  import { closeModal } from 'svelte-modals'
  import { fade } from 'svelte/transition'

  const { isOpen, title, message } = $props()
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
onclick={() => {
openModal(AnimatedAlertModal, { title: 'Alert', message: 'This is an alert' })
}}> Try it out</button>

## Transitions between Modals

If you are opening one modal after another, the intro and outro transitions of both modals will overlap. Depending on your animation, this might be ok, but often it's cleaner to transition one at a time.

You can do this by forwarding the `onintrostart` and `onoutroend` props in your modal components.

```svelte
<script>
  import { fade } from 'svelte/transition'

  const { isOpen, onintrostart, onoutroend } = $props()
</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fade|global {onintrostart} {onoutroend}>
    <!-- ... -->
  </div>
{/if}
```

Let's see how the transitions compare:

<button
onclick={() => {
openAnimatedInfiniteModal(openModal)
}}>Overlapped</button>

<button
onclick={() => {
openAnimatedInfiniteModal(openModal, { exitBeforeEnter: true })
}}>Deferred</button>
