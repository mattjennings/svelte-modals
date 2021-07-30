import type { SvelteComponent, SvelteComponentTyped } from 'svelte'
import type { SvelteComponentDev } from 'svelte/internal'

import { get, writable } from 'svelte/store'

export const exitBeforeEnter = writable(false)

/**
 * The transition state of the modals
 */
export const transitioning = writable(null)

/**
 * A Svelte store containing the current modal stack
 */
export const modals = writable<Array<{ component: SvelteComponent; props?: unknown }>>([])

/**
 * A Svelte store describing how the current modal came to be active ("push" or "pop").
 * This can be useful for transitions if they should animate differently based on the action.
 */
export const action = writable<null | 'push' | 'pop'>(null)

/**
 * Closes all modals in the stack
 */
export function closeAllModals(): void {
  modals.set([])
}

/**
 * Closes the last `amount` of modals in the stack
 */
export function closeModals(amount = 1): void {
  if (get(transitioning)) {
    return
  }

  const modalsLength = get(modals).length
  if (get(exitBeforeEnter) && modalsLength > 0) {
    transitioning.set(true)
  }
  exitBeforeEnter.set(false)

  action.set('pop')

  pop(amount)
}

/**
 * Closes the current modal component
 */
export function closeModal(): void {
  return closeModals(1)
}

/**
 * Opens a new modal
 */
export function openModal<T>(
  component: SvelteComponent | SvelteComponentTyped<T> | SvelteComponentDev,
  props?: T,
  options?: {
    /**
     * This modal will replace the last modal in the stack
     */
    replace?: boolean
  }
): void {
  if (get(transitioning)) {
    return
  }

  action.set('push')

  if (get(exitBeforeEnter) && get(modals).length) {
    transitioning.set(true)
  }
  exitBeforeEnter.set(false)

  if (options?.replace) {
    modals.update((prev) => [...prev.slice(0, prev.length - 1), { component, props }])
  } else {
    modals.update((prev) => [...prev, { component, props }])
  }
}

function pop(amount = 1) {
  modals.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)))
}
