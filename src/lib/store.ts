import { createEventDispatcher, SvelteComponentTyped } from 'svelte'

import { get, writable } from 'svelte/store'

let ids = 0

export const exitBeforeEnter = writable(false)

/**
 * The transition state of the modals
 */
export const transitioning = writable(false)

/**
 * A Svelte store containing the current modal stack
 */
export const modals = writable<StoredModal[]>([])

interface StoredModal {
  id: number
  component: SvelteModalComponent | LazySvelteModalComponent
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
 * If closing was prevented by any modal, it returns false
 */
export function closeAllModals(result?: unknown): boolean {
  const modalsLength = get(modals).length
  return closeModals(modalsLength, result)
}

/**
 * Closes the last `amount` of modals in the stack
 *
 * If closing was prevented by any modal, it returns false
 */
export function closeModals(amount = 1, result?: unknown): boolean {
  const modalsLength = get(modals).length

  if (get(transitioning)) {
    return false
  }

  const closedModals = get(modals)
    .slice(modalsLength - amount)
    .reverse()

  let closedAmount = 0

  for (const modal of closedModals) {
    modal.result = result

    if (modal?.callbacks?.onBeforeClose) {
      if (modal?.callbacks?.onBeforeClose() === false) {
        break
      }
    }
    closedAmount++
  }

  if (get(exitBeforeEnter) && modalsLength > 0) {
    transitioning.set(true)
  }
  exitBeforeEnter.set(false)

  action.set('pop')

  pop(closedAmount)

  return amount === closedAmount
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
export async function openModal<
  Props extends Record<string, any> = any,
  Events extends Record<string, any> = any,
  Slots extends Record<string, any> = any,
  Result = void
>(
  component:
    | SvelteModalComponent<Props, Events, Slots>
    | Array<SvelteModalComponent<Props, Events, Slots>>,
  props?: Omit<Props, 'isOpen'>,
  options?: {
    /**
     * This modal will replace the last modal in the stack
     */
    replace?: boolean
    on?: Record<string, (event: Event) => void>
  }
): Promise<Result | undefined> {
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
  const dispatch = createEventDispatcher()

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
