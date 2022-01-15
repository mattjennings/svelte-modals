<script>
  import { Modals, openModal, closeAllModals } from 'svelte-modals'

  function handleAsync() {
    openModal(() => import('../_AlertModal.svelte'), {
        title: "Lazy Modal",
        message: "This modal was loaded lazily"
    })
  }

  function handleAsyncSlow() {
    openModal(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return import('../_AlertModal.svelte')
    }, {
        title: "Lazy Modal",
        message: "This modal was loaded lazily"
    })
  }
</script>

# Lazy Loading

`openModal` supports lazy loading of your modal components using dynamic imports.

The backdrop will be shown while the component loading.

```js
import { openModal } from 'svelte-modals'

openModal(() => import('./AlertModal.svelte'), {
  title: 'Lazy Modal',
  message: 'This modal was loaded lazily'
})
```

<button class="mt-6" on:click={handleAsync}>Open Modal</button>
