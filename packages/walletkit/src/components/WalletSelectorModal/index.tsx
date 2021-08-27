import type { WalletProviderInfo } from "@saberhq/use-solana";
import React, { useMemo, useState } from "react";

import type { WalletKitArgs } from "../../types";
import type { ModalProps } from "../Modal";
import { Modal } from "../Modal";
import { WalletStepConnecting } from "./WalletStepConnecting";
import { WalletStepIntro } from "./WalletStepIntro";
import { DefaultAppIcon } from "./WalletStepIntro/DefaultAppIcon";
import { WalletStepRedirect } from "./WalletStepRedirect";
import type { ProviderInfo } from "./WalletStepSelect";
import { WalletStepSelect } from "./WalletStepSelect";

type Props = Omit<ModalProps, "children"> & WalletKitArgs;

enum ModalStep {
  Intro = "intro",
  Select = "select",
  Redirect = "redirect",
  Connecting = "connecting",
}

export const WalletSelectorModal: React.FC<Props> = ({
  app,
  ...modalProps
}: Props) => {
  const appIcon = useMemo(() => app.icon ?? <DefaultAppIcon />, [app.icon]);

  const [step, setStep] = useState<ModalStep>(ModalStep.Intro);

  const [installProvider, setInstallProvider] =
    useState<WalletProviderInfo | null>(null);

  const [walletToConnect, setWalletToConnect] = useState<ProviderInfo | null>(
    null
  );

  const onDismiss = () => {
    modalProps.onDismiss();
    setInstallProvider(null);
    setWalletToConnect(null);
    setStep(ModalStep.Intro);
  };

  return (
    <Modal
      {...modalProps}
      onDismiss={onDismiss}
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
                case ModalStep.Connecting:
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
          onSelect={(info) => {
            setWalletToConnect(info);
            setStep(ModalStep.Connecting);
          }}
          onInstall={(info) => {
            setInstallProvider(info);
            setStep(ModalStep.Redirect);
          }}
        />
      )}
      {step === ModalStep.Redirect && installProvider && (
        <WalletStepRedirect info={installProvider} />
      )}
      {step === ModalStep.Connecting && walletToConnect && (
        <WalletStepConnecting
          appIcon={appIcon}
          info={walletToConnect}
          onBack={() => {
            setStep(ModalStep.Select);
          }}
          onComplete={onDismiss}
        />
      )}
    </Modal>
  );
};
