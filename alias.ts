import { resolve } from 'node:path'

const r = (...paths: string[]) => resolve(__dirname, 'packages', ...paths)

export const alias = {
  '@natmri/core': r('core/src/index.ts'),
  '@natmri/di': r('di/src/index.ts'),
  '@natmri/ipc': r('ipc/src/index.ts'),
}
