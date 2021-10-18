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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectWalletButton = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const react_1 = require("@emotion/react");
const styled_1 = __importDefault(require("@emotion/styled"));
const lighten_1 = __importDefault(require("polished/lib/color/lighten"));
const react_i18next_1 = require("react-i18next");
const WalletKitProvider_1 = require("../../WalletKitProvider");
const Logomark = (props) =>
  (0, jsx_runtime_1.jsxs)(
    "svg",
    Object.assign(
      {
        width: "16",
        height: "14",
        viewBox: "0 0 16 14",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
      },
      props,
      {
        children: [
          (0, jsx_runtime_1.jsxs)(
            "g",
            Object.assign(
              { clipPath: "url(#solana_logomark_clip_goki)" },
              {
                children: [
                  (0, jsx_runtime_1.jsx)(
                    "path",
                    {
                      d: "M2.59829 10.4132C2.69612 10.3119 2.82875 10.255 2.96704 10.255H15.7267C15.9592 10.255 16.0756 10.5463 15.9111 10.7166L13.3898 13.3277C13.292 13.4291 13.1594 13.486 13.0211 13.486H0.261373C0.0289306 13.486 -0.0874295 13.1947 0.0769974 13.0244L2.59829 10.4132Z",
                      fill: "currentcolor",
                    },
                    void 0
                  ),
                  (0, jsx_runtime_1.jsx)(
                    "path",
                    {
                      d: "M2.59768 0.658221C2.69551 0.55691 2.82814 0.5 2.96643 0.5H15.7261C15.9586 0.5 16.075 0.791323 15.9105 0.961608L13.3892 3.57274C13.2914 3.67405 13.1588 3.73096 13.0205 3.73096H0.260763C0.0283203 3.73096 -0.0880399 3.43964 0.0763871 3.26935L2.59768 0.658221Z",
                      fill: "currentcolor",
                    },
                    void 0
                  ),
                  (0, jsx_runtime_1.jsx)(
                    "path",
                    {
                      d: "M13.3898 5.50467C13.292 5.40334 13.1594 5.34647 13.0211 5.34647H0.261373C0.0289306 5.34647 -0.0874295 5.63776 0.0769975 5.80805L2.59829 8.41917C2.69612 8.52051 2.82875 8.57743 2.96704 8.57743H15.7267C15.9592 8.57743 16.0756 8.28609 15.9111 8.1158L13.3898 5.50467Z",
                      fill: "currentcolor",
                    },
                    void 0
                  ),
                ],
              }
            ),
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "defs",
            {
              children: (0, jsx_runtime_1.jsx)(
                "clipPath",
                Object.assign(
                  { id: "solana_logomark_clip_goki" },
                  {
                    children: (0, jsx_runtime_1.jsx)(
                      "rect",
                      {
                        width: "16",
                        height: "13",
                        fill: "currentcolor",
                        transform: "translate(0 0.5)",
                      },
                      void 0
                    ),
                  }
                ),
                void 0
              ),
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
const ConnectWalletButton = (_a) => {
  var { variant = "primary" } = _a,
    buttonProps = __rest(_a, ["variant"]);
  const { connect } = (0, WalletKitProvider_1.useWalletKit)();
  const { t } = (0, react_i18next_1.useTranslation)();
  return (0, jsx_runtime_1.jsxs)(
    Button,
    Object.assign(
      { variant: variant },
      buttonProps,
      { onClick: connect },
      {
        children: [
          (0, jsx_runtime_1.jsx)(
            Logomark,
            {
              css: (0, react_1.css)`
          height: 13px;
          width: 16px;
        `,
            },
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "span",
            { children: t("connect_wallet", "Connect Wallet") },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.ConnectWalletButton = ConnectWalletButton;
const Button = styled_1.default.button`
  display: flex;
  align-items: center;
  gap: 12px;

  cursor: pointer;
  border: none;
  outline: none;
  height: 40px;
  mix-blend-mode: normal;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 0 12px;

  ${({ variant = "primary" }) =>
    variant === "primary"
      ? (0, react_1.css)`
          background: #70ed9d;
          color: #000;
          &:hover {
            background: ${(0, lighten_1.default)(0.1, "#70ed9d")};
          }
        `
      : (0, react_1.css)`
          background: #000;
          color: #fff;
          &:hover {
            background: ${(0, lighten_1.default)(0.1, "#000")};
          }
        `}

  & > span {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
  }
`;
//# sourceMappingURL=index.js.map
