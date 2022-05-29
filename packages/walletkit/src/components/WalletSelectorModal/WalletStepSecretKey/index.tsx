/* eslint-disable jsx-a11y/anchor-is-valid */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  DEFAULT_WALLET_PROVIDERS,
  DefaultWalletType,
  useSolana,
} from "@saberhq/use-solana";
import { Keypair } from "@solana/web3.js";
import { useMemo, useState } from "react";

import { LabeledInput } from "../../LabeledInput";
import { ButtonWithFooter } from "../ButtonWithFooter";

interface Props {
  onBack?: () => void;
  onError: (err: Error) => void;
  onSuccess?: () => void;
}

export const WalletStepSecretKey: React.FC<Props> = ({
  onBack,
  onSuccess,
  onError,
}: Props) => {
  const [keypairStr, setKeypairStr] = useState<string>(
    JSON.stringify([...Keypair.generate().secretKey])
  );
  const [keypair, keypairErr] = useMemo(() => {
    try {
      return [
        Keypair.fromSecretKey(
          Uint8Array.from(JSON.parse(keypairStr) as number[])
        ),
        null,
      ];
    } catch (e) {
      return [null, e as Error];
    }
  }, [keypairStr]);
  const { activate } = useSolana();

  return (
    <Wrapper>
      <IconWrapper>
        <DEFAULT_WALLET_PROVIDERS.SecretKey.icon />
      </IconWrapper>
      <h2>Enter a JSON Keypair</h2>
      <p
        css={css`
          color: red !important;
        `}
      >
        Warning: do not use this outside of testing. If you were told to go here
        by someone else, don't do it.
      </p>
      <Fields>
        <LabeledInput
          label="Keypair (JSON)"
          placeholder="Enter a JSON keypair string"
          name="account"
          value={keypairStr}
          onChange={(e) => {
            setKeypairStr(e.target.value);
          }}
        />
        {keypair && (
          <LabeledInput
            id="secretKeyConnectorPubkey"
            label="Public Key"
            name="publicKey"
            disabled
            value={keypair?.publicKey.toString()}
          />
        )}
      </Fields>
      {keypairErr && (
        <p>
          <span
            css={css`
              color: red;
            `}
          >
            Error: {keypairErr.message}
          </span>
        </p>
      )}
      <ButtonWithFooter
        disabled={!keypair}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          if (!keypair) {
            throw new Error("keypair missing");
          }
          try {
            await activate(DefaultWalletType.SecretKey, {
              secretKey: [...keypair.secretKey],
            });
          } catch (e) {
            onError?.(e as Error);
            return;
          }
          onSuccess?.();
        }}
        footer={
          <>
            Having trouble?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBack?.();
              }}
            >
              Go back
            </a>
          </>
        }
      >
        Continue
      </ButtonWithFooter>
    </Wrapper>
  );
};

const IconWrapper = styled.div`
  & > svg,
  & > img {
    width: 36px;
    height: 36px;
  }
  margin-bottom: 32px;
`;

const Wrapper = styled.div`
  padding: 28px;
  padding-top: 67px;

  & > h2 {
    font-weight: bold;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.02em;
    color: #000000;
  }

  & > p {
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.02em;
    color: #696969;
  }
`;

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
