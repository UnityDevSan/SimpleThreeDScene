import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js, prettier: pluginPrettier },
    extends: ["js/recommended", "plugin:prettier/recommended"],
    rules: {
      "prettier/prettier": "error" // Zeigt Prettier-Fehler in ESLint an
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier // Deaktiviert ESLint-Regeln, die mit Prettier kollidieren
]);