"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletStepSelect = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const use_solana_1 = require("@saberhq/use-solana");
const react_1 = require("react");
const react_device_detect_1 = require("react-device-detect");
const react_i18next_1 = require("react-i18next");
const WalletProviderOption_1 = require("./WalletProviderOption");
const getWalletProviders = () => {
  const base = Object.entries(use_solana_1.WALLET_PROVIDERS)
    .filter(([, p]) =>
      typeof window !== "undefined" && react_device_detect_1.isMobile
        ? p.isMobile
        : true
    )
    .slice()
    .sort(([, a], [, b]) => {
      var _a, _b, _c, _d, _e, _f;
      if (typeof window !== "undefined") {
        return ((_b =
          (_a = a.isInstalled) === null || _a === void 0
            ? void 0
            : _a.call(a)) !== null && _b !== void 0
          ? _b
          : true) ===
          ((_d =
            (_c = b.isInstalled) === null || _c === void 0
              ? void 0
              : _c.call(b)) !== null && _d !== void 0
            ? _d
            : true)
          ? a.name < b.name
            ? -1
            : 1
          : (
              (_f =
                (_e = a.isInstalled) === null || _e === void 0
                  ? void 0
                  : _e.call(a)) !== null && _f !== void 0
                ? _f
                : true
            )
          ? -1
          : 1;
      }
      return a.name < b.name ? -1 : 1;
    })
    .map(([walletType, info]) => ({
      type: walletType,
      info,
      mustInstall: !!(
        typeof window !== "undefined" &&
        info.isInstalled &&
        info.isInstalled()
      ),
    }))
    // no secret key for now
    .filter((p) => p.type !== use_solana_1.WalletType.SecretKey);
  return [
    ...base,
    {
      type: use_solana_1.WalletType.Ledger,
      info: Object.assign(
        Object.assign({}, use_solana_1.WALLET_PROVIDERS.Ledger),
        {
          name: "Ledger (advanced)",
          url: "https://ledger.com",
          isMobile: false,
        }
      ),
      mustInstall: false,
    },
  ];
};
const WalletStepSelect = ({ onSelect, onInstall }) => {
  const [showUninstalled, setShowUninstalled] = (0, react_1.useState)(false);
  const [providerInfo, setProviderInfo] = (0, react_1.useState)(
    getWalletProviders()
  );
  const { t } = (0, react_i18next_1.useTranslation)();
  (0, react_1.useEffect)(() => {
    // wait a second for everything to load
    const timeout = setTimeout(() => {
      setProviderInfo(getWalletProviders());
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return (0, jsx_runtime_1.jsxs)(
    jsx_runtime_1.Fragment,
    {
      children: [
        (0, jsx_runtime_1.jsx)(
          Heading,
          {
            children: t("modal.walletStepSelect.heading", "Select your wallet"),
          },
          void 0
        ),
        (0, jsx_runtime_1.jsxs)(
          ScrollArea,
          {
            children: [
              (0, jsx_runtime_1.jsx)(
                Wallets,
                {
                  children: providerInfo
                    .filter((prov) =>
                      showUninstalled
                        ? true
                        : prov.mustInstall || !prov.info.isInstalled
                    )
                    .map((fullInfo) => {
                      const { info: provider } = fullInfo;
                      return (0, jsx_runtime_1.jsx)(
                        WalletProviderOption_1.WalletProviderOption,
                        {
                          info: provider,
                          onSelect: () => {
                            onSelect === null || onSelect === void 0
                              ? void 0
                              : onSelect(fullInfo);
                          },
                          onInstall: onInstall,
                        },
                        provider.url
                      );
                    }),
                },
                void 0
              ),
              (0, jsx_runtime_1.jsx)(
                ShowUninstalledWrapper,
                {
                  children: (0, jsx_runtime_1.jsx)(
                    ShowUninstalled,
                    Object.assign(
                      { onClick: () => setShowUninstalled(!showUninstalled) },
                      {
                        children: showUninstalled
                          ? t(
                              "modal.walletStepSelect.hideUninstalledWallet",
                              "Hide uninstalled wallets"
                            )
                          : t(
                              "modal.walletStepSelect.showUninstalledWallet",
                              "Show uninstalled wallets"
                            ),
                      }
                    ),
                    void 0
                  ),
                },
                void 0
              ),
            ],
          },
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.WalletStepSelect = WalletStepSelect;
const ScrollArea = styled_1.default.div`
  height: calc(100% - 125px);
  overflow-y: scroll;
`;
const Wallets = styled_1.default.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 65px;
`;
const Heading = styled_1.default.h2`
  padding: 48px 28px 0;

  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  letter-spacing: -0.02em;
  color: #000000;
  margin-bottom: 24px;
`;
const ShowUninstalled = styled_1.default.a`
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const ShowUninstalledWrapper = styled_1.default.div`
  margin: 24px 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
//# sourceMappingURL=index.js.map
