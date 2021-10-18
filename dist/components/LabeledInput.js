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
exports.LabeledInput = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const LabeledInput = (_a) => {
  var { label } = _a,
    inputProps = __rest(_a, ["label"]);
  return (0, jsx_runtime_1.jsxs)(
    Fieldset,
    {
      children: [
        (0, jsx_runtime_1.jsx)(
          Label,
          Object.assign({ htmlFor: inputProps.name }, { children: label }),
          void 0
        ),
        (0, jsx_runtime_1.jsx)(
          InputBorder,
          {
            children: (0, jsx_runtime_1.jsx)(
              Input,
              Object.assign({}, inputProps),
              void 0
            ),
          },
          void 0
        ),
      ],
    },
    void 0
  );
};
exports.LabeledInput = LabeledInput;
const Fieldset = styled_1.default.fieldset`
  border: none;
  outline: none;

  height: 66px;
  position: relative;
  width: 100%;
  padding: 0;
  margin: 0;
`;
const InputBorder = styled_1.default.div`
  position: absolute;
  height: 56px;
  top: 10px;
  border: 1px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 1;
  width: 100%;
  padding: 0 4px;

  display: flex;
  align-items: center;

  &:hover {
    border: 1px solid #aaa;
  }
  &:focus-within {
    border: 1px solid #6764fb;
  }
  transition: border 0.2s ease;
`;
const Label = styled_1.default.label`
  position: absolute;
  display: block;
  left: 11px;
  z-index: 2;
  padding: 0 4px;
  height: 20px;

  background: #fff;
  font-size: 12px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #696969;
`;
const Input = styled_1.default.input`
  border: none;
  outline: none;
  height: 43px;

  padding: 0 11px;
  flex-grow: 1;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;

  color: #000;
  &::placeholder {
    color: #b5b5b5;
  }
`;
//# sourceMappingURL=LabeledInput.js.map
