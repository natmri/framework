import { once } from './functional'

export interface IDisposable {
  dispose: () => void
}

export function isDisposable(obj: any): obj is IDisposable {
  return typeof obj.dispose === 'function'
}

/**
 * Turn a function that implements dispose into an {@link IDisposable}.
 */
export function toDisposable(fn: () => void): IDisposable {
  const self = {
    dispose: once(() => {
      fn()
    }),
  }
  return self
}
