import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import type { Locales } from "../../../types";
import { ButtonWithFooter } from "../ButtonWithFooter";
import { LanguageToggle } from "../LanguageToggle";
import { Detail } from "./Detail";
import { BoltIcon, ConnectDots, LockIcon, SolanaIcon } from "./icons";

interface Props<L extends string> {
  appName: string;
  appIcon?: React.ReactNode;
  locales: Locales<L>;
  onContinue?: () => void;
}

export const WalletStepIntro = <L extends string>({
  appName,
  appIcon,
  locales,
  onContinue,
}: Props<L>): React.ReactElement => {
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
        {t(
          "modal.walletStepIntro.instruction",
          `To use {{appName}}, you need to connect to a Solana wallet`,
          { appName: appName }
        )}
      </Instruction>
      <LanguageToggle locales={locales} />
      <DetailsWrapper>
        <Detail
          icon={<LockIcon />}
          title={t(
            "modal.walletStepIntro.detailsOne.title",
            "You control your crypto"
          )}
          description={t(
            "modal.walletStepIntro.detailsOne.description",
            "Using a non-custodial wallet enables you to control your crypto without having to trust third parties."
          )}
        />
        <Detail
          icon={<BoltIcon />}
          title={t(
            "modal.walletStepIntro.detailsTwo.title",
            "Transact quickly and cheaply"
          )}
          description={t(
            "modal.walletStepIntro.detailsTwo.description",
            "Solana's scalability ensures transactions remain less than $0.01 and at lightning fast speeds."
          )}
        />
      </DetailsWrapper>
      <ButtonWithFooter
        onClick={onContinue}
        footer={
          <>
            {t("footer.title", "First time using Solana? ")}
            {"  "}
            <a
              href="https://learn.goki.so"
              target="_blank"
              rel="noreferrer noopener"
            >
              {t("footer.button", "Learn more")}
            </a>
          </>
        }
      >
        {t("buttons.continue", "Continue")}
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
