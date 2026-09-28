import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

const BANNED_ABBREVIATIONS = [
  'kw',
  'q',
  'm',
  'mv',
  'g',
  's',
  'res',
  'req',
  'evt',
  'e',
  'cb',
  'fn',
  'prev',
  'nxt',
  'idx',
  'arr',
  'obj',
];

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-nested-ternary': 'error',
      'no-else-return': 'error',
      yoda: ['error', 'never'],
      'id-denylist': ['error', ...BANNED_ABBREVIATIONS],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../../*'],
              message: '상대경로 2단 이상은 금지입니다. @/ alias를 사용하세요.',
            },
          ],
        },
      ],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: false,
        },
      ],

      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
    },
  },
]);
