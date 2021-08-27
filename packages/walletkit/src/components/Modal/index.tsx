import "@reach/dialog/styles.css";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import darken from "polished/lib/color/darken";
import React from "react";
import { isMobile } from "react-device-detect";
import { animated, useSpring, useTransition } from "react-spring";
import { useGesture } from "react-use-gesture";

import { BackIcon, CloseIcon, SolanaLogo } from "./icons";

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onDismiss: () => void;
  darkenOverlay?: boolean;

  onBack?: () => void;
  hideCloseButton?: boolean;
  hideSolanaLogo?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onDismiss,
  darkenOverlay = true,

  onBack,
  hideCloseButton = false,
  hideSolanaLogo = true,
}: ModalProps) => {
  const fadeTransition = useTransition(isOpen, {
    config: { duration: 150 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: { mass: 1, tension: 210, friction: 20 },
  }));
  const bind = useGesture({
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

  return (
    <>
      {fadeTransition(
        (props, item) =>
          item && (
            <StyledDialogOverlay
              style={props}
              isOpen={isOpen || props.opacity.get() !== 0}
              onDismiss={onDismiss}
              darkenOverlay={darkenOverlay}
            >
              <ModalWrapper
                aria-label="dialog content"
                {...(isMobile
                  ? {
                      ...bind(),
                      style: {
                        transform: y.to(
                          (n) => `translateY(${n > 0 ? n : 0}px)`
                        ),
                      },
                    }
                  : {})}
              >
                <TopArea>
                  {onBack ? (
                    <ButtonIcon
                      href="#"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onBack();
                      }}
                    >
                      <BackIcon />
                    </ButtonIcon>
                  ) : (
                    <div />
                  )}
                  {hideSolanaLogo ? (
                    <div />
                  ) : (
                    <LogoWrapper>
                      <SolanaLogo />
                    </LogoWrapper>
                  )}
                  {hideCloseButton ? (
                    <div />
                  ) : (
                    <ButtonIcon
                      href="#"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDismiss();
                      }}
                    >
                      <CloseIcon />
                    </ButtonIcon>
                  )}
                </TopArea>
                <Content>{children}</Content>
              </ModalWrapper>
            </StyledDialogOverlay>
          )
      )}
    </>
  );
};

const LogoWrapper = styled.div`
  flex: 1 1 auto;

  display: flex;
  justify-content: center;
`;

const TopArea = styled.div`
  position: absolute;
  top: 12px;
  left: 16px;
  right: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonIcon = styled.a`
  flex: 0 0 24px;
  color: #ccd2e3;
  &:hover {
    color: ${darken(0.1, "#ccd2e3")};
  }
  transition: 0.1s ease;
`;

const Content = styled.div`
  position: absolute;
  top: 28px;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalWrapper = styled(animated(DialogContent))`
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

const StyledDialogOverlay = styled(animated(DialogOverlay))<{
  darkenOverlay: boolean;
}>`
  [data-reach-dialog-content] {
    padding: 0;
  }

  ${({ darkenOverlay }) =>
    darkenOverlay
      ? css`
          background: rgba(0, 0, 0, 0.55);
        `
      : css`
          background: none;
        `}
`;
