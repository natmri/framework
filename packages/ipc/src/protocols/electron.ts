import type { Event } from '@natmri/core'
import type { IMessagePassingProtocol } from '../ipc'
import type { VSBuffer } from '../helper/buffer'

export interface Sender {
  send(channel: string, msg: unknown): void
}

/**
 * The Electron `Protocol` leverages Electron style IPC communication (`ipcRenderer`, `ipcMain`)
 * for the implementation of the `IMessagePassingProtocol`. That style of API requires a channel
 * name for sending data.
 */
export class Protocol implements IMessagePassingProtocol {
  constructor(private sender: Sender, readonly onMessage: Event<VSBuffer>) { }

  send(message: VSBuffer): void {
    try {
      this.sender.send('natmri:message', message.buffer)
    }
    catch (e) {
      // systems are going down
    }
  }

  disconnect(): void {
    this.sender.send('natmri:disconnect', null)
  }
}
