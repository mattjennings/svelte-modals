<script>
	import { useModals } from '$lib/index'
	import { fade, fly } from 'svelte/transition'
	import { cubicOut } from 'svelte/easing'

	const { closeModal, stack, action } = useModals()

	export let title
	export let message

	export let isOpen
	export let openNewModal

</script>

{#if isOpen}
	<div
		in:fly={{
			delay: 250,
			duration: 500,
			x: $action === 'push' ? 300 : -300,
			opacity: 0,
			easing: cubicOut
		}}
		out:fly={{
			duration: 500,
			x: $action === 'push' ? -300 : 300,
			opacity: 0,
			easing: cubicOut
		}}
		on:introstart
		on:introend
		on:outrostart
		on:outroend
		class="fixed inset-0 flex items-center justify-center pointer-events-none"
	>
		<div
			class="w-60 bg-white rounded-md p-4 shadow-lg flex flex-col justify-between pointer-events-auto"
		>
			<h2 class="text-2xl text-center">{title} {$stack.length}</h2>
			<p class="text-center mt-4">{message}</p>
			<div class="mt-8 flex justify-between">
				<button on:click={closeModal}>Close</button>
				<button on:click={openNewModal}>Open</button>
			</div>
		</div>
	</div>
{/if}
