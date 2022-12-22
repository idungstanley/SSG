module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  root: true,
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    // project: './tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // 'react/jsx-filename-extension': [
    //   2,
    //   { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    // ],
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/space-before-function-paren': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    'no-var': 2,
    'no-loop-func': 'off',
    'react/forbid-prop-types': 'off',
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': [2, { props: false }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
      },
    ],
    'max-len': [
      'error',
      {
        code: 500,
      },
    ],
    'jsx-quotes': [2, 'prefer-double'],
    // 'react/jsx-filename-extension': [
    //   2,
    //   { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    // ],
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: false,
    //     optionalDependencies: false,
    //     peerDependencies: false,
    //     packageDir: './',
    //   },
    // ],
    // 'no-loop-func': 'off',
    // 'jsx-a11y/control-has-associated-label': 'off',
    // 'react/forbid-prop-types': 'off',
    // 'no-nested-ternary': 'off',
    // 'import/prefer-default-export': 'off',
    // 'no-param-reassign': [2, { props: false }],
    // 'import/no-named-as-default': 0,
    // 'import/no-named-as-default-member': 0,
    // 'react/function-component-definition': [
    //   2,
    //   {
    //     namedComponents: 'function-declaration',
    //   },
    // ],
    // 'max-len': [
    //   'error',
    //   {
    //     code: 500,
    //   },
    // ],
    // 'jsx-a11y/label-has-associated-control': [
    //   'error',
    //   {
    //     required: {
    //       some: ['nesting', 'id'],
    //     },
    //   },
    // ],
    // 'jsx-a11y/label-has-for': [
    //   'error',
    //   {
    //     required: {
    //       some: ['nesting', 'id'],
    //     },
    //   },
    // ],
    // 'jsx-quotes': [2, 'prefer-double'],
  },
};
