import js from "@eslint/js"
import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import importNewlinesPlugin from "eslint-plugin-import-newlines"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"
import onlyWarn from "eslint-plugin-only-warn"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

// Application Component || Define Exports
// =======================================================================================
// =======================================================================================
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends("airbnb"),
  {
    plugins: {
      "import-newlines": importNewlinesPlugin,
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "no-var": ["error"],
      "no-tabs": ["error"],
      "prefer-template": ["error"],
      "no-multi-spaces": ["error"],
      "space-before-blocks": ["error"],
      semi: ["error", "never"],
      quotes: ["error", "double"],
      indent: ["error", 2, { SwitchCase: 1 }],
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "comma-spacing": ["error", { before: false, after: true }],
      "brace-style": ["error", "1tbs"],
      "max-len": ["error", { code: 100 }],
      "no-trailing-spaces": "error",
      "eol-last": "error",
      "comma-dangle": ["error", "always-multiline"],
      "array-bracket-spacing": ["error", "never"],
      "space-infix-ops": "error",
      "import/extensions": ["off"],
      "import/prefer-default-export": ["off"],
      "import-newlines/enforce": ["error", { items: 999 }],
      "@typescript-eslint/ban-ts-comment": ["off"],
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/no-unused-vars": ["warn"],
      "lines-between-class-members": ["off"],
      "newline-per-chained-call": ["off"],
      "prefer-arrow-callback": ["off"],
      "lines-around-directive": ["off"],
      "no-use-before-define": ["off"],
      "no-underscore-dangle": ["off"],
      "object-curly-newline": ["off"],
      "no-restricted-syntax": ["off"],
      "prefer-destructuring": ["off"],
      "default-param-last": ["off"],
      "no-param-reassign": ["off"],
      "no-nested-ternary": ["off"],
      "consistent-return": ["off"],
      "arrow-body-style": ["off"],
      "no-await-in-loop": ["off"],
      "object-shorthand": ["off"],
      "linebreak-style": ["off"],
      "no-unused-vars": ["off"],
      "default-case": ["off"],
      "no-continue": ["off"],
      "no-plusplus": ["off"],
      "no-console": ["off"],
      "semi-style": ["off"],
      camelcase: ["off"],
    },
  },
  {
    ignores: ["dist/**", "node_modules/**"],
  },
]
