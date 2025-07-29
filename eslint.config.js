import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...prettierConfig.rules,
      
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      '@typescript-eslint/no-var-requires': 'off',
      
      // General rules
      'no-console': 'off', // Allow console for CLI tools
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-return': 'error',
      'no-useless-concat': 'error',
      'no-useless-escape': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': 'error',
      // 'comma-dangle': ['error', 'never'], // Let Prettier handle this
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      
      // Prettier integration
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'lib/**',
      'coverage/**',
      '.nyc_output/**',
      '*.min.js',
      '*.bundle.js',
      'bin/**',
      '.cache/**',
      '.temp/**',
      '.tmp/**',
      '*.log',
      '.DS_Store',
      'Thumbs.db',
      'eslint.config.js',
    ],
  },
];