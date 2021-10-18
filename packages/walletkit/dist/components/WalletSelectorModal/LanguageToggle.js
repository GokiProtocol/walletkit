"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomArea = exports.LanguageToggle = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const LanguageToggle = ({ langOption }) => {
  const { t, i18n } = (0, react_i18next_1.useTranslation)();
  const [lang, setLang] = (0, react_1.useState)(i18n.language);
  const handleSelectLanguage = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value).catch((e) => console.log(e));
  };
  return (0, jsx_runtime_1.jsxs)(
    exports.BottomArea,
    {
      children: [
        (0, jsx_runtime_1.jsx)(
          "label",
          { children: t("changeLanguage", "Change Language") },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          "select",
          Object.assign(
            { id: "language", value: lang, onChange: handleSelectLanguage },
            {
              children: Object.keys(langOption).map((lng) =>
                (0, jsx_runtime_1.jsx)(
                  "option",
                  Object.assign(
                    {
                      value: lng,
                      style: {
                        border: "1px solid #dfdfdf",
                        boxSizing: "border-box",
                        borderRadius: "4px",
                        padding: "0 4px",
                      },
                    },
                    { children: langOption[lng].nativeName }
                  ),
                  lng
                )
              ),
            }
          ),
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.LanguageToggle = LanguageToggle;
exports.BottomArea = styled_1.default.div`
  font-size: 14px;
  line-height: 15px;
  color: #696969;
  margin: 0 10px;

  display: flex;
  justify-content: space-around;
`;
//# sourceMappingURL=LanguageToggle.js.map
