<script>
  import { Modals, closeModal } from 'svelte-modals'
  import '../app.css'
  import '../prism.css'
  import Sidebar from './Sidebar.svelte'
  import { fade } from 'svelte/transition'
  import { page } from '$app/stores'
</script>

<Modals>
  <div
    slot="backdrop"
    class="backdrop"
    transition:fade={{
      // lazy way to only enable transitions on /transitions page
      duration: $page.url.pathname === '/transitions' ? undefined : 0
    }}
    on:click={closeModal}
  />
</Modals>

<div class="bg-white flex sm:max-w-6xl mx-auto">
  <Sidebar />
  <main class="flex-1 w-0 flex flex-col md:px-8 xl:px-0">
    <div class="max-w-full flex-1 relative focus:outline-none">
      <div class="py-6 pb-24 px-4 sm:px-6 prose">
        <slot />
      </div>
    </div>
  </main>
</div>
