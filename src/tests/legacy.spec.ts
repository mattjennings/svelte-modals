/* eslint-disable @typescript-eslint/no-empty-function */
import { modals } from '../lib'
import {
  openModal,
  modals as modalsStore,
  closeModal,
  closeModals,
  closeAllModals,
  onBeforeClose
} from '../lib/legacy.svelte'
import { get } from 'svelte/store'

const FakeComponent = class {} as any

afterEach(() => {
  modals.stack.length = 0
})

describe('openModal', () => {
  test('adds a modal to the stack', () => {
    openModal(FakeComponent)
    const $modalsStore = get(modalsStore)
    expect($modalsStore).toHaveLength(1)
    expect($modalsStore[0].isOpen()).toBe(true)
  })

  test('adds a 2nd modal to the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent)
    const $modalsStore = get(modalsStore)
    expect($modalsStore).toHaveLength(2)
    expect($modalsStore[0].isOpen()).toBe(false)
    expect($modalsStore[1].isOpen()).toBe(true)
  })

  test('adds a modal to the stack with props', () => {
    openModal(FakeComponent, { foo: 'bar' })
    expect(get(modalsStore)).toHaveLength(1)
    expect(get(modalsStore)[0].props).toEqual(expect.objectContaining({ foo: 'bar' }))
  })

  test('replaces a modal in the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent, { foo: 'bar' }, { replace: true })
    expect(get(modalsStore)).toHaveLength(1)
    expect(get(modalsStore)[0].props).toEqual(expect.objectContaining({ foo: 'bar' }))
  })

  test('replace does not throw if current modal prevents closing', () => {
    openModal(FakeComponent)
    const currentModal = get(modalsStore)[0]
    currentModal.onBeforeClose = () => false
    expect(openModal(FakeComponent, { replace: true })).toEqual(expect.any(Promise))
  })

  test('returns the value from modal.close()', async () => {
    const promise = openModal(FakeComponent)
    const modal = get(modalsStore)[0]
    modal.close('foo')

    const result = await promise

    expect(result).toBe('foo')
  })
})

describe('closeModal', () => {
  test('removes a modal from the stack', () => {
    openModal(FakeComponent)
    closeModal()
    expect(get(modalsStore)).toHaveLength(0)
  })
})

describe('closeModals', () => {
  test('removes multiple modals from the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent)
    openModal(FakeComponent)
    closeModals(2)
    expect(get(modalsStore)).toHaveLength(1)
  })

  describe('onBeforeClose', () => {
    test('current modal prevents closing', async () => {
      const onBeforeClose = vi.fn().mockImplementation(() => false)

      openModal(FakeComponent)
      openModal(FakeComponent)

      const currentModal = get(modalsStore)[1]

      currentModal.onBeforeClose = onBeforeClose

      expect(closeModals(1)).toBe(false)
      expect(onBeforeClose).toHaveBeenCalled()
      expect(get(modalsStore)).toHaveLength(2)
    })

    test('current modal closes, but next one prevents closing', async () => {
      const onBeforeClose = vi.fn().mockImplementation(() => false)

      openModal(FakeComponent)
      openModal(FakeComponent)

      const currentModal = get(modalsStore)[0]
      currentModal.onBeforeClose = onBeforeClose

      expect(closeModals(2)).toBe(false)
      expect(get(modalsStore)).toHaveLength(1)
    })

    test('allows modal to close', async () => {
      const onBeforeClose = vi.fn().mockImplementation(() => true)

      openModal(FakeComponent)

      const currentModal = get(modalsStore)[0]
      currentModal.onBeforeClose = onBeforeClose

      expect(closeModals(1)).toBe(true)
      expect(onBeforeClose).toHaveBeenCalled()
      expect(get(modalsStore)).toHaveLength(0)
    })
  })
})

describe('closeAllModals', () => {
  test('removes all modals from the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent)
    openModal(FakeComponent)
    closeAllModals()
    expect(get(modalsStore)).toHaveLength(0)
  })
})

describe('onBeforeClose', () => {
  test('sets onBeforeClose callback for current modal', () => {
    const fn = vi.fn().mockImplementation(() => true)

    openModal(FakeComponent)
    onBeforeClose(fn)

    const currentModal = get(modalsStore)[0]

    expect(currentModal.onBeforeClose).toBe(fn)
  })
})
