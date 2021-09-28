/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    // 'airbnb',
    // 'airbnb-typescript',
    // 'airbnb/hooks',
    // 'plugin:@next/next/recommended',
    'next/core-web-vitals'
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': 0,
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    // 'import/prefer-default-export': 'off',
    // 'no-unused-vars': 'off',
    // '@typescript-eslint/no-unused-vars': ['error'],

    'react/no-unescaped-entities': 'off',
    '@next/next/no-page-custom-font': 'off'
  },
};
