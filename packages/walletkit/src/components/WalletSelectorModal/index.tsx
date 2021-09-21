import type { WalletProviderInfo } from "@saberhq/use-solana";
import { useSolana, WalletType } from "@saberhq/use-solana";
import React, { useMemo, useState } from "react";
import { isMobile } from "react-device-detect";

import type { WalletKitArgs } from "../../types";
import type { ModalProps } from "../Modal";
import { Modal } from "../Modal";
import { WalletStepConnecting } from "./WalletStepConnecting";
import { WalletStepIntro } from "./WalletStepIntro";
import { DefaultAppIcon } from "./WalletStepIntro/DefaultAppIcon";
import { WalletStepLedgerAdvanced } from "./WalletStepLedgerAdvanced";
import { WalletStepRedirect } from "./WalletStepRedirect";
import type { ProviderInfo } from "./WalletStepSelect";
import { WalletStepSelect } from "./WalletStepSelect";

type Props = Omit<ModalProps, "children"> & WalletKitArgs;

export enum ModalStep {
  Intro = "intro",
  Select = "select",
  Redirect = "redirect",
  Connecting = "connecting",
  LedgerAdvanced = "ledger-advanced",
}

const defaultOnWalletKitError = (err: Error) => {
  console.error(err);
};

export const WalletSelectorModal: React.FC<Props> = ({
  app,
  onWalletKitError = defaultOnWalletKitError,
  initialStep = ModalStep.Intro,
  ...modalProps
}: Props) => {
  const appIcon = useMemo(() => app.icon ?? <DefaultAppIcon />, [app.icon]);

  const [step, setStep] = useState<ModalStep>(initialStep);

  const [installProvider, setInstallProvider] =
    useState<WalletProviderInfo | null>(null);

  const { disconnect, activate } = useSolana();
  const [walletToConnect, setWalletToConnect] = useState<ProviderInfo | null>(
    null
  );

  const onDismiss = () => {
    modalProps.onDismiss();

    // unset everything else after the modal unhide animation
    setTimeout(() => {
      setInstallProvider(null);
      setWalletToConnect(null);
      setStep(ModalStep.Intro);
    }, 500);
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
                case ModalStep.LedgerAdvanced:
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
            disconnect();

            if (
              info.type === WalletType.Ledger &&
              info.info.name === "Ledger (advanced)"
            ) {
              setStep(ModalStep.LedgerAdvanced);
              return;
            }

            setWalletToConnect(info);
            setStep(ModalStep.Connecting);

            if (
              isMobile &&
              (info.type === WalletType.Sollet ||
                info.type === WalletType.Solflare)
            ) {
              void activate(info.type);
            }
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
      {step === ModalStep.LedgerAdvanced && (
        <WalletStepLedgerAdvanced
          onBack={() => {
            setStep(ModalStep.Select);
          }}
          onError={onWalletKitError}
          onSuccess={onDismiss}
        />
      )}
    </Modal>
  );
};
