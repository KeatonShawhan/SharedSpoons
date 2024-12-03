import globals from "globals";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import filenamesPlugin from "eslint-plugin-filenames";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",

      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // Include Jest globals here
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin,
      filenames: filenamesPlugin,
    },
    rules: {
      // Base ESLint recommended rules
      ...js.configs.recommended.rules,
      "no-undef": "off",
      // TypeScript ESLint recommended rules
      ...tsPlugin.configs["recommended"].rules,

      // React recommended rules
      ...reactPlugin.configs.recommended.rules,

      // Additional rules
      // Enforce consistent spacing after comments
      "spaced-comment": ["error", "always", { exceptions: ["-", "+"] }],

      // Enforce consistent indentation (2 spaces)
      "indent": ["error", 2, { SwitchCase: 1 }],

      // React specific rules
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
