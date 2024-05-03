import { antfu } from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': 'off',
    'ts/no-redeclare': 'off',
    'ts/no-use-before-define': 'off',
    'import/no-mutable-exports': 'off',
    'ts/method-signature-style': 'off',
  },
})
