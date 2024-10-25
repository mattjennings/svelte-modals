import type { ModalProps } from './Modals.svelte'
import type { ModalStack } from './modal-stack.svelte'
import type { LazyModalComponent, ModalComponent } from './types'

export class StackedModal<R = any> {
  private static _idCounter = 0
  private modalStack: ModalStack
  private _props: Record<string, any>
  private result = createDeferredPromise<R>()

  id: number
  component: ModalComponent | LazyModalComponent

  constructor({
    modalStack,
    component,
    props
  }: {
    modalStack: ModalStack
    component: ModalComponent<any, any, any> | LazyModalComponent<any, any, any>
    props?: Record<string, any>
  }) {
    this.id = StackedModal._idCounter++
    this.component = component
    this._props = props ?? {}
    this.modalStack = modalStack
  }

  isActive = $derived(() => {
    if (this.modalStack.stack.length === 0) {
      return false
    }

    return (
      this.modalStack.stack[this.modalStack.stack.length - 1].id === this.id &&
      !this.modalStack.transitioning
    )
  })

  get index() {
    return this.modalStack.stack.indexOf(this as StackedModal<any>)
  }

  get props(): ModalProps & Record<string, any> {
    return {
      ...this._props,
      isOpen: this.isActive(),
      onintrostart: () => {
        this.modalStack.exitBeforeEnter = true
        this._props?.onintrostart?.()
      },
      onoutroend: () => {
        // unsure why, but without this timeout sometimes the modal is briefly shown before being removed
        // started happening with svelte 5
        setTimeout(() => {
          this.modalStack.transitioning = false
        })
        this._props?.onoutroend?.()
      }
    }
  }

  close(result: R) {
    const all = this.modalStack.stack
    if (all[all.length - 1].id === this.id) {
      const closed = this.modalStack.close()

      if (closed) {
        this.result.resolve(result)
      }
      return closed
    } else {
      console.warn('This modal is not currently open and cannot be closed')
    }
  }

  onBeforeClose?: () => boolean | void

  get promise() {
    return this.result.promise
  }
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
