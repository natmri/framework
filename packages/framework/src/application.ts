import { InstantiationService, ServiceCollection, SyncDescriptor } from '@natmri/di'
import { Event } from '@natmri/core'
import { app } from 'electron'
import { IWindowManager, WindowManager } from './managers/windowManager'

const collection = new ServiceCollection()
collection.set(IWindowManager, new SyncDescriptor(WindowManager))
const instantiationService = new InstantiationService(collection)

export interface Options {

}

export class Application {
  onReady = Event.once<void>(Event.fromNodeEventEmitter(app, 'ready'))

  constructor(
    private readonly options: Options,
    @IWindowManager private readonly windowManager: IWindowManager,
  ) { }
}

export function createApplication(options: Options) {
  return instantiationService.createInstance(new SyncDescriptor(Application, [options]))
}
