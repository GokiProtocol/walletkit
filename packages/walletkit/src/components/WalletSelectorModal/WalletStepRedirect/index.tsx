import styled from "@emotion/styled";
import type { WalletProviderInfo } from "@saberhq/use-solana";
import { useMemo } from "react";

import { ContinueButton } from "../WalletStepIntro/ContinueButton";

interface Props {
  info: WalletProviderInfo;
}

export const WalletStepRedirect: React.FC<Props> = ({ info }: Props) => {
  const providerURL = useMemo(() => {
    try {
      return new URL(info.url).hostname;
    } catch (e) {
      return info.url;
    }
  }, [info.url]);

  const icon =
    typeof info.icon === "string" ? <img src={info.icon} /> : <info.icon />;

  return (
    <Wrapper>
      <IconWrapper>{icon}</IconWrapper>
      <h2>You're being redirected</h2>
      <p>
        In order to use {info.name}, you must first install their browser
        extension.
      </p>
      <p>
        Make sure you only install their wallet from the official{" "}
        <strong>{providerURL}</strong> website.
      </p>
      <ContinueButton
        onClick={() => {
          window.open(info.url, "_blank", "noopener noreferrer");
        }}
      >
        Continue
      </ContinueButton>
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
