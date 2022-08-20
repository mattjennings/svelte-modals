<script>
  export let isOpen

</script>

{#if isOpen}
  <div
    class="fixed inset-0 flex justify-center items-center"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div class="bg-white p-4">
        <slot />
      </div>
      <div class="bg-gray-50 px-4 py-3 flex justify-between space-x-4">
        <slot name="actions" />
      </div>
    </div>
  </div>
{/if}
