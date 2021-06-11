<script context="module">
	export function useModals() {
		return getContext('svelte-modal-stack')
	}

</script>

<script>
	import { getContext, setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let exitBeforeEnter

	let stack = writable([])
	let transitioning = writable(null)
	let action = writable(null)

	function pop(amount = 1) {
		$stack = [...$stack].slice(0, $stack.length - amount)
	}

	function closeAllModals() {
		$stack = []
	}

	function closeModals(amount = 1) {
		if (exitBeforeEnter && $transitioning === 'out') {
			return
		}

		if (exitBeforeEnter && $stack.length > 0) {
			$transitioning = 'out'
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

		if (exitBeforeEnter && $transitioning === 'out') {
			return
		}

		$action = 'push'

		if (options?.replace) {
			newStack = $stack.slice(0, $stack.length - 1)
		}

		if (exitBeforeEnter && $stack.length > 0) {
			$transitioning = 'out'
		}

		$stack = [...newStack, { component, props }]
	}

	const context = {
		openModal,
		closeModal: () => closeModals(1),
		closeModals,
		closeAllModals,
		stack,
		transitioning,
		action
	}

	setContext('svelte-modal-stack', context)

	// $: console.log($transitioning)

</script>

{#if $stack.length > 0}
	<slot name="backdrop" />
{/if}

<slot name="modals">
	{#each $stack as modal, i (i)}
		<svelte:component
			this={modal.component}
			isOpen={i === $stack.length - 1 && (!exitBeforeEnter || $transitioning !== 'out')}
			on:introstart={() => {
				$transitioning = 'in'
			}}
			on:introend={() => {
				$transitioning = null
			}}
			on:outroend={() => {
				$transitioning = null
			}}
			{...modal.props || {}}
		/>
	{/each}
</slot>

<slot {...context} stack={$stack} />
