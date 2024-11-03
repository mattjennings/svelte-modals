import type { Component } from 'svelte'
import type { ModalProps } from './stacked-modal.svelte'

export type ModalComponent<
  Props extends ModalProps<any> = ModalProps<any>,
  Exports extends Record<string, any> = {},
  Bindings extends keyof Props | '' = string
> = Component<Props, Exports, Bindings>

export type LazyModalComponent<
  Props extends ModalProps<any> = ModalProps<any>,
  Exports extends Record<string, any> = {},
  Bindings extends keyof Props | '' = string
> = () => Promise<{
  default: ModalComponent<Props, Exports, Bindings>
}>
