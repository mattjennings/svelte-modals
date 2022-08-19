import { createEventDispatcher, SvelteComponentTyped } from 'svelte'

import { get, writable } from 'svelte/store'

let ids = 0

export const exitBeforeEnter = writable(false)

/**
 * The transition state of the modals
 */
export const transitioning = writable(null)

/**
 * A Svelte store containing the current modal stack
 */
export const modals = writable<StoredModal[]>([])

interface StoredModal {
  id: number
  component: SvelteModalComponent<any> | LazySvelteModalComponent<any>
  props?: Record<string, unknown>
  callbacks?: {
    onBeforeClose?: () => boolean | void
  }
  eventHandlers?: Record<string, (event: Event) => void>
  result?: unknown
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
export function closeModals(amount = 1, result?: unknown): boolean {
  const modalsLength = get(modals).length
  const currentModal = get(modals)[modalsLength - 1]

  if (get(transitioning)) {
    return false
  }

  currentModal.result = result

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
export function closeModal(result?: unknown): boolean {
  return closeModals(1, result)
}

/**
 * Opens a new modal
 */
export async function openModal<T, Result = void>(
  component: SvelteModalComponent<T> | Array<SvelteModalComponent<T>>,
  props?: Omit<T, 'isOpen'>,
  options?: {
    /**
     * This modal will replace the last modal in the stack
     */
    replace?: boolean
    on?: Record<string, (event: Event) => void>
  }
): Promise<Result> {
  if (get(transitioning)) {
    return
  }

  const id = ids++
  action.set('push')

  if (get(exitBeforeEnter) && get(modals).length) {
    transitioning.set(true)
  }
  exitBeforeEnter.set(false)

  // this object will be mutated by other functions
  const modal = {
    id,
    component,
    props,
    eventHandlers: options?.on,
    result: undefined
  }

  if (options?.replace) {
    modals.update((prev) => [...prev.slice(0, prev.length - 1), modal] as StoredModal[])
  } else {
    modals.update((prev) => [...prev, modal] as StoredModal[])
  }

  return new Promise((resolve) => {
    modals.subscribe((value) => {
      const closed = value.every((m) => m.id !== id)

      if (closed) {
        resolve(modal.result)
      }
    })
  })
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

export function createModalEventDispatcher<T>(): <EventKey extends Extract<keyof T, string>>(
  type: EventKey,
  detail?: T[EventKey]
) => void {
  const dispatch = createEventDispatcher<T>()

  const allModals = get(modals)
  const modal = allModals[allModals.length - 1]

  return (type, detail) => {
    dispatch(type, detail)

    const event = new CustomEvent(type, { detail })
    modal.eventHandlers?.[type]?.(event)
  }
}

function pop(amount = 1) {
  modals.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)))
}

export type SvelteModalComponent<T> = new (...args: any) => SvelteComponentTyped<T>
export type LazySvelteModalComponent<T> = () => Promise<{ default: SvelteModalComponent<T> }>
