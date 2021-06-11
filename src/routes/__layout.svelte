<script>
	import '../app.css'
	import { ModalStack } from '$lib/index'
	import { fade } from 'svelte/transition'

</script>

<ModalStack exitBeforeEnter={false}>
	<div
		transition:fade
		slot="backdrop"
		let:closeModal
		class="absolute inset-0 opacity-50 bg-gray-900"
		on:click={closeModal}
	/>
	<div class="container p-2">
		<slot />
	</div>
</ModalStack>
