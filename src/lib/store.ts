import type { SvelteComponent, SvelteComponentTyped } from 'svelte'
import type { SvelteComponentDev } from 'svelte/internal'

import { get, writable } from 'svelte/store'

export const exitBeforeEnter = writable(false)
export const transitioning = writable(null)

export const stack = writable<Array<{ component: SvelteComponent; props?: unknown }>>([])

export const action = writable<null | 'push' | 'pop'>(null)

function pop(amount = 1) {
  stack.update((prev) => prev.slice(0, Math.max(0, prev.length - amount)))
}

export function closeAllModals(): void {
  stack.set([])
}

export function closeModals(amount = 1): void {
  if (get(transitioning)) {
    return
  }

  const stackLength = get(stack).length
  if (get(exitBeforeEnter) && stackLength > 0) {
    transitioning.set(true)
  }
  exitBeforeEnter.set(false)

  action.set('pop')

  pop(amount)
}

export function closeModal(): void {
  return closeModals(1)
}

export function openModal<T>(
  component: SvelteComponent | SvelteComponentTyped<T> | SvelteComponentDev,
  props?: T,
  options?: { replace?: boolean }
): void {
  if (get(transitioning)) {
    return
  }

  action.set('push')

  if (options?.replace) {
    stack.update((prev) => prev.slice(0, prev.length - 1))
  }

  if (get(exitBeforeEnter) && get(stack).length) {
    transitioning.set(true)
  }
  exitBeforeEnter.set(false)

  stack.update((prev) => [...prev, { component, props }])
}
