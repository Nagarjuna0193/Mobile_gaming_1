module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  env: {
    node: true,
    jest: true,
    es6: true
  },
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    'react/prop-types': 'off'
  }
};
