"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectingAnimation = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const react_1 = require("@emotion/react");
const react_2 = require("react");
const ConnectingAnimation = ({ fill = "#6764FB", frameMs = 160 }) => {
  const [now, setNow] = (0, react_2.useState)(Date.now());
  (0, react_2.useEffect)(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, frameMs);
    return () => clearInterval(interval);
  }, [frameMs]);
  const frame = (0, react_2.useMemo)(
    () => Math.floor(now / frameMs) % 7,
    [frameMs, now]
  );
  return (0, jsx_runtime_1.jsxs)(
    "svg",
    Object.assign(
      {
        width: "56",
        height: "12",
        viewBox: "0 0 56 12",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        css: (0, react_1.css)`
        circle {
          transition: fill 0.4s ease;
        }
      `,
      },
      {
        children: [
          (0, jsx_runtime_1.jsx)(
            "circle",
            {
              cx: "2.5",
              cy: "2.5",
              r: "2.5",
              fill: frame === 0 ? fill : "#dedede",
            },
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "circle",
            {
              cx: "19.5",
              cy: "2.5",
              r: "2.5",
              fill: frame === 2 ? fill : "#DEDEDE",
            },
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "circle",
            {
              cx: "36.5",
              cy: "2.5",
              r: "2.5",
              fill: frame === 4 ? fill : "#DEDEDE",
            },
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "circle",
            {
              cx: "53.5",
              cy: "2.5",
              r: "2.5",
              fill: frame === 6 ? fill : "#dedede",
            },
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "circle",
            {
              cx: "12.5",
              cy: "9.5",
              r: "2.5",
              fill: frame === 1 ? fill : "#dedede",
            },
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "circle",
            {
              cx: "29.5",
              cy: "9.5",
              r: "2.5",
              fill: frame === 3 ? fill : "#dedede",
            },
            void 0
          ),
          (0, jsx_runtime_1.jsx)(
            "circle",
            {
              cx: "46.5",
              cy: "9.5",
              r: "2.5",
              fill: frame === 5 ? fill : "#dedede",
            },
            void 0
          ),
        ],
      }
    ),
    void 0
  );
};
exports.ConnectingAnimation = ConnectingAnimation;
//# sourceMappingURL=ConnectingAnimation.js.map
