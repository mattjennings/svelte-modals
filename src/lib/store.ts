import type { SvelteComponentTyped } from 'svelte'

import { get, writable } from 'svelte/store'

export const exitBeforeEnter = writable(false)

/**
 * The transition state of the modals
 */
export const transitioning = writable<boolean | null>(null)

/**
 * A Svelte store containing the current modal stack
 */
export const modals = writable<StoredModal[]>([])

interface StoredModal {
  component: SvelteModalComponent<any> | LazySvelteModalComponent<any>
  props?: Record<string, unknown>
  callbacks?: {
    onBeforeClose?: () => boolean | void
  }
}

/**
 * A Svelte store describing how the current modal came to be active ("push" or "pop").
 * This can be useful for transitions if they should animate differently based on the action.
 */
export const action = writable<null | 'push' | 'pop'>(null)

/**
 * Closes all modals in the stack.
 *
 * If closing was prevented by the current modal, it returns false
 */
export function closeAllModals(): boolean {
  const modalsLength = get(modals).length
  const currentModal = get(modals)[modalsLength - 1]

  if (currentModal?.callbacks?.onBeforeClose) {
    if (currentModal?.callbacks?.onBeforeClose() === false) {
      return false
    }
  }

  modals.set([])

  return true
}

/**
 * Closes the last `amount` of modals in the stack
 *
 * If closing was prevented by the current modal, it returns false
 */
export function closeModals(amount = 1): boolean {
  const modalsLength = get(modals).length
  const currentModal = get(modals)[modalsLength - 1]

  if (get(transitioning)) {
    return false
  }

  if (currentModal?.callbacks?.onBeforeClose) {
    if (currentModal?.callbacks?.onBeforeClose() === false) {
      return false
    }
  }

  if (get(exitBeforeEnter) && modalsLength > 0) {
    transitioning.set(true)
  }
  exitBeforeEnter.set(false)

  action.set('pop')

  pop(amount)

  return true
}

/**
 * Closes the current modal component
 *
 * If closing was prevented by the current modal, it returns false
 */
export function closeModal(): boolean {
  return closeModals(1)
}

/**
 * Opens a new modal
 */
export function openModal<Props extends Record<string, any> = any>(
  component: SvelteModalComponent<Props, any, any> | LazySvelteModalComponent<Props, any, any>,
  props?: Omit<Props, 'isOpen'>,
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
    modals.update(
      (prev) => [...prev.slice(0, prev.length - 1), { component, props }] as StoredModal[]
    )
  } else {
    modals.update((prev) => [...prev, { component, props }] as StoredModal[])
  }
}

/**
 * Return false to prevent the current modal from being closed
 */
export function onBeforeClose(callback: () => boolean | void): void {
  modals.update((prev) => {
    const modal = prev[prev.length - 1]
    modal.callbacks = {
      ...modal.callbacks,
      onBeforeClose: callback
    }

    return prev
  })
}

function pop(amount = 1) {
  modals.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)))
}

export type SvelteModalComponent<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any,
  Slots extends Record<string, any> = any
> = new (...args: any) => SvelteComponentTyped<Props, Events, Slots>
export type LazySvelteModalComponent<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any,
  Slots extends Record<string, any> = any
> = () => Promise<{ default: SvelteModalComponent<Props, Events, Slots> }>
