"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProviderOption = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = require("react");
const WalletProviderOption = ({ info, onInstall, onSelect }) => {
  var _a;
  const mustInstall =
    typeof window !== "undefined" &&
    ((_a = info.isInstalled) === null || _a === void 0
      ? void 0
      : _a.call(info)) === false;
  const icon =
    typeof info.icon === "string"
      ? (0, jsx_runtime_1.jsx)("img", { src: info.icon }, void 0)
      : (0, jsx_runtime_1.jsx)(info.icon, {}, void 0);
  const providerURL = (0, react_1.useMemo)(() => {
    try {
      const name = new URL(info.url).hostname;
      if (name.startsWith("www.")) {
        return name.slice(4);
      }
      return name;
    } catch (e) {
      return info.url;
    }
  }, [info.url]);
  return (0, jsx_runtime_1.jsx)(
    Wrapper,
    Object.assign(
      {
        role: "button",
        onClick: (e) => {
          e.stopPropagation();
          e.preventDefault();
          if (mustInstall) {
            onInstall === null || onInstall === void 0
              ? void 0
              : onInstall(info);
            return;
          }
          onSelect === null || onSelect === void 0 ? void 0 : onSelect();
        },
      },
      {
        children: (0, jsx_runtime_1.jsx)(
          InfoTileWrapper,
          Object.assign(
            { className: "wallet-info-tile" },
            {
              children: (0, jsx_runtime_1.jsxs)(
                InfoTile,
                {
                  children: [
                    (0, jsx_runtime_1.jsx)(
                      IconWrapper,
                      { children: icon },
                      void 0
                    ),
                    (0, jsx_runtime_1.jsxs)(
                      ProviderDesc,
                      {
                        children: [
                          (0, jsx_runtime_1.jsx)(
                            ProviderName,
                            { children: info.name },
                            void 0
                          ),
                          (0, jsx_runtime_1.jsxs)(
                            ProviderUrl,
                            {
                              children: [
                                providerURL,
                                mustInstall ? " (not installed)" : "",
                              ],
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
exports.WalletProviderOption = WalletProviderOption;
const IconWrapper = styled_1.default.div`
  height: 33px;
  width: 33px;

  & > img,
  & > svg {
    height: 100%;
    width: 100%;
  }
`;
const InfoTileWrapper = styled_1.default.div`
  flex: 1 1 auto;
  height: 100%;

  display: flex;
  align-items: center;
`;
const InfoTile = styled_1.default.div`
  display: grid;
  grid-template-columns: 33px 1fr;
  grid-column-gap: 16px;
`;
const ProviderDesc = styled_1.default.div`
  display: flex;
  flex-direction: column;
`;
const ProviderName = styled_1.default.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #000000;
`;
const ProviderUrl = styled_1.default.span`
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
`;
const Wrapper = styled_1.default.div`
  width: 100%;
  height: 65px;
  user-select: none;
  cursor: pointer;
  padding: 0 28px;

  display: flex;
  align-items: center;

  background: #fff;
  .wallet-info-tile {
    border-bottom: 1px solid #f8f8f8;
  }
  &:hover {
    background: #f9f9f9;
    .wallet-info-tile {
      border-bottom: 1px solid #e6e6e6;
    }
  }
`;
//# sourceMappingURL=WalletProviderOption.js.map
