/** @type { import("@types/eslint").Linter.Config } */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1, offsetTernaryExpressions: false }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "@typescript-eslint/no-redeclare": ["off"],
  },
  ignorePatterns: ["node_modules", "dist"],
  overrides: [
    {
      files: ["*.json"],
      rules: {
        "no-unused-expressions": ["off"],
      },
    },
  ],
}

module.exports = config
