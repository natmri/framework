export function once<T extends Function>(this: unknown, fn: T): T {
  // eslint-disable-next-line ts/no-this-alias
  const _this = this
  let didCall = false
  let result: unknown

  return function (...args: unknown[]) {
    if (didCall)
      return result

    didCall = true

    result = fn.apply(_this, ...args)

    return result
  } as unknown as T
}
