// eslint.config.mjs
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: 2022,
      sourceType: 'commonjs',
    },

    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },

    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      'no-console': 'off',
      'prettier/prettier': 'error',
    },
  },
];
