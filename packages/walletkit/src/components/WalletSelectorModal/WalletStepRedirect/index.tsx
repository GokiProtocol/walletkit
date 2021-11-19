/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "@emotion/styled";
import type { WalletProviderInfo } from "@saberhq/use-solana";
import { useEffect, useMemo } from "react";

import { ButtonWithFooter } from "../ButtonWithFooter";

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
    typeof info.icon === "string" ? (
      <img src={info.icon} alt={`Icon for wallet ${info.name}`} />
    ) : (
      <info.icon />
    );

  // autoredirect after 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.open(info.url, "_blank", "noopener");
    }, 1_000);
    return () => clearTimeout(timeout);
  });

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
      <ButtonWithFooter
        onClick={() => {
          window.open(info.url, "_blank", "noopener");
        }}
        footer={
          <>
            Finished installing?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.reload();
              }}
            >
              Refresh
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
