<script context="module">
	export function useModals() {
		return getContext('svelte-modal-stack')
	}

</script>

<script>
	import { getContext, setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let exitBeforeEnter = false

	let stack = writable([])
	let action = writable(null)
	let transitioning = false

	function pop(amount = 1) {
		$stack = [...$stack].slice(0, $stack.length - amount)
	}

	function closeAllModals() {
		$stack = []
	}

	function closeModals(amount = 1) {
		if (exitBeforeEnter && transitioning) {
			return
		}

		if (exitBeforeEnter && $stack.length > 0) {
			transitioning = true
		}

		$action = 'pop'

		if ($stack.length === 1) {
			closeAllModals()
		} else {
			pop(amount)
		}
	}

	function openModal(component, props, options) {
		let newStack = [...$stack]

		if (exitBeforeEnter && transitioning) {
			return
		}

		$action = 'push'

		if (options?.replace) {
			newStack = $stack.slice(0, $stack.length - 1)
		}

		if (exitBeforeEnter && $stack.length > 0) {
			transitioning = true
		}

		$stack = [...newStack, { component, props }]
	}

	const context = {
		openModal,
		closeModal: () => closeModals(1),
		closeModals,
		closeAllModals,
		stack,
		action
	}

	setContext('svelte-modal-stack', context)

</script>

{#if $stack.length > 0}
	<slot name="backdrop" />
{/if}

<slot name="modals">
	{#each $stack as modal, i (i)}
		<svelte:component
			this={modal.component}
			isOpen={i === $stack.length - 1 && (!exitBeforeEnter || !transitioning)}
			on:outroend={() => {
				transitioning = false
			}}
			{...modal.props || {}}
		/>
	{/each}
</slot>

<slot {...context} stack={$stack} />
