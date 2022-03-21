import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ConnectWalletButton } from "@gokiprotocol/walletkit";
import { PendingTransaction } from "@saberhq/solana-contrib";
import { createInitMintInstructions } from "@saberhq/token-utils";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import { Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { lighten } from "polished";
import { useCallback, useEffect, useState } from "react";
import invariant from "tiny-invariant";

import { breakpoints } from "./App";

export const Body: React.FC = () => {
  const { walletProviderInfo, disconnect, providerMut, network, setNetwork } =
    useSolana();
  const wallet = useConnectedWallet();
  const [balance, setBalance] = useState<number | null>(null);

  const refetchSOL = useCallback(async () => {
    if (wallet && providerMut) {
      setBalance(await providerMut.connection.getBalance(wallet.publicKey));
    }
  }, [providerMut, wallet]);

  useEffect(() => {
    void refetchSOL();
  }, [refetchSOL]);

  return (
    <AppWrapper>
      <h1
        css={css`
          font-size: 108px;
          ${breakpoints.mobile} {
            font-size: 64px;
          }
          margin: 0;
        `}
      >
        WalletKit
      </h1>
      <p
        css={css`
          margin: 0;
          margin-bottom: 48px;
        `}
      >
        A wallet connector for Solana dApps.
      </p>
      <ConnectWalletButton />
      <p
        css={css`
          margin-top: 48px;
          font-size: 20px;
        `}
      >
        Powered by Goki
      </p>
      {wallet ? (
        <WalletInfo>
          <h3>Connected Wallet</h3>
          <ul>
            <li>Wallet key: {wallet?.publicKey?.toString()}</li>
            <li>Provider: {walletProviderInfo?.name}</li>
            <li>Network: {network}</li>
            <li>
              Balance:{" "}
              {typeof balance === "number"
                ? `${(balance / LAMPORTS_PER_SOL).toLocaleString()} SOL`
                : "--"}
            </li>
          </ul>
          <Buttons>
            <Button onClick={() => void disconnect()}>Disconnect</Button>
            <Button
              onClick={() => {
                void setNetwork("devnet");
              }}
            >
              Switch to Devnet
            </Button>
            <Button
              disabled={!providerMut}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                invariant(providerMut, "providerMut");
                const txSig = await providerMut.connection.requestAirdrop(
                  providerMut.wallet.publicKey,
                  LAMPORTS_PER_SOL
                );
                await new PendingTransaction(
                  providerMut.connection,
                  txSig
                ).wait();
                await refetchSOL();
              }}
            >
              Request 1 SOL
            </Button>
            <Button
              disabled={!providerMut}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                invariant(providerMut, "providerMut");
                const tx = await createInitMintInstructions({
                  provider: providerMut,
                  mintKP: Keypair.generate(),
                  decimals: 9,
                });
                await tx.confirm();
                await refetchSOL();
              }}
            >
              Send Transaction
            </Button>
          </Buttons>
        </WalletInfo>
      ) : (
        <WalletInfo>
          <p>Connect a wallet above.</p>
        </WalletInfo>
      )}
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-align: center;
`;

const WalletInfo = styled.div`
  background: ${lighten(0.1, "#282c34")};
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  text-align: left;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;

  cursor: pointer;
  border: none;
  outline: none;
  height: 40px;
  mix-blend-mode: normal;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: 0 12px;

  background: #000;
  color: #fff;
  &:hover {
    background: ${lighten(0.1, "#000")};
  }

  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
