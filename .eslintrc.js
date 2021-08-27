"use strict";

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["*.js"],
  extends: ["@saberhq/eslint-config-react"],
  parserOptions: {
    project: "tsconfig.json",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unescaped-entities": "off",
  },
};
