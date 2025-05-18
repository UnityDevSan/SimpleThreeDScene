import pluginNext from '@next/eslint-plugin-next';
import tseslint from 'typescript-eslint';

export default [
  {
    name: 'ESLint Config - nextjs',
    files: ['src/**/*.{mjs,cjs,ts,jsx,tsx}'], // Nur dein Quellcode!
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/build/**',
      '**/out/**',
      '**/coverage/**',
      '**/*.d.ts'
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@next/next': pluginNext,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];