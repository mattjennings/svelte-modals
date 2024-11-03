/* eslint-disable @typescript-eslint/no-empty-function */
import { modals, type ModalComponent, type ModalProps } from '../lib'

const FakeComponent = class {} as any as ModalComponent<ModalProps<{ foo: 'bar' }>>

afterEach(() => {
  modals.stack.length = 0
})

describe('open', () => {
  test('adds a modal to the stack', () => {
    modals.open(FakeComponent)
    expect(modals.stack).toHaveLength(1)
  })

  test('adds a 2nd modal to the stack', () => {
    modals.open(FakeComponent)
    modals.open(FakeComponent)
    expect(modals.stack).toHaveLength(2)
  })

  test('adds a modal to the stack with props', () => {
    modals.open(FakeComponent, { foo: 'bar' })
    expect(modals.stack).toHaveLength(1)
    expect(modals.stack[0].props).toEqual(expect.objectContaining({ foo: 'bar' }))
  })

  test('replaces a modal in the stack', () => {
    modals.open(FakeComponent)
    modals.open(FakeComponent, { foo: 'bar' }, { replace: true })
    expect(modals.stack).toHaveLength(1)
    expect(modals.stack[0].props).toEqual(expect.objectContaining({ foo: 'bar' }))
  })

  test('replace throws if current modal prevents closing', () => {
    modals.open(FakeComponent)
    modals.stack[0].onBeforeClose = () => false
    expect(modals.open(FakeComponent, { foo: 'bar' }, { replace: true })).rejects.toThrow()
  })
})

describe('close', () => {
  test('removes a modal from the stack', () => {
    modals.open(FakeComponent)
    modals.close()
    expect(modals.stack).toHaveLength(0)
  })

  test('removes multiple modals from the stack', () => {
    modals.open(FakeComponent)
    modals.open(FakeComponent)
    modals.open(FakeComponent)
    modals.close(2)
    expect(modals.stack).toHaveLength(1)
  })
})

describe('closeById', () => {
  test('removes a modal from the stack', () => {
    modals.open(FakeComponent)
    modals.closeById(modals.stack[0].id)
    expect(modals.stack).toHaveLength(0)
  })

  test('removes multiple modals from the stack', () => {
    modals.open(FakeComponent)
    modals.open(FakeComponent)
    modals.open(FakeComponent)
    modals.closeById(modals.stack[1].id)
    expect(modals.stack).toHaveLength(2)
  })

  test('returns false if modal is not found', () => {
    modals.open(FakeComponent)
    expect(modals.closeById('not-found')).toBe(false)
  })
})

describe('onBeforeClose', () => {
  test('prevents closing modal', () => {
    const fn = vi.fn().mockImplementation(() => false)

    modals.open(FakeComponent)

    const modal = modals.stack[0]
    modal.onBeforeClose = fn

    expect(modals.close()).toBe(false)
    expect(fn).toHaveBeenCalled()
  })

  test('closes current modal but prevents closing next one', () => {
    const fn = vi.fn().mockImplementation(() => false)

    modals.open(FakeComponent)
    modals.open(FakeComponent)

    const modal = modals.stack[0]
    modal.onBeforeClose = fn

    expect(modals.close(2)).toBe(false)
    expect(modals.stack).toHaveLength(1)
  })

  test('allows modal to close', () => {
    const fn = vi.fn().mockImplementation(() => true)

    modals.open(FakeComponent)

    const modal = modals.stack[0]
    modal.onBeforeClose = fn

    expect(modals.close()).toBe(true)
    expect(fn).toHaveBeenCalled()
    expect(modals.stack).toHaveLength(0)
  })
})
