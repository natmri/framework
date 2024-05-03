import { describe, expect, it } from 'vitest'
import type { ServiceDescriptor } from '@natmri/di'
import { InstantiationService, ServiceCollection, SyncDescriptor, createDecorator } from '@natmri/di'

interface IAService extends ServiceDescriptor {
  callA(): string
}

const IAService = createDecorator<IAService>('IAService')

class AService implements IAService {
  declare readonly _serviceBrand: undefined

  callA(): string {
    return 'AService'
  }
}

interface IBService extends ServiceDescriptor {
  callB(): string
}

const IBService = createDecorator<IBService>('IBService')

class BService implements IBService {
  declare readonly _serviceBrand: undefined

  callB(): string {
    return 'BService'
  }
}

class Main {
  constructor(
    @IAService public readonly _aService: IAService,
    @IBService public readonly _bService: IBService,
  ) {}

  callA() {
    return this._aService.callA()
  }

  callB() {
    return this._bService.callB()
  }
}

describe('dI', () => {
  it('should create decorators', () => {
    const collection = new ServiceCollection()
    collection.set(IAService, new SyncDescriptor(AService))
    collection.set(IBService, new SyncDescriptor(BService))
    const instantiation = new InstantiationService(collection)
    const main = instantiation.createInstance(Main)

    expect(main.callA()).toEqual('AService')
    expect(main.callB()).toEqual('BService')
  })
})
