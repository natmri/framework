import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    { builder: 'mkdist', input: './src/adapters/', outDir: './adapters' },
  ],
  declaration: true,
  clean: true,
})
