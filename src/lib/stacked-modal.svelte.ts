import { ModalStack } from './modal-stack.svelte'
import type { LazyModalComponent, ModalComponent } from './types'

export interface ModalProps<ReturnValue = any> extends Record<string, any> {
  id: string
  index: number
  close: CloseFn<ReturnValue>
  isOpen: boolean
}

type CloseFn<R> = (...args: R extends void ? [] : [result: R]) => boolean

export class StackedModal<R = any> extends EventTarget {
  private static _idCounter = 0
  private _props: Record<string, any>
  private result = createDeferredPromise<R>()

  id: string
  component: ModalComponent | LazyModalComponent
  modals: ModalStack
  exitBeforeEnter = $state(false)

  constructor(
    modals: ModalStack,
    {
      id,
      component,
      props
    }: {
      id?: string
      component: ModalComponent<any, any, any> | LazyModalComponent<any, any, any>
      props?: Record<string, any>
    }
  ) {
    super()
    this.id = id || (StackedModal._idCounter++).toString()
    this.component = component
    this._props = props ?? {}
    this.modals = modals
  }

  isOpen = $derived.by(() => {
    if (this.modals.stack.length === 0) {
      return false
    }

    const isCurrent = this.modals.stack[this.modals.stack.length - 1].id === this.id

    return isCurrent && !this.modals.transitioning
  })

  get index() {
    return this.modals.stack.indexOf(this as StackedModal<any>)
  }

  get props(): ModalProps & Record<string, any> {
    return {
      ...this._props,
      id: this.id,
      index: this.index,
      isOpen: this.isOpen,
      close: this.close as CloseFn<R>
    }
  }

  close = (...args: R extends void ? [] : [result: R]) => {
    if (this.onBeforeClose?.() === false) {
      return false
    }

    const value = args[0]

    this.dispatchEvent(new CustomEvent('close', { detail: value }))
    this.result.resolve(value as R)

    return true
  }

  get promise() {
    return this.result.promise
  }

  onBeforeClose?: () => boolean | void
}

function createDeferredPromise<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: any) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}
