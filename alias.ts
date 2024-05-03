import { resolve } from 'node:path'

const r = (...paths: string[]) => resolve(__dirname, 'packages', ...paths)

export const alias = {
  '@natmri/di': r('di/src/index.ts'),
}
