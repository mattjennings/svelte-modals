<script>
  import { closeModal, modals } from 'svelte-modals'
  import { fade, fly } from 'svelte/transition'

  let {
    isOpen,
    title,
    message,
    openAnother,
    exitBeforeEnter = false,
    onintrostart = () => {},
    onoutroend = () => {}
  } = $props()

  console.log(exitBeforeEnter)
  let index = $modals.length
</script>

{#if isOpen}
  <div
    role="dialog"
    class="modal-container"
    transition:fade|global
    onintrostart={() => {
      if (exitBeforeEnter) {
        onintrostart()
      }
    }}
    onoutroend={() => {
      if (exitBeforeEnter) {
        onoutroend()
      }
    }}
  >
    <div class="modal-content">
      <h2>{title} #{index}</h2>
      <p>{message}</p>
      <div class="modal-actions">
        <button onclick={openAnother}>Open</button>
        <button onclick={closeModal}>Close</button>
      </div>
    </div>
  </div>
{/if}
