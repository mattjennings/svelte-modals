import { openModal, modals, closeModal, closeModals, closeAllModals } from './store'
import { get } from 'svelte/store'

const FakeComponent = class {} as any

afterEach(() => {
  modals.set([])
})

describe('openModal', () => {
  test('adds a modal to the stack', () => {
    openModal(FakeComponent)
    expect(get(modals)).toHaveLength(1)
  })

  test('adds a modal to the stack with props', () => {
    openModal(FakeComponent, { foo: 'bar' })
    expect(get(modals)).toHaveLength(1)
    expect(get(modals)[0].props).toEqual({ foo: 'bar' })
  })

  test('adds a modal to the stack with event listeners', () => {
    openModal(
      FakeComponent,
      {},
      {
        on: {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          foo: () => {}
        }
      }
    )
    expect(get(modals)).toHaveLength(1)
    expect(get(modals)[0].eventHandlers).toHaveProperty('foo')
  })

  test('replaces a modal in the stack', () => {
    openModal(FakeComponent)
    openModal(FakeComponent, { foo: 'bar' }, { replace: true })
    expect(get(modals)).toHaveLength(1)
    expect(get(modals)[0].props).toEqual({ foo: 'bar' })
  })
})

describe('closeModal', () => {
  test('removes a modal from the stack', () => {
    openModal(FakeComponent)
    closeModal()
    expect(get(modals)).toHaveLength(0)
  })

  test('returns a value to openModal', async () => {
    const [result] = await Promise.all([openModal(FakeComponent), closeModal(true)])

    expect(result).toBe(true)
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

  test('returns same value to each openModal', async () => {
    const [result1, result2] = await Promise.all([
      openModal(FakeComponent),
      openModal(FakeComponent),

      closeModals(2, true)
    ])

    expect(result1).toBe(true)
    expect(result2).toBe(true)
  })

  test('current modal prevents closing', async () => {
    const onBeforeClose = vi.fn().mockImplementation(() => false)

    openModal(FakeComponent)
    openModal(FakeComponent)

    const currentModal = get(modals)[1]
    currentModal.callbacks = {
      onBeforeClose
    }

    expect(closeModals(1)).toBe(false)
    expect(onBeforeClose).toHaveBeenCalled()
    expect(get(modals)).toHaveLength(2)
  })

  test('current modal closes, but next one prevents closing', async () => {
    const onBeforeClose = vi.fn().mockImplementation(() => false)

    openModal(FakeComponent)
    openModal(FakeComponent)

    const currentModal = get(modals)[0]
    currentModal.callbacks = {
      onBeforeClose
    }

    expect(closeModals(2)).toBe(false)
    expect(get(modals)).toHaveLength(1)
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

  test('returns same value to each openModal', async () => {
    const [result1, result2] = await Promise.all([
      openModal(FakeComponent),
      openModal(FakeComponent),

      closeAllModals(true)
    ])

    expect(result1).toBe(true)
    expect(result2).toBe(true)
  })
})
