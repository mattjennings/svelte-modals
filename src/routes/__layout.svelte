<script>
  import { ModalStack, closeModal } from 'svelte-modal-stack'
  import '../app.css'
  import '../prism.css'
  import Sidebar from './_components/Sidebar.svelte'

</script>

<ModalStack>
  <div slot="backdrop" class="backdrop" on:click={closeModal} />
</ModalStack>

<div class="bg-white flex sm:max-w-6xl mx-auto">
  <Sidebar />
  <main class="flex-1 w-0 flex flex-col md:px-8 xl:px-0 ">
    <div class="max-w-full flex-1 relative focus:outline-none">
      <div class="py-6 pb-24 px-4 sm:px-6 prose prose-sm sm:prose-lg">
        <slot />
      </div>
    </div>
  </main>
</div>
