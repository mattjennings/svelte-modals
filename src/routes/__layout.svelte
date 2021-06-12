<script>
  import { ModalStack, closeModal } from 'svelte-modal-stack'
  import '../app.css'
  import '../prism.css'
  import Sidebar from './_components/Sidebar.svelte'

</script>

<ModalStack>
  <div slot="backdrop" class="backdrop" on:click={closeModal} />
  <div class="h-screen bg-white overflow-hidden flex sm:max-w-6xl mx-auto">
    <Sidebar />
    <div class="flex-1 w-0 flex flex-col overflow-y-auto md:px-8 xl:px-0 ">
      <main class="max-w-full flex-1 relative focus:outline-none">
        <div class="py-6 px-4 sm:px-6 prose prose-sm sm:prose-lg">
          <slot />
        </div>
      </main>
    </div>
  </div>
</ModalStack>
