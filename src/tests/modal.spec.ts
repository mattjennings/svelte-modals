/* eslint-disable @typescript-eslint/no-empty-function */
import { Modal, Modals, type ModalComponent, type ModalProps } from '../lib'

const FakeComponent = class {} as any as ModalComponent<ModalProps<{ foo: 'bar' }>>

const modals = new Modals()

describe('close', () => {
  test('returns the value from modal.close()', async () => {
    const modal = new Modal(modals, { component: FakeComponent })
    modals.stack[0] = modal
    const promise = modal.promise

    modal.close({ foo: 'bar' })

    const result = await promise

    expect(result).toEqual({ foo: 'bar' })
  })

  test('return type of modal.close is inferred', async () => {
    const modal = new Modal(modals, { component: FakeComponent })
    modals.stack[0] = modal
    const promise = modal.promise
    modal.close({ foo: 'bar' })

    const result = await promise
    expectTypeOf(result).toMatchTypeOf<{ foo: 'bar' } | undefined>()
  })
})

describe('onBeforeClose', () => {
  test('prevents closing modal', () => {
    const fn = vi.fn().mockImplementation(() => false)

    const modal = new Modal(modals, { component: FakeComponent })
    modal.onBeforeClose = fn

    expect(modal.close()).toBe(false)
    expect(fn).toHaveBeenCalled()
  })

  test('allows modal to close', () => {
    const fn = vi.fn().mockImplementation(() => true)

    const modal = new Modal(modals, { component: FakeComponent })
    modal.onBeforeClose = fn

    expect(modal.close()).toBe(true)
    expect(fn).toHaveBeenCalled()
  })
})