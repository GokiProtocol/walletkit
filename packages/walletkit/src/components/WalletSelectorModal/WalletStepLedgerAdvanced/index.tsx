/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "@emotion/styled";
import {
  DEFAULT_WALLET_PROVIDERS,
  DefaultWalletType,
  useSolana,
} from "@saberhq/use-solana";
import { useState } from "react";

import { LabeledInput } from "../../LabeledInput";
import { ButtonWithFooter } from "../ButtonWithFooter";

interface Props {
  onBack?: () => void;
  onError: (err: Error) => void;
  onSuccess?: () => void;
}

export const WalletStepLedgerAdvanced: React.FC<Props> = ({
  onBack,
  onSuccess,
  onError,
}: Props) => {
  const [accountStr, setAccountStr] = useState<string>("");
  const [changeStr, setChangeStr] = useState<string>("");
  const { activate } = useSolana();

  return (
    <Wrapper>
      <IconWrapper>
        <DEFAULT_WALLET_PROVIDERS.Ledger.icon />
      </IconWrapper>
      <h2>Enter your Ledger account info</h2>
      <p>
        Not sure what to enter here? You’re probably looking for the basic{" "}
        <strong>Ledger Connect</strong>.
      </p>
      <Fields>
        <LabeledInput
          label="Account"
          placeholder="Root"
          name="account"
          value={accountStr}
          onChange={(e) => {
            setAccountStr(e.target.value);
          }}
        />
        <LabeledInput
          label="Change"
          placeholder="Root"
          name="change"
          value={changeStr}
          onChange={(e) => {
            setChangeStr(e.target.value);
          }}
        />
      </Fields>
      <ButtonWithFooter
        onClick={async () => {
          try {
            const account =
              accountStr === "" ? undefined : parseInt(accountStr);
            const change = changeStr === "" ? undefined : parseInt(changeStr);
            await activate(DefaultWalletType.Ledger, {
              account,
              change,
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
