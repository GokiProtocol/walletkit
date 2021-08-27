import type { WalletProviderInfo } from "@saberhq/use-solana";
import React, { useMemo, useState } from "react";

import type { WalletKitArgs } from "../../types";
import type { ModalProps } from "../Modal";
import { Modal } from "../Modal";
import { WalletStepIntro } from "./WalletStepIntro";
import { DefaultAppIcon } from "./WalletStepIntro/DefaultAppIcon";
import { WalletStepRedirect } from "./WalletStepRedirect";
import { WalletStepSelect } from "./WalletStepSelect";

type Props = Omit<ModalProps, "children"> & WalletKitArgs;

enum ModalStep {
  Intro = "intro",
  Select = "select",
  Redirect = "redirect",
}

export const WalletSelectorModal: React.FC<Props> = ({
  app,
  ...modalProps
}: Props) => {
  const appIcon = useMemo(() => app.icon ?? <DefaultAppIcon />, [app.icon]);

  const [step, setStep] = useState<ModalStep>(ModalStep.Intro);

  const [installProvider, setInstallProvider] =
    useState<WalletProviderInfo | null>(null);

  return (
    <Modal
      {...modalProps}
      onDismiss={() => {
        modalProps.onDismiss();
        setStep(ModalStep.Intro);
        setInstallProvider(null);
      }}
      onBack={
        step === ModalStep.Intro
          ? undefined
          : () => {
              switch (step) {
                case ModalStep.Select:
                  setStep(ModalStep.Intro);
                  break;
                case ModalStep.Redirect:
                  setStep(ModalStep.Select);
                  break;
              }
            }
      }
      hideSolanaLogo={step === ModalStep.Intro}
    >
      {step === ModalStep.Intro && (
        <WalletStepIntro
          appName={app.name}
          appIcon={appIcon}
          onContinue={() => setStep(ModalStep.Select)}
        />
      )}
      {step === ModalStep.Select && (
        <WalletStepSelect
          onInstall={(info) => {
            setInstallProvider(info);
            setStep(ModalStep.Redirect);
          }}
        />
      )}
      {step === ModalStep.Redirect && installProvider && (
        <WalletStepRedirect info={installProvider} />
      )}
    </Modal>
  );
};
