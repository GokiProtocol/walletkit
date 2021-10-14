import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useSolana, WalletType } from "@saberhq/use-solana";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation, Trans } from "react-i18next";

import { BottomArea, FooterText } from "../ButtonWithFooter";
import type { ProviderInfo } from "../WalletStepSelect";
import { ConnectingAnimation } from "./ConnectingAnimation";

interface Props {
  appIcon: React.ReactNode;
  info: ProviderInfo;
  onBack?: () => void;
  onComplete?: () => void;
}

export const WalletStepConnecting: React.FC<Props> = ({
  appIcon,
  info,
  onBack,
  onComplete,
}: Props) => {
  const walletProviderInfo = info.info;
  const icon =
    typeof walletProviderInfo.icon === "string" ? (
      <img src={walletProviderInfo.icon} />
    ) : (
      <walletProviderInfo.icon />
    );
  const { activate, connected, wallet } = useSolana();
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const isManualConnect =
    isMobile &&
    (info.type === WalletType.Sollet || info.type === WalletType.Solflare);

  const doActivate = useCallback(async () => {
    try {
      await activate(info.type);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [activate, info.type]);

  // attempt to activate the wallet on initial load
  useEffect(() => {
    if (isManualConnect) {
      return;
    }
    // delay so people can see a message
    const timeout = setTimeout(() => {
      void doActivate();
    }, 500);
    return () => clearTimeout(timeout);
    // only run this on the first display of this modal
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // close modal only when the wallet is connected
  useEffect(() => {
    if (wallet && connected) {
      onComplete?.();
    }
  }, [wallet, connected, onComplete]);

  return (
    <Wrapper>
      <ConnectingWrapper>
        {error ? (
          <ConnectingHeader>
            <Connecting><Trans i18nKey="modal.walletStepConnecting.error.header">Error Connecting Wallet</Trans></Connecting>
            <ConnectingInstructions>{error}</ConnectingInstructions>
            <ConnectingInstructions>
              <a
                css={css`
                  color: #696969;
                  font-weight: bold;
                `}
                href="#"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  void doActivate();
                }}
              >
                <Trans i18nKey="buttons.retry">
                  Retry
                </Trans>
              </a>
            </ConnectingInstructions>
          </ConnectingHeader>
        ) : (
          <ConnectingHeader>
            <Connecting>
              <Trans i18nKey="modal.walletStepConnecting.connecting.header">
                Connecting...
              </Trans>
            </Connecting>
            {isManualConnect ? (
              <ConnectingInstructions>
                Please{" "}
                <a
                  css={css`
                    color: #696969;
                    font-weight: bold;
                  `}
                  href="#"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    wallet?.connect();
                  }}
                >
                  click here
                </a>{" "}
                to unlock your {walletProviderInfo.name} wallet.
              </ConnectingInstructions>
            ) : (
              <ConnectingInstructions>
                <Trans i18nKey="modal.walletStepConnecting.connecting.instructions">
                  Please unlock your {{ walletName: walletProviderInfo.name }} wallet
                </Trans>
              </ConnectingInstructions>
            )}
          </ConnectingHeader>
        )}
        <AppIconsWrapper>
          <AppIcons>
            {icon}
            <ConnectingAnimation />
            {appIcon}
          </AppIcons>
        </AppIconsWrapper>
        <BottomArea>
          <FooterText>
            <Trans i18nKey="modal.walletStepConnecting.footer.title">
              Having trouble?{"  "}
            </Trans>
            <a
              href="#"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onBack?.();
              }}
            >
              <Trans i18nKey="buttons.goBack">
                Go back{"  "}
              </Trans>
            </a>
          </FooterText>
        </BottomArea>
      </ConnectingWrapper>
    </Wrapper>
  );
};

const ConnectingHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 68px;
  margin-bottom: 71px;
`;

const Connecting = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
`;

const ConnectingInstructions = styled.p`
  margin: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #696969;
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AppIcons = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  grid-column-gap: 20px;
  align-items: center;
  width: 192px;

  & > img,
  & > svg {
    width: 48px;
    height: 48px;
  }
`;

const AppIconsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ConnectingWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100% - 154px);

  background: #f9f9f9;
  border-radius: 32px 32px 8px 8px;

  animation: fadeIn 0.2s forwards;
  animation-timing-function: ease-out;

  @keyframes fadeIn {
    0% {
      bottom: -300px;
    }
    100% {
      bottom: 0;
    }
  }
`;
