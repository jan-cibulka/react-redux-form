module.exports = {
  root: true,
  env: {
    'browser': true,
    'node': true,
    'es6': true,
    'jest/globals': true,
  },
  ignorePatterns: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', 'jest', 'import', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      'typescript': {},
    },
    next: {
      rootDir: 'src/',
    },
  },

  extends: [
    'prettier',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'next/core-web-vitals',
  ],
  rules: {
    'react/prop-types': ['error', { skipUndeclared: true }],

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': true }],
    'import/order': ['warn', { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'] }],
    // 'import/no-unresolved': ['error', { ignore: ['.(jpe?g|png|svg|gif|ico|webp)$'] }],
    'import/no-unresolved': 0, // todo fix no-unresolved with next
    'import/default': 'off',
    'import/named': 'off',
    'import/no-named-as-default-member': 'off',
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-restricted-imports': ['error', '@sentry/node'],
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        'additionalHooks': '(useDrop|useDrag)',
      },
    ],
    '@next/next/no-img-element': 'off',
  },
};
