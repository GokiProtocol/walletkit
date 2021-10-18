"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const react_1 = require("@emotion/react");
const styled_1 = __importDefault(require("@emotion/styled"));
const dialog_1 = require("@reach/dialog");
const darken_1 = __importDefault(require("polished/lib/color/darken"));
const react_device_detect_1 = require("react-device-detect");
const react_spring_1 = require("react-spring");
const react_use_gesture_1 = require("react-use-gesture");
const icons_1 = require("./icons");
const Modal = ({
  children,
  isOpen,
  onDismiss,
  darkenOverlay = true,
  onBack,
  hideCloseButton = false,
  hideSolanaLogo = true,
}) => {
  const fadeTransition = (0, react_spring_1.useTransition)(isOpen, {
    config: { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const [{ y }, set] = (0, react_spring_1.useSpring)(() => ({
    y: 0,
    config: { mass: 1, tension: 210, friction: 20 },
  }));
  const bind = (0, react_use_gesture_1.useGesture)({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      });
      if (
        state.movement[1] > 300 ||
        (state.velocity > 3 && state.direction[1] > 0)
      ) {
        onDismiss();
      }
    },
  });
  return (0, jsx_runtime_1.jsxs)(
    jsx_runtime_1.Fragment,
    {
      children: [
        (0, jsx_runtime_1.jsx)(
          react_1.Global,
          {
            styles: (0, react_1.css)`
          :root {
            --reach-dialog: 1;
          }

          [data-reach-dialog-overlay] {
            background: hsla(0, 0%, 0%, 0.33);
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            overflow: auto;
          }

          [data-reach-dialog-content] {
            width: 50vw;
            margin: 10vh auto;
            background: white;
            padding: 2rem;
            outline: none;
          }
        `,
          },
          void 0
        ),
        fadeTransition(
          (props, item) =>
            item &&
            (0, jsx_runtime_1.jsx)(
              StyledDialogOverlay,
              Object.assign(
                {
                  style: props,
                  isOpen: isOpen || props.opacity.get() !== 0,
                  onDismiss: onDismiss,
                  darkenOverlay: darkenOverlay,
                },
                {
                  children: (0, jsx_runtime_1.jsxs)(
                    ModalWrapper,
                    Object.assign(
                      { "aria-label": "dialog content" },
                      react_device_detect_1.isMobile
                        ? Object.assign(Object.assign({}, bind()), {
                            style: {
                              transform: y.to(
                                (n) => `translateY(${n > 0 ? n : 0}px)`
                              ),
                            },
                          })
                        : {},
                      {
                        children: [
                          (0, jsx_runtime_1.jsxs)(
                            TopArea,
                            {
                              children: [
                                onBack
                                  ? (0, jsx_runtime_1.jsx)(
                                      ButtonIcon,
                                      Object.assign(
                                        {
                                          href: "#",
                                          onClick: (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onBack();
                                          },
                                        },
                                        {
                                          children: (0, jsx_runtime_1.jsx)(
                                            icons_1.BackIcon,
                                            {},
                                            void 0
                                          ),
                                        }
                                      ),
                                      void 0
                                    )
                                  : (0, jsx_runtime_1.jsx)("div", {}, void 0),
                                hideSolanaLogo
                                  ? (0, jsx_runtime_1.jsx)("div", {}, void 0)
                                  : (0, jsx_runtime_1.jsx)(
                                      LogoWrapper,
                                      {
                                        children: (0, jsx_runtime_1.jsx)(
                                          icons_1.SolanaLogo,
                                          {},
                                          void 0
                                        ),
                                      },
                                      void 0
                                    ),
                                hideCloseButton
                                  ? (0, jsx_runtime_1.jsx)("div", {}, void 0)
                                  : (0, jsx_runtime_1.jsx)(
                                      ButtonIcon,
                                      Object.assign(
                                        {
                                          href: "#",
                                          onClick: (e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onDismiss();
                                          },
                                        },
                                        {
                                          children: (0, jsx_runtime_1.jsx)(
                                            icons_1.CloseIcon,
                                            {},
                                            void 0
                                          ),
                                        }
                                      ),
                                      void 0
                                    ),
                              ],
                            },
                            void 0
                          ),
                          (0, jsx_runtime_1.jsx)(
                            Content,
                            { children: children },
                            void 0
                          ),
                        ],
                      }
                    ),
                    void 0
                  ),
                }
              ),
              void 0
            )
        ),
      ],
    },
    void 0
  );
};
exports.Modal = Modal;
const LogoWrapper = styled_1.default.div`
  flex: 1 1 auto;

  display: flex;
  justify-content: center;
`;
const TopArea = styled_1.default.div`
  position: absolute;
  top: 12px;
  left: 16px;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ButtonIcon = styled_1.default.a`
  flex: 0 0 24px;
  color: #ccd2e3;
  &:hover {
    color: ${(0, darken_1.default)(0.1, "#ccd2e3")};
  }
  transition: 0.1s ease;
`;
const Content = styled_1.default.div`
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalWrapper = (0, styled_1.default)(
  (0, react_spring_1.animated)(dialog_1.DialogContent)
)`
  * {
    box-sizing: border-box;
  }
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";

  position: relative;

  box-shadow: 0px 4px 16px rgba(207, 207, 207, 0.25);
  width: 100%;
  max-width: 360px;
  height: 608px;
  border-radius: 8px;
  background: #fff;
  color: #696969;

  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
`;
const StyledDialogOverlay = (0, styled_1.default)(
  (0, react_spring_1.animated)(dialog_1.DialogOverlay),
  {
    shouldForwardProp(prop) {
      return prop !== "darkenOverlay";
    },
  }
)`
  [data-reach-dialog-content] {
    padding: 0;
  }

  ${({ darkenOverlay }) =>
    darkenOverlay
      ? (0, react_1.css)`
          background: rgba(0, 0, 0, 0.55);
        `
      : (0, react_1.css)`
          background: none;
        `}
`;
//# sourceMappingURL=index.js.map
