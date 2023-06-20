module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.json',
    tsconfigRootDir: 'cypress',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'node']
};
