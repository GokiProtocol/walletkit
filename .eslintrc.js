"use strict";

require("@rushstack/eslint-patch/modern-module-resolution");

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
};
