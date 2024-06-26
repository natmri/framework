export interface ServiceDescriptor {
  readonly _serviceBrand: undefined
}

export class SyncDescriptor<T> {
  readonly ctor: any
  readonly staticArguments: any[]
  readonly supportsDelayedInstantiation: boolean

  constructor(ctor: new (...args: any[]) => T, staticArguments: any[] = [], supportsDelayedInstantiation: boolean = false) {
    this.ctor = ctor
    this.staticArguments = staticArguments
    this.supportsDelayedInstantiation = supportsDelayedInstantiation
  }
}

export interface SyncDescriptor0<T> {
  readonly ctor: new () => T
}
