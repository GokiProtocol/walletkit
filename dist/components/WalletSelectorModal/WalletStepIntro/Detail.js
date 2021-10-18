"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Detail = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const Detail = ({ icon, title, description }) => {
  return (0, jsx_runtime_1.jsxs)(
    Wrapper,
    {
      children: [
        icon,
        (0, jsx_runtime_1.jsxs)(
          Info,
          {
            children: [
              (0, jsx_runtime_1.jsx)(Title, { children: title }, void 0),
              (0, jsx_runtime_1.jsx)(
                Description,
                { children: description },
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
exports.Detail = Detail;
const Wrapper = styled_1.default.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  grid-column-gap: 9px;
  width: 100%;
`;
const Info = styled_1.default.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Title = styled_1.default.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #000000;
`;
const Description = styled_1.default.p`
  margin: 0;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
`;
//# sourceMappingURL=Detail.js.map
