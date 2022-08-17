<script>
  import { openModal } from 'svelte-modals'
  import BaseModal from './BaseModal.svelte'
  import Step2 from './Step2.svelte'

  export let isOpen
</script>

<BaseModal {isOpen}>
  <h3 class="text-xl leading-6 font-medium text-gray-900" id="modal-title">Step 1</h3>
  <p class="text-gray-500 pt-2">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
    pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
  </p>

  <svelte:fragment slot="actions">
    <div />
    <button
      type="button"
      on:click={() => {
        openModal(Step2)
      }}
    >
      Next
    </button>
  </svelte:fragment>
</BaseModal>
