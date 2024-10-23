<script>
  import { openModal } from 'svelte-modals'
  import BaseModal from './BaseModal.svelte'
  import Step2 from './Step2.svelte'

  let { isOpen } = $props();
</script>

<BaseModal {isOpen}>
  <h3 class="text-xl leading-6 font-medium text-gray-900" id="modal-title">Step 1</h3>
  <p class="text-gray-500 pt-2">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
    pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
  </p>

  {#snippet actions()}
  
      <div></div>
      <button
        type="button"
        onclick={() => {
        openModal(Step2)
      }}
      >
        Next
      </button>
    
  {/snippet}
</BaseModal>
