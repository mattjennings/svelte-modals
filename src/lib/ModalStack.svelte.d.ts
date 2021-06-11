import { SvelteComponent, SvelteComponentTyped } from 'svelte'
import { Writable } from 'svelte/store'

export interface ModalStackContext {
	/**
	 * Adds a Modal component to the stack
	 */
	openModal: <T>(component: SvelteComponent, props?: T, options?: { replace?: boolean }) => void

	/**
	 * Closes the current modal component
	 */
	closeModal: () => void

	/**
	 * Closes the last `amount` of modals in the stack
	 */
	closeModals: (amount: number) => void

	/**
	 * Closes all modals in the stack
	 */
	closeAllModals: () => void

	/**
	 * A Svelte store containing the current modal stack
	 */
	stack: Writable<Array<{ component: SvelteComponent; props?: unknown }>>

	/**
	 * If `exitBeforeEnter` is enabled on the ModalStack component, this store will contain
	 * the current transition state (either null, 'in' or 'out')
	 */
	transitioning: Writable<null | 'in' | 'out'>

	/**
	 * A store describing how the current modal came to be active. "push" means it was
	 * newly added (from openModal), "pop" means the modal ahead of it was closed (closeModal).
	 *
	 * This can be useful for animations
	 */
	action: Writable<null | 'push' | 'pop'>
}

export function useModals(): ModalStackContext

export default class ModalStack extends SvelteComponentTyped<
	{
		exitBeforeEnter?: boolean
	},
	Record<string, never>,
	{
		backdrop: ModalStackContext
		modals: ModalStackContext
		default: Record<string, never>
	}
> {}
