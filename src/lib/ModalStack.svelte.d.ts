import { SvelteComponentTyped } from 'svelte'

export default class ModalStack extends SvelteComponentTyped<
  {
    exitBeforeEnter?: boolean
  },
  Record<string, never>,
  {
    backdrop: Record<string, never>
    modals: Record<string, never>
    default: Record<string, never>
  }
> {}
