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
exports.WalletStepLedgerAdvanced = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const use_solana_1 = require("@saberhq/use-solana");
const react_1 = require("react");
const LabeledInput_1 = require("../../LabeledInput");
const ButtonWithFooter_1 = require("../ButtonWithFooter");
const WalletStepLedgerAdvanced = ({ onBack, onSuccess, onError }) => {
  const [accountStr, setAccountStr] = (0, react_1.useState)("");
  const [changeStr, setChangeStr] = (0, react_1.useState)("");
  const { activate } = (0, use_solana_1.useSolana)();
  return (0, jsx_runtime_1.jsxs)(
    Wrapper,
    {
      children: [
        (0, jsx_runtime_1.jsx)(
          IconWrapper,
          {
            children: (0, jsx_runtime_1.jsx)(
              use_solana_1.WALLET_PROVIDERS.Ledger.icon,
              {},
              void 0
            ),
          },
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          "h2",
          { children: "Enter your Ledger account info" },
          void 0
        ),
        (0, jsx_runtime_1.jsxs)(
          "p",
          {
            children: [
              "Not sure what to enter here? You\u2019re probably looking for the basic",
              " ",
              (0, jsx_runtime_1.jsx)(
                "strong",
                { children: "Ledger Connect" },
                void 0
              ),
              ".",
            ],
          },
          void 0
        ),
        (0, jsx_runtime_1.jsxs)(
          Fields,
          {
            children: [
              (0, jsx_runtime_1.jsx)(
                LabeledInput_1.LabeledInput,
                {
                  label: "Account",
                  placeholder: "Root",
                  name: "account",
                  value: accountStr,
                  onChange: (e) => {
                    setAccountStr(e.target.value);
                  },
                },
                void 0
              ),
              (0, jsx_runtime_1.jsx)(
                LabeledInput_1.LabeledInput,
                {
                  label: "Change",
                  placeholder: "Root",
                  name: "change",
                  value: changeStr,
                  onChange: (e) => {
                    setChangeStr(e.target.value);
                  },
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
              onClick: () =>
                __awaiter(void 0, void 0, void 0, function* () {
                  try {
                    const account =
                      accountStr === "" ? undefined : parseInt(accountStr);
                    const change =
                      changeStr === "" ? undefined : parseInt(changeStr);
                    yield activate(use_solana_1.WalletType.Ledger, {
                      account,
                      change,
                    });
                  } catch (e) {
                    onError === null || onError === void 0
                      ? void 0
                      : onError(e);
                    return;
                  }
                  onSuccess === null || onSuccess === void 0
                    ? void 0
                    : onSuccess();
                }),
              footer: (0, jsx_runtime_1.jsxs)(
                jsx_runtime_1.Fragment,
                {
                  children: [
                    "Having trouble?",
                    " ",
                    (0, jsx_runtime_1.jsx)(
                      "a",
                      Object.assign(
                        {
                          href: "#",
                          onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onBack === null || onBack === void 0
                              ? void 0
                              : onBack();
                          },
                        },
                        { children: "Go back" }
                      ),
                      void 0
                    ),
                  ],
                },
                void 0
              ),
            },
            { children: "Continue" }
          ),
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.WalletStepLedgerAdvanced = WalletStepLedgerAdvanced;
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
const Fields = styled_1.default.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
//# sourceMappingURL=index.js.map
