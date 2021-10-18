"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletKit = exports.WalletKitProvider = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const use_solana_1 = require("@saberhq/use-solana");
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const WalletSelectorModal_1 = require("./components/WalletSelectorModal");
const i18n_1 = __importDefault(require("./i18n"));
const WalletKitContext = react_1.default.createContext(null);
const WalletKitProvider = (_a) => {
  var {
      children,
      app,
      langOption,
      initialStep = WalletSelectorModal_1.ModalStep.Intro,
    } = _a,
    solanaProviderArgs = __rest(_a, [
      "children",
      "app",
      "langOption",
      "initialStep",
    ]);
  const [showWalletSelector, setShowWalletSelector] = (0, react_1.useState)(
    false
  );
  const kit = (0, react_1.useMemo)(() => {
    return { connect: () => setShowWalletSelector(true) };
  }, []);
  const l = Object.assign({ en: { nativeName: "Englilsh" } }, langOption);
  return (0, jsx_runtime_1.jsx)(
    react_1.Suspense,
    Object.assign(
      { fallback: "loading.." },
      {
        children: (0, jsx_runtime_1.jsx)(
          react_i18next_1.I18nextProvider,
          Object.assign(
            { i18n: i18n_1.default },
            {
              children: (0, jsx_runtime_1.jsx)(
                use_solana_1.SolanaProvider,
                Object.assign({}, solanaProviderArgs, {
                  children: (0, jsx_runtime_1.jsxs)(
                    WalletKitContext.Provider,
                    Object.assign(
                      { value: kit },
                      {
                        children: [
                          (0, jsx_runtime_1.jsx)(
                            WalletSelectorModal_1.WalletSelectorModal,
                            {
                              app: app,
                              initialStep: initialStep,
                              isOpen: showWalletSelector,
                              onDismiss: () => setShowWalletSelector(false),
                              langOption: l,
                            },
                            void 0
                          ),
                          children,
                        ],
                      }
                    ),
                    void 0
                  ),
                }),
                void 0
              ),
            }
          ),
          void 0
        ),
      }
    ),
    void 0
  );
};
exports.WalletKitProvider = WalletKitProvider;
/**
 * Returns a function which shows the wallet selector modal.
 */
const useWalletKit = () => {
  const kit = (0, react_1.useContext)(WalletKitContext);
  if (!kit) {
    throw new Error("Not in WalletConnector context");
  }
  return kit;
};
exports.useWalletKit = useWalletKit;
//# sourceMappingURL=WalletKitProvider.js.map
