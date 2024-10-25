import { StackedModal } from './stacked-modal.svelte'
import type { FirstParam, LazyModalComponent, ModalComponent } from './types'

export class ModalStack {
  stack = $state<StackedModal[]>([])
  action = $state<null | 'push' | 'pop'>(null)

  exitBeforeEnter = $state(false)
  transitioning = $state(false)

  /**
   * Opens a new modal
   */
  async open<
    Props extends Record<string, any> = {},
    Exports extends Record<string, any> = {},
    Bindings extends keyof Props | '' = string,
    Result = FirstParam<Props['close']>
  >(
    component:
      | ModalComponent<Props, Exports, Bindings>
      | LazyModalComponent<Props, Exports, Bindings>,
    props?: Omit<Props, 'isOpen'>,
    options?: {
      /**
       * This modal will replace the last modal in the stack
       */
      replace?: boolean
    }
  ): Promise<Result | undefined> {
    if (this.transitioning) {
      return
    }

    this.action = 'push'

    if (this.exitBeforeEnter && this.stack.length) {
      this.transitioning = true
    }

    this.exitBeforeEnter = false

    // this object will be mutated by other functions
    const modal = new StackedModal({
      modalStack: this,
      component,
      props
    })

    if (options?.replace) {
      this.stack.pop()
    }

    this.stack.push(modal)

    return modal.promise
  }

  /**
   * Closes the last `amount` of modals in the stack
   *
   * If closing was prevented by any modal, it returns false and no modals are closed
   */
  close(amount = 1): boolean {
    if (typeof amount !== 'number' || amount < 1) {
      throw new Error('Amount must be a number greater than 0')
    }

    if (this.transitioning) {
      return false
    }

    const closedModals = this.stack.slice(this.stack.length - amount).reverse()

    let shouldClose = true
    for (const modal of closedModals) {
      if (modal?.onBeforeClose) {
        if (modal?.onBeforeClose() === false) {
          shouldClose = false
          break
        }
      }
    }

    if (shouldClose) {
      if (this.exitBeforeEnter && this.stack.length > 0) {
        this.transitioning = true
      }

      this.exitBeforeEnter = false
      this.action = 'pop'

      for (let i = 0; i < amount; i++) {
        this.stack.pop()
      }

      return true
    }

    return false
  }

  /**
   * Closes all modals in the stack.
   *
   * If closing was prevented by any modal, it returns false
   */
  closeAll(): boolean {
    return this.close(this.stack.length)
  }
}

const modals = new ModalStack()

export { modals }
