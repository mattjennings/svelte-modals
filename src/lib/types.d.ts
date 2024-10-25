export type FirstParam<T> = T extends (arg: infer P) => any ? P : never

/**
 * Closes the modal and resolves the corresponding `openModal` promise with the given result.
 *
 * If the modal was prevented from closing via onBeforeClose, it will return false.
 */
export type CloseProp<T = unknown> = (result: T) => boolean

export type ModalComponent<
  Props extends Record<string, any> = {},
  Exports extends Record<string, any> = {},
  Bindings extends keyof Props | '' = string
> = Component<Props, Exports, Bindings>

export type LazyModalComponent<
  Props extends Record<string, any> = {},
  Exports extends Record<string, any> = {},
  Bindings extends keyof Props | '' = string
> = () => Promise<{
  default: ModalComponent<Props, Exports, Bindings>
}>
