# Managing your modals

Modals are managed using a LIFO (last in first out) stack. A modal is added to the stack when you call `openModal()` and removed with `closeModal()` or `closeModals(amount)`.

Each modal component is given an `isOpen` prop that is only true for the topmost modal. All modals in the stack are kept mounted, so you will need to use this to hide its contents for when it is not being shown:

```svelte
<!-- MyModal.svelte -->
<script>
  export let isOpen
</script>

{#if isOpen}
  <div role="dialog">
    <!-- ... -->
  </div>
{/if}
```

While this may seem inconvenient, this allows the state of the component to be persisted while it is temporarily hidden.
