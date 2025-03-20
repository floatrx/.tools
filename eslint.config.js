const js = require('@eslint/js');
const globals = require('globals');
const tsEslint = require('typescript-eslint');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = tsEslint.config(
  { ignores: [] },
  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      /**
       * Enforce a convention in the order of import statements
       * @see https://github.com/lydell/eslint-plugin-simple-import-sort/tree/main
       */
      'simple-import-sort/imports': [
        'error',
        {
          /**
           * The default grouping, but with type imports first as a separate
           * group, sorting that group like non-type imports are grouped.
           * @see https://github.com/lydell/eslint-plugin-simple-import-sort/blob/main/examples/.eslintrc.js
           */
          groups: [['^node:.*\\u0000$', '^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'], ['^\\u0000'], ['^'], ['^\\.']],
        },
      ],
      /**
       * Disallow unused variables and arguments
       * except for those that start with an underscore...
       */
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_|^e',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  }
);
