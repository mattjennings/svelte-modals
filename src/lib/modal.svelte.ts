import { Modals } from './modals.svelte'
import type { LazyModalComponent, ModalComponent } from './types'

export interface ModalProps<ReturnValue = any> extends Record<string, any> {
  isActive: boolean
  id: string
  index: number
  close: CloseFn<ReturnValue>

  onintrostart: () => void
  onoutroend: () => void

  /**
   * @deprecated - use isActive prop or getModal().isActive
   */
  isOpen: boolean
}

type CloseFn<R> = (...args: R extends void ? [] : [result: R]) => boolean

export class Modal<R = any> {
  private static _idCounter = 0
  private modals: Modals
  private _props: Record<string, any>
  private result = createDeferredPromise<R>()

  id: string
  component: ModalComponent | LazyModalComponent

  constructor(
    modals: Modals,
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
    this.id = id || (Modal._idCounter++).toString()
    this.component = component
    this._props = props ?? {}
    this.modals = modals
  }

  isActive = $derived(() => {
    if (this.modals.stack.length === 0) {
      return false
    }

    return (
      this.modals.stack[this.modals.stack.length - 1].id === this.id && !this.modals.transitioning
    )
  })

  get index() {
    return this.modals.stack.indexOf(this as Modal<any>)
  }

  get props(): ModalProps & Record<string, any> {
    return {
      ...this._props,
      id: this.id,
      index: this.index,
      isOpen: this.isActive(),
      isActive: this.isActive(),
      close: this.close.bind(this) as CloseFn<R>,
      onintrostart: () => {
        this.modals.exitBeforeEnter = true
        this._props?.onintrostart?.()
      },
      onoutroend: () => {
        // unsure why, but without this timeout sometimes the modal is briefly shown before being removed
        // started happening with svelte 5
        setTimeout(() => {
          this.modals.transitioning = false
        })
        this._props?.onoutroend?.()
      }
    }
  }

  close(...args: R extends void ? [] : [result: R]) {
    if (this.onBeforeClose?.() === false) {
      return false
    }

    const value = args[0]

    this.onclose?.()
    this.result.resolve(value as any)

    return true
  }

  get promise() {
    return this.result.promise
  }

  onBeforeClose?: () => boolean | void

  onclose?: () => void
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
