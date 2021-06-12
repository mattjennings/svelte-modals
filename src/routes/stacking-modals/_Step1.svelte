<script>
  import BaseModal from './_BaseModal.svelte'
  import { useModals } from 'svelte-modal-stack'
  import Step2 from './_Step2.svelte'

  const { closeModal, openModal } = useModals()

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
