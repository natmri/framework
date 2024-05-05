import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    { builder: 'mkdist', input: './src/adapters/', outDir: './adapters' },
  ],
  rollup: {
    emitCJS: true,
  },
  declaration: true,
  clean: true,
})
