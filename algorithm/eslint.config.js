import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

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
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-nested-ternary': 'error',
      'no-else-return': 'error',
      yoda: ['error', 'never'],
      'id-denylist': ['error', ...BANNED_ABBREVIATIONS],
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],

      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
    },
  },
]);
