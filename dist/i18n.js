"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
const i18next_browser_languagedetector_1 = __importDefault(
  require("i18next-browser-languagedetector")
);
const i18next_http_backend_1 = __importDefault(require("i18next-http-backend"));
i18next_1.default
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(i18next_browser_languagedetector_1.default)
  // pass the i18n instance to react-i18next.
  .use(react_i18next_1.initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .use(
    new i18next_http_backend_1.default({
      loadPath: "/locales/{{lng}}/translation.json",
    })
  )
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
exports.default = i18next_1.default;
//# sourceMappingURL=i18n.js.map
