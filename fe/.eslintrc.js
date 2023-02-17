module.exports = {
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort', 'unused-imports'],
  extends: ['airbnb', 'airbnb-typescript'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-no-useless-fragment': 0,
    'react/require-default-props': 0,
    'react/no-unescaped-entities': 0,

    /* Airbnb overrides */
    'arrow-parens': [2, 'as-needed', { 'requireForBlockBody': true }],
    'class-methods-use-this': 0,
    'import/extensions': 0,
    'import/no-cycle': 0,
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': ['**/*.spec.js', '**/*.e2e-spec.js', '**/*.spec.ts', '**/*.e2e-spec.ts']
    }],
    'import/prefer-default-export': 0,
    'max-classes-per-file': 0,
    'max-len': ['error', { 'code': 140 }],
    'no-console': 0,
    'no-param-reassign': 0,
    'no-restricted-syntax': 0,
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 8, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 8, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 8, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 8, multiline: true, consistent: true },
    }],
    'prefer-object-spread': 0,

    /* Unused imports plugin */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }],

    /* Import ordering fix */
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/order': 0,
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',

    /* Indentation Fix */
    'indent': 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        'ignoredNodes': [
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
        ]
      }
    ],
  },
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            // The default grouping, but with type imports last as a separate
            // group, sorting that group like non-type imports are grouped.
            // Each array group means end-line separated items
            groups: [
              ['^\\u0000'], // side effect imports, `import 'module-alias'`
              [ // The node modules should be first
                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
                '^\\w', // first normal imports
                '^@\\w' // then imports starting with '@', `import a from 'a'; import b from '@a/b'`
              ],
              ['^'], // The ones that do not follow the pattern, `import a from '~a'`, not sure about that
              ['^\\.'], // imports starting with ., import a from './a'
              ['^\\w.*\\u0000$', '^@\\w.*\\u0000$'], // type imports, first normal imports, then imports starting with '@', `import type a from 'a'; import type b from '@a/b'`
              ['^[^.].*\\u0000$'], // The type imports that do not follow the pattern, `import a from '~a'`, not sure about that
              ['^\\..*\\u0000$'],// type imports starting with ., import type a from './a'
            ],
          },
        ],
      },
    },
  ],
};
