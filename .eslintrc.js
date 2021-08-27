"use strict";

module.exports = {
  extends: ["@saberhq/eslint-config-react"],
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["*.js"],
  parserOptions: {
    project: "tsconfig.json",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
  },
};
