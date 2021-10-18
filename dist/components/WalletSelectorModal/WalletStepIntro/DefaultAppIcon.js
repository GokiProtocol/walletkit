"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = exports.DefaultAppIcon = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const DefaultAppIcon = () =>
  (0, jsx_runtime_1.jsx)(exports.Wrapper, { children: "?" }, void 0);
exports.DefaultAppIcon = DefaultAppIcon;
exports.Wrapper = styled_1.default.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px dashed #dedede;
  background: #f9f9f9;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 36px;
  color: #dedede;
  user-select: none;
`;
//# sourceMappingURL=DefaultAppIcon.js.map
