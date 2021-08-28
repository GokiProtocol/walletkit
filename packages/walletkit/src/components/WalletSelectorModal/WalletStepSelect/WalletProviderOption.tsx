import styled from "@emotion/styled";
import type { WalletProviderInfo } from "@saberhq/use-solana";
import React, { useMemo } from "react";

interface Props {
  info: WalletProviderInfo;

  onInstall?: (info: WalletProviderInfo) => void;
  onSelect?: () => void;
}

export const WalletProviderOption: React.FC<Props> = ({
  info,
  onInstall,
  onSelect,
}: Props) => {
  const mustInstall =
    typeof window !== "undefined" && info.isInstalled?.() === false;
  const icon =
    typeof info.icon === "string" ? <img src={info.icon} /> : <info.icon />;

  const providerURL = useMemo(() => {
    try {
      return new URL(info.url).hostname;
    } catch (e) {
      return info.url;
    }
  }, [info.url]);

  return (
    <Wrapper
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (mustInstall) {
          onInstall?.(info);
          return;
        }
        onSelect?.();
      }}
    >
      <InfoTileWrapper className="wallet-info-tile">
        <InfoTile>
          <IconWrapper>{icon}</IconWrapper>
          <ProviderDesc>
            <ProviderName>{info.name}</ProviderName>
            <ProviderUrl>
              {providerURL}
              {mustInstall ? " (not installed)" : ""}
            </ProviderUrl>
          </ProviderDesc>
        </InfoTile>
      </InfoTileWrapper>
    </Wrapper>
  );
};

const IconWrapper = styled.div`
  height: 33px;
  width: 33px;

  & > img,
  & > svg {
    height: 100%;
    width: 100%;
  }
`;

const InfoTileWrapper = styled.div`
  flex: 1 1 auto;
  height: 100%;

  display: flex;
  align-items: center;
`;

const InfoTile = styled.div`
  display: grid;
  grid-template-columns: 33px 1fr;
  grid-column-gap: 16px;
`;

const ProviderDesc = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProviderName = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #000000;
`;

const ProviderUrl = styled.span`
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.02em;
  color: #696969;
`;

const Wrapper = styled.div`
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
