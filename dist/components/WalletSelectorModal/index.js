"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSelectorModal = exports.ModalStep = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const use_solana_1 = require("@saberhq/use-solana");
const react_1 = require("react");
const react_device_detect_1 = require("react-device-detect");
const Modal_1 = require("../Modal");
const WalletStepConnecting_1 = require("./WalletStepConnecting");
const WalletStepIntro_1 = require("./WalletStepIntro");
const DefaultAppIcon_1 = require("./WalletStepIntro/DefaultAppIcon");
const WalletStepLedgerAdvanced_1 = require("./WalletStepLedgerAdvanced");
const WalletStepRedirect_1 = require("./WalletStepRedirect");
const WalletStepSelect_1 = require("./WalletStepSelect");
var ModalStep;
(function (ModalStep) {
  ModalStep["Intro"] = "intro";
  ModalStep["Select"] = "select";
  ModalStep["Redirect"] = "redirect";
  ModalStep["Connecting"] = "connecting";
  ModalStep["LedgerAdvanced"] = "ledger-advanced";
})((ModalStep = exports.ModalStep || (exports.ModalStep = {})));
const defaultOnWalletKitError = (err) => {
  console.error(err);
};
const WalletSelectorModal = (_a) => {
  var {
      app,
      onWalletKitError = defaultOnWalletKitError,
      initialStep = ModalStep.Intro,
      langOption,
    } = _a,
    modalProps = __rest(_a, [
      "app",
      "onWalletKitError",
      "initialStep",
      "langOption",
    ]);
  const appIcon = (0, react_1.useMemo)(() => {
    var _a;
    return (_a = app.icon) !== null && _a !== void 0
      ? _a
      : (0, jsx_runtime_1.jsx)(DefaultAppIcon_1.DefaultAppIcon, {}, void 0);
  }, [app.icon]);
  const [step, setStep] = (0, react_1.useState)(initialStep);
  const [installProvider, setInstallProvider] = (0, react_1.useState)(null);
  const { disconnect, activate } = (0, use_solana_1.useSolana)();
  const [walletToConnect, setWalletToConnect] = (0, react_1.useState)(null);
  const onDismiss = () => {
    modalProps.onDismiss();
    // unset everything else after the modal unhide animation
    setTimeout(() => {
      setInstallProvider(null);
      setWalletToConnect(null);
      setStep(ModalStep.Intro);
    }, 500);
  };
  return (0, jsx_runtime_1.jsxs)(
    Modal_1.Modal,
    Object.assign(
      {},
      modalProps,
      {
        onDismiss: onDismiss,
        onBack:
          step === ModalStep.Intro
            ? undefined
            : () => {
                switch (step) {
                  case ModalStep.Select:
                    setStep(ModalStep.Intro);
                    break;
                  case ModalStep.Redirect:
                    setStep(ModalStep.Select);
                    break;
                  case ModalStep.Connecting:
                    setStep(ModalStep.Select);
                    break;
                  case ModalStep.LedgerAdvanced:
                    setStep(ModalStep.Select);
                    break;
                }
              },
        hideSolanaLogo: step === ModalStep.Intro,
      },
      {
        children: [
          step === ModalStep.Intro &&
            (0, jsx_runtime_1.jsx)(
              WalletStepIntro_1.WalletStepIntro,
              {
                appName: app.name,
                appIcon: appIcon,
                langOption: langOption,
                onContinue: () => setStep(ModalStep.Select),
              },
              void 0
            ),
          step === ModalStep.Select &&
            (0, jsx_runtime_1.jsx)(
              WalletStepSelect_1.WalletStepSelect,
              {
                onSelect: (info) => {
                  disconnect();
                  if (
                    info.type === use_solana_1.WalletType.Ledger &&
                    info.info.name === "Ledger (advanced)"
                  ) {
                    setStep(ModalStep.LedgerAdvanced);
                    return;
                  }
                  setWalletToConnect(info);
                  setStep(ModalStep.Connecting);
                  if (
                    react_device_detect_1.isMobile &&
                    (info.type === use_solana_1.WalletType.Sollet ||
                      info.type === use_solana_1.WalletType.Solflare)
                  ) {
                    void activate(info.type);
                  }
                },
                onInstall: (info) => {
                  setInstallProvider(info);
                  setStep(ModalStep.Redirect);
                },
              },
              void 0
            ),
          step === ModalStep.Redirect &&
            installProvider &&
            (0, jsx_runtime_1.jsx)(
              WalletStepRedirect_1.WalletStepRedirect,
              { info: installProvider },
              void 0
            ),
          step === ModalStep.Connecting &&
            walletToConnect &&
            (0, jsx_runtime_1.jsx)(
              WalletStepConnecting_1.WalletStepConnecting,
              {
                appIcon: appIcon,
                info: walletToConnect,
                onBack: () => {
                  setStep(ModalStep.Select);
                },
                onComplete: onDismiss,
              },
              void 0
            ),
          step === ModalStep.LedgerAdvanced &&
            (0, jsx_runtime_1.jsx)(
              WalletStepLedgerAdvanced_1.WalletStepLedgerAdvanced,
              {
                onBack: () => {
                  setStep(ModalStep.Select);
                },
                onError: onWalletKitError,
                onSuccess: onDismiss,
              },
              void 0
            ),
        ],
      }
    ),
    void 0
  );
};
exports.WalletSelectorModal = WalletSelectorModal;
//# sourceMappingURL=index.js.map
