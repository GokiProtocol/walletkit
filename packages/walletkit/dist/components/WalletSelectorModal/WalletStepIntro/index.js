"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletStepIntro = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_i18next_1 = require("react-i18next");
const ButtonWithFooter_1 = require("../ButtonWithFooter");
const LanguageToggle_1 = require("../LanguageToggle");
const Detail_1 = require("./Detail");
const icons_1 = require("./icons");
const WalletStepIntro = ({ appName, appIcon, langOption, onContinue }) => {
  const { t } = (0, react_i18next_1.useTranslation)();
  return (0, jsx_runtime_1.jsxs)(
    Wrapper,
    {
      children: [
        (0, jsx_runtime_1.jsx)(
          AppIconsWrapper,
          {
            children: (0, jsx_runtime_1.jsxs)(
              AppIcons,
              {
                children: [
                  (0, jsx_runtime_1.jsx)(icons_1.SolanaIcon, {}, void 0),
                  (0, jsx_runtime_1.jsx)(icons_1.ConnectDots, {}, void 0),
                  appIcon,
                ],
              },
              void 0
            ),
          },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          Instruction,
          {
            children: t(
              "modal.walletStepIntro.instruction",
              `To use {{appName}}, you need to connect to a Solana wallet`,
              { appName: appName }
            ),
          },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          LanguageToggle_1.LanguageToggle,
          { langOption: langOption },
          void 0
        ),
        (0, jsx_runtime_1.jsxs)(
          DetailsWrapper,
          {
            children: [
              (0, jsx_runtime_1.jsx)(
                Detail_1.Detail,
                {
                  icon: (0, jsx_runtime_1.jsx)(icons_1.LockIcon, {}, void 0),
                  title: t(
                    "modal.walletStepIntro.detailsOne.title",
                    "You control your crypto"
                  ),
                  description: t(
                    "modal.walletStepIntro.detailsOne.description",
                    "Using a non-custodial wallet enables you to control your crypto without having to trust third parties."
                  ),
                },
                void 0
              ),
              (0, jsx_runtime_1.jsx)(
                Detail_1.Detail,
                {
                  icon: (0, jsx_runtime_1.jsx)(icons_1.BoltIcon, {}, void 0),
                  title: t(
                    "modal.walletStepIntro.detailsTwo.title",
                    "Transact quickly and cheaply"
                  ),
                  description: t(
                    "modal.walletStepIntro.detailsTwo.description",
                    "Solana's scalability ensures transactions remain less than $0.01 and at lightning fast speeds."
                  ),
                },
                void 0
              ),
            ],
          },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          ButtonWithFooter_1.ButtonWithFooter,
          Object.assign(
            {
              onClick: onContinue,
              footer: (0, jsx_runtime_1.jsxs)(
                jsx_runtime_1.Fragment,
                {
                  children: [
                    t("footer.title", "First time using Solana? "),
                    "  ",
                    (0, jsx_runtime_1.jsx)(
                      "a",
                      Object.assign(
                        {
                          href: "https://learn.goki.so",
                          target: "_blank",
                          rel: "noreferrer noopener",
                        },
                        { children: t("footer.button", "Learn more") }
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
exports.WalletStepIntro = WalletStepIntro;
const Wrapper = styled_1.default.div`
  padding: 28px;
  padding-top: 33px;
`;
const AppIcons = styled_1.default.div`
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  grid-column-gap: 20px;
  align-items: center;
  width: 192px;
`;
const Instruction = styled_1.default.h2`
  font-weight: normal;
  margin-top: 27px;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
`;
const DetailsWrapper = styled_1.default.div`
  margin: 46px 0px;
  display: grid;
  grid-row-gap: 28px;
`;
const AppIconsWrapper = styled_1.default.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
//# sourceMappingURL=index.js.map
