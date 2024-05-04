import { autorun, derived, observableSignal, observableValue, transaction } from '@natmri/core'
import { describe, expect, it } from 'vitest'

describe('observable', () => {
  it('should work', () => {
    const signal = observableSignal<number>('test')

    const value = observableValue('test', 1)
    const derivedValue = derived((reader) => {
      if (value.read(reader))
        return value.get() * 2
    })
    autorun((reader) => {
      signal.read(reader)
      if (value.read(reader))
        console.log('value:', value.get())
      if (derivedValue.read(reader))
        console.log('derivedValue:', derivedValue.get())
    })

    transaction((tx) => {
      value.set(2, tx)
    })

    value.set(2, undefined)

    signal.trigger(undefined, 1)
    expect(value.get()).toBe(2)
  })
})
