import type { Event } from '@natmri/core'
import type { IMessagePassingProtocol } from '../ipc'
import type { VSBuffer } from '../helper/buffer'

export interface WebviewPort {
  send(...args: any[]): void
}

export class Protocol implements IMessagePassingProtocol {
  constructor(readonly port: WebviewPort, public onMessage: Event<VSBuffer>) {}

  send(message: VSBuffer): void {
    this.port.send(message.buffer)
  }

  disconnect(): void {
    this.port.send('natmri:disconnect', null)
  }
}
