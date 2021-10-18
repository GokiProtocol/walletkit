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
exports.BigButton =
  exports.FooterText =
  exports.BottomArea =
  exports.ButtonWithFooter =
    void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const polished_1 = require("polished");
const ButtonWithFooter = (_a) => {
  var { footer, children } = _a,
    props = __rest(_a, ["footer", "children"]);
  return (0, jsx_runtime_1.jsxs)(
    exports.BottomArea,
    {
      children: [
        (0, jsx_runtime_1.jsx)(
          exports.BigButton,
          Object.assign({}, props, { children: children }),
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          exports.FooterText,
          { children: footer },
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.ButtonWithFooter = ButtonWithFooter;
exports.BottomArea = styled_1.default.div`
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 28px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;
exports.FooterText = styled_1.default.div`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
  & > a {
    color: #696969;
    font-weight: bold;
  }
`;
exports.BigButton = styled_1.default.button`
  border: none;
  outline: none;

  border-radius: 16px;
  height: 55px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-align: center;

  background: #000000;
  color: #fff;
  &:hover {
    background: ${(0, polished_1.lighten)(0.133, "#000")};
  }
  &:active {
    background: ${(0, polished_1.lighten)(0.212, "#000")};
  }
  cursor: pointer;
`;
//# sourceMappingURL=ButtonWithFooter.js.map
