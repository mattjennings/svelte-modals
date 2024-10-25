/* eslint-disable @typescript-eslint/no-empty-function */
import {
  openModal,
  modals,
  closeModal,
  closeModals,
  closeAllModals,
  onBeforeClose
} from '../lib/store'
import { get } from 'svelte/store'

const FakeComponent = class {} as any

afterEach(() => {
  modals.set([])
})

describe('openModal', () => {
  test('adds a modal to the stack', () => {
    openModal(FakeComponent)
    const $modals = get(modals)
    expect($modals).toHaveLength(1)
    expect(get($modals[0].isActive)).toBe(true)
  })

  test('adds a 2nd modal to the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent)
    const $modals = get(modals)
    expect($modals).toHaveLength(2)
    expect(get($modals[0].isActive)).toBe(false)
    expect(get($modals[1].isActive)).toBe(true)
  })

  test('adds a modal to the stack with props', () => {
    openModal(FakeComponent, { foo: 'bar' })
    expect(get(modals)).toHaveLength(1)
    expect(get(modals)[0].props).toEqual(expect.objectContaining({ foo: 'bar' }))
  })

  test('replaces a modal in the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent, { foo: 'bar' }, { replace: true })
    expect(get(modals)).toHaveLength(1)
    expect(get(modals)[0].props).toEqual(expect.objectContaining({ foo: 'bar' }))
  })

  test('returns the value from modal.close()', async () => {
    const promise = openModal(FakeComponent)
    const modal = get(modals)[0]
    modal.close('foo')

    const result = await promise

    expect(result).toBe('foo')
  })
})

describe('closeModal', () => {
  test('removes a modal from the stack', () => {
    openModal(FakeComponent)
    closeModal()
    expect(get(modals)).toHaveLength(0)
  })
})

describe('closeModals', () => {
  test('removes multiple modals from the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent)
    openModal(FakeComponent)
    closeModals(2)
    expect(get(modals)).toHaveLength(1)
  })

  describe('onBeforeClose', () => {
    test('current modal prevents closing', async () => {
      const onBeforeClose = vi.fn().mockImplementation(() => false)

      openModal(FakeComponent)
      openModal(FakeComponent)

      const currentModal = get(modals)[1]

      currentModal.onBeforeClose = onBeforeClose

      expect(closeModals(1)).toBe(false)
      expect(onBeforeClose).toHaveBeenCalled()
      expect(get(modals)).toHaveLength(2)
    })

    test('current modal closes, but next one prevents closing', async () => {
      const onBeforeClose = vi.fn().mockImplementation(() => false)

      openModal(FakeComponent)
      openModal(FakeComponent)

      const currentModal = get(modals)[0]
      currentModal.onBeforeClose = onBeforeClose

      expect(closeModals(2)).toBe(false)
      expect(get(modals)).toHaveLength(1)
    })

    test('allows modal to close', async () => {
      const onBeforeClose = vi.fn().mockImplementation(() => true)

      openModal(FakeComponent)

      const currentModal = get(modals)[0]
      currentModal.onBeforeClose = onBeforeClose

      expect(closeModals(1)).toBe(true)
      expect(onBeforeClose).toHaveBeenCalled()
      expect(get(modals)).toHaveLength(0)
    })
  })
})

describe('closeAllModals', () => {
  test('removes all modals from the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent)
    openModal(FakeComponent)
    closeAllModals()
    expect(get(modals)).toHaveLength(0)
  })
})

describe('onBeforeClose', () => {
  test('sets onBeforeClose callback for current modal', () => {
    const fn = vi.fn().mockImplementation(() => true)

    openModal(FakeComponent)
    onBeforeClose(fn)

    const currentModal = get(modals)[0]

    expect(currentModal.onBeforeClose).toBe(fn)
  })
})
