import { Event } from '@natmri/core'
import type { MessagePortMain } from 'electron'
import { VSBuffer } from '../helper/buffer'
import type { IMessagePassingProtocol } from '../ipc'

/**
 * The MessagePort `Protocol` leverages MessagePortMain style IPC communication
 * for the implementation of the `IMessagePassingProtocol`.
 */
export class Protocol implements IMessagePassingProtocol {
  readonly onMessage: Event<VSBuffer>

  constructor(private port: MessagePortMain) {
    // we must call start() to ensure messages are flowing
    port.start()

    this.onMessage = Event.fromNodeEventEmitter<VSBuffer>(this.port, 'message', (e: MessageEvent) => {
      if (e.data)
        return VSBuffer.wrap(e.data)

      return VSBuffer.alloc(0)
    })
  }

  send(message: VSBuffer): void {
    this.port.postMessage(message.buffer)
  }

  disconnect(): void {
    this.port.close()
  }
}
