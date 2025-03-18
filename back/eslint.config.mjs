// @ts-check

import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // @ts-ignore
    plugins: ['import'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Встроенные модули Node.js (fs, path)
            'external', // Внешние модули (lodash, axios и т. д.)
            'internal', // Внутренние модули проекта
            ['parent', 'sibling', 'index'], // Родительские и соседние модули
          ],
          'newlines-between': 'always', // Добавляет пустую строку между группами
          alphabetize: { order: 'asc', caseInsensitive: true }, // Сортирует по алфавиту, без учета регистра
        },
      ],
    },
  },
);
