import { css } from "@emotion/react";
import styled from "@emotion/styled";
import lighten from "polished/lib/color/lighten";

import { useWalletKit } from "../../WalletKitProvider";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onClick"
  > {
  variant?: "primary" | "secondary";
}

const Logomark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#solana_logomark_clip_goki)">
      <path
        d="M2.59829 10.4132C2.69612 10.3119 2.82875 10.255 2.96704 10.255H15.7267C15.9592 10.255 16.0756 10.5463 15.9111 10.7166L13.3898 13.3277C13.292 13.4291 13.1594 13.486 13.0211 13.486H0.261373C0.0289306 13.486 -0.0874295 13.1947 0.0769974 13.0244L2.59829 10.4132Z"
        fill="currentcolor"
      />
      <path
        d="M2.59768 0.658221C2.69551 0.55691 2.82814 0.5 2.96643 0.5H15.7261C15.9586 0.5 16.075 0.791323 15.9105 0.961608L13.3892 3.57274C13.2914 3.67405 13.1588 3.73096 13.0205 3.73096H0.260763C0.0283203 3.73096 -0.0880399 3.43964 0.0763871 3.26935L2.59768 0.658221Z"
        fill="currentcolor"
      />
      <path
        d="M13.3898 5.50467C13.292 5.40334 13.1594 5.34647 13.0211 5.34647H0.261373C0.0289306 5.34647 -0.0874295 5.63776 0.0769975 5.80805L2.59829 8.41917C2.69612 8.52051 2.82875 8.57743 2.96704 8.57743H15.7267C15.9592 8.57743 16.0756 8.28609 15.9111 8.1158L13.3898 5.50467Z"
        fill="currentcolor"
      />
    </g>
    <defs>
      <clipPath id="solana_logomark_clip_goki">
        <rect
          width="16"
          height="13"
          fill="currentcolor"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const ConnectWalletButton: React.FC<Props> = ({
  variant = "primary",
  ...buttonProps
}: Props) => {
  const { connect } = useWalletKit();
  return (
    <Button variant={variant} {...buttonProps} onClick={connect}>
      <Logomark
        css={css`
          height: 13px;
          width: 16px;
        `}
      />
      <span>Connect Wallet</span>
    </Button>
  );
};

const Button = styled.button<{
  variant: "primary" | "secondary";
}>`
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

  ${({ variant = "primary" }) =>
    variant === "primary"
      ? css`
          background: #70ed9d;
          color: #000;
          &:hover {
            background: ${lighten(0.1, "#70ed9d")};
          }
        `
      : css`
          background: #000;
          color: #fff;
          &:hover {
            background: ${lighten(0.1, "#000")};
          }
        `}

  & > span {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
  }
`;
