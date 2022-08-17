<script>
  import { Modals, openModal, closeAllModals } from 'svelte-modals'

  function handleAsync() {
    openModal(() => import('../AlertModal.svelte'), {
        title: "Lazy Modal",
        message: "This modal was loaded lazily"
    })
  }

  function handleAsyncSlow() {
    openModal(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return import('../AlertModal.svelte')
    }, {
        title: "Lazy Modal",
        message: "This modal was loaded lazily"
    })
  }
</script>

# Lazy Loading

Modal components can be lazy loaded when using `openModals`

```js
import { openModal } from 'svelte-modals'

openModal(() => import('./AlertModal.svelte'), {
  title: 'Lazy Modal',
  message: 'This modal was loaded lazily'
})
```

<button class="mt-6" on:click={handleAsync}>Open Modal</button>

While the component is loading, the `<Modal />` component will render the `backdrop` and `loading` slots.

[See Modal API](/api#modals)
