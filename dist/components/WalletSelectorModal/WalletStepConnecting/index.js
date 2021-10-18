"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletStepConnecting = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const react_1 = require("@emotion/react");
const styled_1 = __importDefault(require("@emotion/styled"));
const use_solana_1 = require("@saberhq/use-solana");
const react_2 = require("react");
const react_device_detect_1 = require("react-device-detect");
const react_i18next_1 = require("react-i18next");
const ButtonWithFooter_1 = require("../ButtonWithFooter");
const ConnectingAnimation_1 = require("./ConnectingAnimation");
const WalletStepConnecting = ({ appIcon, info, onBack, onComplete }) => {
  const walletProviderInfo = info.info;
  const icon =
    typeof walletProviderInfo.icon === "string"
      ? (0, jsx_runtime_1.jsx)("img", { src: walletProviderInfo.icon }, void 0)
      : (0, jsx_runtime_1.jsx)(walletProviderInfo.icon, {}, void 0);
  const { activate, connected, wallet } = (0, use_solana_1.useSolana)();
  const [error, setError] = (0, react_2.useState)(null);
  const { t } = (0, react_i18next_1.useTranslation)();
  const isManualConnect =
    react_device_detect_1.isMobile &&
    (info.type === use_solana_1.WalletType.Sollet ||
      info.type === use_solana_1.WalletType.Solflare);
  const doActivate = (0, react_2.useCallback)(
    () =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          yield activate(info.type);
          setError(null);
        } catch (e) {
          setError(e.message);
        }
      }),
    [activate, info.type]
  );
  // attempt to activate the wallet on initial load
  (0, react_2.useEffect)(() => {
    if (isManualConnect) {
      return;
    }
    // delay so people can see a message
    const timeout = setTimeout(() => {
      void doActivate();
    }, 500);
    return () => clearTimeout(timeout);
    // only run this on the first display of this modal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // close modal only when the wallet is connected
  (0, react_2.useEffect)(() => {
    if (wallet && connected) {
      onComplete === null || onComplete === void 0 ? void 0 : onComplete();
    }
  }, [wallet, connected, onComplete]);
  return (0, jsx_runtime_1.jsx)(
    Wrapper,
    {
      children: (0, jsx_runtime_1.jsxs)(
        ConnectingWrapper,
        {
          children: [
            error
              ? (0, jsx_runtime_1.jsxs)(
                  ConnectingHeader,
                  {
                    children: [
                      (0, jsx_runtime_1.jsx)(
                        Connecting,
                        {
                          children: t(
                            "modal.walletStepConnecting.error.header",
                            "Error Connecting Wallet"
                          ),
                        },
                        void 0
                      ),
                      (0, jsx_runtime_1.jsx)(
                        ConnectingInstructions,
                        { children: error },
                        void 0
                      ),
                      (0, jsx_runtime_1.jsx)(
                        ConnectingInstructions,
                        {
                          children: (0, jsx_runtime_1.jsx)(
                            "a",
                            Object.assign(
                              {
                                css: (0, react_1.css)`
                  color: #696969;
                  font-weight: bold;
                `,
                                href: "#",
                                onClick: (e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  void doActivate();
                                },
                              },
                              { children: t("buttons.retry", "Retry") }
                            ),
                            void 0
                          ),
                        },
                        void 0
                      ),
                    ],
                  },
                  void 0
                )
              : (0, jsx_runtime_1.jsxs)(
                  ConnectingHeader,
                  {
                    children: [
                      (0, jsx_runtime_1.jsx)(
                        Connecting,
                        {
                          children: t(
                            "modal.walletStepConnecting.connecting.header",
                            "Connecting..."
                          ),
                        },
                        void 0
                      ),
                      isManualConnect
                        ? (0, jsx_runtime_1.jsxs)(
                            ConnectingInstructions,
                            {
                              children: [
                                "Please",
                                " ",
                                (0, jsx_runtime_1.jsx)(
                                  "a",
                                  Object.assign(
                                    {
                                      css: (0, react_1.css)`
                    color: #696969;
                    font-weight: bold;
                  `,
                                      href: "#",
                                      onClick: (e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        wallet === null || wallet === void 0
                                          ? void 0
                                          : wallet.connect();
                                      },
                                    },
                                    { children: "click here" }
                                  ),
                                  void 0
                                ),
                                " ",
                                "to unlock your ",
                                walletProviderInfo.name,
                                " wallet.",
                              ],
                            },
                            void 0
                          )
                        : (0, jsx_runtime_1.jsx)(
                            ConnectingInstructions,
                            {
                              children: t(
                                "modal.walletStepConnecting.connecting.instructions",
                                "Please unlock your {{ walletName }} wallet",
                                { walletName: walletProviderInfo.name }
                              ),
                            },
                            void 0
                          ),
                    ],
                  },
                  void 0
                ),
            (0, jsx_runtime_1.jsx)(
              AppIconsWrapper,
              {
                children: (0, jsx_runtime_1.jsxs)(
                  AppIcons,
                  {
                    children: [
                      icon,
                      (0, jsx_runtime_1.jsx)(
                        ConnectingAnimation_1.ConnectingAnimation,
                        {},
                        void 0
                      ),
                      appIcon,
                    ],
                  },
                  void 0
                ),
              },
              void 0
            ),
            (0, jsx_runtime_1.jsx)(
              ButtonWithFooter_1.BottomArea,
              {
                children: (0, jsx_runtime_1.jsxs)(
                  ButtonWithFooter_1.FooterText,
                  {
                    children: [
                      t(
                        "modal.walletStepConnecting.footer.title",
                        "Having trouble?"
                      ),
                      " ",
                      (0, jsx_runtime_1.jsx)(
                        "a",
                        Object.assign(
                          {
                            href: "#",
                            onClick: (e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              onBack === null || onBack === void 0
                                ? void 0
                                : onBack();
                            },
                          },
                          { children: t("buttons.goBack", "Go Back") }
                        ),
                        void 0
                      ),
                    ],
                  },
                  void 0
                ),
              },
              void 0
            ),
          ],
        },
        void 0
      ),
    },
    void 0
  );
};
exports.WalletStepConnecting = WalletStepConnecting;
const ConnectingHeader = styled_1.default.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 68px;
  margin-bottom: 71px;
`;
const Connecting = styled_1.default.h2`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
`;
const ConnectingInstructions = styled_1.default.p`
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #696969;
`;
const Wrapper = styled_1.default.div`
  position: relative;
  overflow: hidden;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const AppIcons = styled_1.default.div`
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  grid-column-gap: 20px;
  align-items: center;
  width: 192px;

  & > img,
  & > svg {
    width: 48px;
    height: 48px;
  }
`;
const AppIconsWrapper = styled_1.default.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const ConnectingWrapper = styled_1.default.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100% - 154px);

  background: #f9f9f9;
  border-radius: 32px 32px 8px 8px;

  animation: fadeIn 0.2s forwards;
  animation-timing-function: ease-out;

  @keyframes fadeIn {
    0% {
      bottom: -300px;
    }
    100% {
      bottom: 0;
    }
  }
`;
//# sourceMappingURL=index.js.map
