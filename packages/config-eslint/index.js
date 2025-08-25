import js from "@eslint/js"
import importNewlinesPlugin from "eslint-plugin-import-newlines"
import turboPlugin from "eslint-plugin-turbo"
import tseslint from "typescript-eslint"
import onlyWarn from "eslint-plugin-only-warn"

// Application Component || Define Exports
// =======================================================================================
// =======================================================================================
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "out/**",
      "dist/**",
      "build/**",
      "node_modules/**"
    ],
  },
  {
    plugins: {
      "import-newlines": importNewlinesPlugin,
      turbo: turboPlugin,
      onlyWarn,
    },
    rules: {
      "no-var": "error",
      "no-tabs": "error",
      "no-multi-spaces": "error",
      "prefer-template": "error",
      "space-before-blocks": "error",
      semi: ["error", "never"],
      quotes: ["error", "double"],
      indent: ["error", 2, { SwitchCase: 1 }],
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "import/extensions": "off",
      "import/prefer-default-export": "off",
      "import-newlines/enforce": ["error", { items: 999 }],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "newline-per-chained-call": "off",
      "lines-between-class-members": "off",
      "prefer-arrow-callback": "off",
      "no-use-before-define": "off",
      "no-underscore-dangle": "off",
      "object-curly-newline": "off",
      "no-restricted-syntax": "off",
      "prefer-destructuring": "off",
      "default-param-last": "off",
      "no-param-reassign": "off",
      "no-nested-ternary": "off",
      "consistent-return": "off",
      "arrow-body-style": "off",
      "no-await-in-loop": "off",
      "object-shorthand": "off",
      "linebreak-style": "off",
      "default-case": "off",
      "no-continue": "off",
      "no-plusplus": "off",
      "no-console": "off",
      "max-len": "off",
      camelcase: "off",
    },
  },
]
