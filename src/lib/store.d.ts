import { SvelteComponent, SvelteComponentTyped } from 'svelte'
import { SvelteComponentDev } from 'svelte/internal'
import { Writable } from 'svelte/store'

/**
 * Opens a new modal
 */
export const openModal: <T>(
  component: SvelteComponent | SvelteComponentTyped<T> | SvelteComponentDev,
  props?: T,
  options?: {
    /**
     * This modal will replace the last modal in the stack
     */
    replace?: boolean
  }
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
 * A Svelte store describing how the current modal came to be active ("push" or "pop").
 * This can be useful for transitions if they should animate differently based on the action.
 */
export const action: Writable<null | 'push' | 'pop'>
