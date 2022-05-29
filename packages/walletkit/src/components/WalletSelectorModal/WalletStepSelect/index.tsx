import styled from "@emotion/styled";
import type { WalletProviderInfo } from "@saberhq/use-solana";
import {
  DEFAULT_WALLET_PROVIDERS,
  DefaultWalletType,
} from "@saberhq/use-solana";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { WalletProviderOption } from "./WalletProviderOption";

export interface ProviderInfo {
  type: DefaultWalletType;
  info: WalletProviderInfo;
  mustInstall: boolean;
}

const getWalletProviders = (debugMode = false): readonly ProviderInfo[] => {
  const base = (
    Object.entries(DEFAULT_WALLET_PROVIDERS) as readonly [
      DefaultWalletType,
      WalletProviderInfo
    ][]
  )
    .filter(([, p]) =>
      typeof window !== "undefined" && isMobile ? p.isMobile : true
    )
    .slice()
    .sort(([, a], [, b]) => {
      if (typeof window !== "undefined") {
        return (a.isInstalled?.() ?? true) === (b.isInstalled?.() ?? true)
          ? a.name < b.name
            ? -1
            : 1
          : a.isInstalled?.() ?? true
          ? -1
          : 1;
      }
      return a.name < b.name ? -1 : 1;
    })
    .map(
      ([walletType, info]): ProviderInfo => ({
        type: walletType,
        info,
        mustInstall: !!(
          typeof window !== "undefined" &&
          info.isInstalled &&
          info.isInstalled()
        ),
      })
    )
    .filter((p) =>
      debugMode
        ? true
        : p.type !== DefaultWalletType.SecretKey &&
          p.type !== DefaultWalletType.ReadOnly
    );
  return [
    ...base,
    {
      type: DefaultWalletType.Ledger,
      info: {
        ...DEFAULT_WALLET_PROVIDERS.Ledger,
        name: "Ledger (advanced)",
        url: "https://ledger.com",
        isMobile: false,
      },
      mustInstall: false,
    },
  ];
};

interface Props {
  onSelect?: (info: ProviderInfo) => void;
  onInstall?: (info: WalletProviderInfo) => void;
  debugMode?: boolean;
}

export const WalletStepSelect: React.FC<Props> = ({
  onSelect,
  onInstall,
  debugMode,
}: Props) => {
  const [showUninstalled, setShowUninstalled] = useState<boolean>(false);
  const [providerInfo, setProviderInfo] = useState<readonly ProviderInfo[]>(
    getWalletProviders()
  );

  useEffect(() => {
    // wait a second for everything to load
    const timeout = setTimeout(() => {
      setProviderInfo(getWalletProviders(debugMode));
    }, 1_000);
    return () => clearTimeout(timeout);
  }, [debugMode]);

  return (
    <>
      <Heading>Select your wallet</Heading>
      <ScrollArea>
        <Wallets>
          {providerInfo
            .filter((prov) =>
              showUninstalled
                ? true
                : prov.mustInstall || !prov.info.isInstalled
            )
            .map((fullInfo) => {
              const { info: provider, type } = fullInfo;
              return (
                <WalletProviderOption
                  key={provider.url}
                  type={type}
                  info={provider}
                  onSelect={() => {
                    onSelect?.(fullInfo);
                  }}
                  onInstall={onInstall}
                />
              );
            })}
        </Wallets>
        <ShowUninstalledWrapper>
          <ShowUninstalled onClick={() => setShowUninstalled(!showUninstalled)}>
            {showUninstalled ? "Hide" : "Show"} uninstalled wallets
          </ShowUninstalled>
        </ShowUninstalledWrapper>
      </ScrollArea>
    </>
  );
};

const ScrollArea = styled.div`
  height: calc(100% - 125px);
  overflow-y: scroll;
`;

const Wallets = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: 65px;
`;

const Heading = styled.h2`
  padding: 48px 28px 0;

  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  letter-spacing: -0.02em;
  color: #000000;
  margin-bottom: 24px;
`;

const ShowUninstalled = styled.a`
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ShowUninstalledWrapper = styled.div`
  margin: 24px 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
