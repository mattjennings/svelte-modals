import { SvelteComponent, SvelteComponentTyped } from 'svelte'
import { SvelteComponentDev } from 'svelte/internal'
import { Writable } from 'svelte/store'

/**
 * Adds a Modal component to the stack
 */
export const openModal: <T>(
  component: SvelteComponent | SvelteComponentTyped<T> | SvelteComponentDev,
  props?: T,
  options?: { replace?: boolean }
) => void

/**
 * Closes the current modal component
 */
export const closeModal: () => void

/**
 * Closes the last `amount` of modals in the stack
 */
export const closeModals: (amount: number) => void

/**
 * Closes all modals in the stack
 */
export const closeAllModals: () => void

/**
 * A Svelte store containing the current modal stack
 */
export const stack: Writable<Array<{ component: SvelteComponent; props?: unknown }>>

/**
 * The transition state of the modals
 */
export const transitioning: Writable<null | 'in' | 'out'>

/**
 * A store describing how the current modal came to be active. "push" means it was
 * newly added (from openModal), "pop" means the modal ahead of it was closed (closeModal).
 *
 * This can be useful for animations
 */
export const action: Writable<null | 'push' | 'pop'>
