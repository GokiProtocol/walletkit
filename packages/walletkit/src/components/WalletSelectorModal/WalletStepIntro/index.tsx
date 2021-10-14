import styled from "@emotion/styled";
import { Trans, useTranslation, getI18n } from "react-i18next";

import { LangOption } from "../../../types";
import { ButtonWithFooter } from "../ButtonWithFooter";
import { Detail } from "./Detail";
import { BoltIcon, ConnectDots, LockIcon, SolanaIcon } from "./icons";
import { LanguageToggle } from "../LanguageToggle";

interface Props {
  appName: string;
  appIcon?: React.ReactNode;
  langOption?: LangOption;
  onContinue?: () => void;
}

export const WalletStepIntro: React.FC<Props> = ({
  appName,
  appIcon,
  langOption,
  onContinue,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <AppIconsWrapper>
        <AppIcons>
          <SolanaIcon />
          <ConnectDots />
          {appIcon}
        </AppIcons>
      </AppIconsWrapper>
      <Instruction>
        <Trans i18nKey="modal.walletStepIntro.instruction">
          To use {{ appName }}, you need to connect a Solana wallet
        </Trans>
      </Instruction>
      <LanguageToggle langOption={langOption} />
      <DetailsWrapper>
        <Detail
          icon={<LockIcon />}
          title={
            <Trans i18nKey="modal.walletStepIntro.detailsOne.title">
              You control your crypto
            </Trans>
          }
          description={
            <Trans i18nKey="modal.walletStepIntro.detailsOne.description">
              Using a non-custodial wallet enables you to control your crypto without having to trust third parties.
            </Trans>
          }
        />
        <Detail
          icon={<BoltIcon />}
          title={
            <Trans i18nKey="modal.walletStepIntro.detailsTwo.title">
              Transact quickly and cheaply
            </Trans>
          }
          description={
            <Trans i18nKey="modal.walletStepIntro.detailsTwo.description">
              Solana's scalability ensures transactions remain less than $0.01 and at lightning fast speeds.
            </Trans>
          }
        />
      </DetailsWrapper>
      <ButtonWithFooter
        onClick={onContinue}
        footer={
          <>
            <Trans i18nKey="footer.title">
              First time using Solana?&nbsp;&nbsp;
            </Trans>
            <a
              href="https://learn.goki.so"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Trans i18nKey="footer.button">
                Learn more
              </Trans>
            </a>
          </>
        }
      >
        <Trans i18nKey="buttons.continue">
          Conitnue
        </Trans>
      </ButtonWithFooter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 28px;
  padding-top: 33px;
`;

const AppIcons = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  grid-column-gap: 20px;
  align-items: center;
  width: 192px;
`;

const Instruction = styled.h2`
  font-weight: normal;
  margin-top: 27px;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #000000;
`;

const DetailsWrapper = styled.div`
  margin: 46px 0px;
  display: grid;
  grid-row-gap: 28px;
`;

const AppIconsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
