import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.config({
    extends: [
      "next/core-web-vitals", // ✅ Ini sudah cukup untuk Next.js + React best practices
      "prettier", // ✅ Disable rules yang konflik dengan Prettier
    ],
  }),

  // ✅ Tambahkan custom plugin & rules kalau mau
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // React best practice
      "react/jsx-no-undef": "error",
      "react/react-in-jsx-scope": "off",

      // React Hooks best practice
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General rules
      "no-undef": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },
];
