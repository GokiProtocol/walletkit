"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletStepRedirect = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const ButtonWithFooter_1 = require("../ButtonWithFooter");
const WalletStepRedirect = ({ info }) => {
  const providerURL = (0, react_1.useMemo)(() => {
    try {
      return new URL(info.url).hostname;
    } catch (e) {
      return info.url;
    }
  }, [info.url]);
  const { t } = (0, react_i18next_1.useTranslation)();
  const icon =
    typeof info.icon === "string"
      ? (0, jsx_runtime_1.jsx)("img", { src: info.icon }, void 0)
      : (0, jsx_runtime_1.jsx)(info.icon, {}, void 0);
  // autoredirect after 1 second
  (0, react_1.useEffect)(() => {
    const timeout = setTimeout(() => {
      window.open(info.url, "_blank", "noopener");
    }, 1000);
    return () => clearTimeout(timeout);
  });
  return (0, jsx_runtime_1.jsxs)(
    Wrapper,
    {
      children: [
        (0, jsx_runtime_1.jsx)(IconWrapper, { children: icon }, void 0),
        (0, jsx_runtime_1.jsx)(
          "h2",
          {
            children: t(
              "modal.walletStepRedirect.title",
              "You're being redirected!"
            ),
          },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          "p",
          {
            children: t(
              "modal.walletStepRedirect.ix1",
              "In order to use {{ infoName }}, you must first install their browser extension.",
              { infoName: info.name }
            ),
          },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          "p",
          {
            children: (0, jsx_runtime_1.jsxs)(
              react_i18next_1.Trans,
              Object.assign(
                { t: t, i18nKey: "modal.walletStepRedirect.ix2" },
                {
                  children: [
                    "Make sure you only install their wallet from the official",
                    " ",
                    (0, jsx_runtime_1.jsx)(
                      "strong",
                      { children: { providerURL } },
                      void 0
                    ),
                    " website.",
                  ],
                }
              ),
              void 0
            ),
          },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          ButtonWithFooter_1.ButtonWithFooter,
          Object.assign(
            {
              onClick: () => {
                window.open(info.url, "_blank", "noopener");
              },
              footer: (0, jsx_runtime_1.jsxs)(
                jsx_runtime_1.Fragment,
                {
                  children: [
                    t("footer.finishedInstalling", "Finished Installing?"),
                    " ",
                    (0, jsx_runtime_1.jsx)(
                      "a",
                      Object.assign(
                        {
                          href: "#",
                          onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.reload();
                          },
                        },
                        { children: t("buttons.refresh", "Refresh") }
                      ),
                      void 0
                    ),
                  ],
                },
                void 0
              ),
            },
            { children: t("buttons.continue", "Continue") }
          ),
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.WalletStepRedirect = WalletStepRedirect;
const IconWrapper = styled_1.default.div`
  & > svg,
  & > img {
    width: 36px;
    height: 36px;
  }
  margin-bottom: 32px;
`;
const Wrapper = styled_1.default.div`
  padding: 28px;
  padding-top: 67px;

  & > h2 {
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  & > p {
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #696969;
  }
`;
//# sourceMappingURL=index.js.map
