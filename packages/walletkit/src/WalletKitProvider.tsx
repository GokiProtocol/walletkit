import type { UseSolanaArgs } from "@saberhq/use-solana";
import { SolanaProvider } from "@saberhq/use-solana";
import React, { Suspense, useContext, useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";

import {
  ModalStep,
  WalletSelectorModal,
} from "./components/WalletSelectorModal";
import I18n from "./i18n";
import type { LangOption, WalletKitArgs } from "./types";

export { useConnectedWallet, useSolana, useWallet } from "@saberhq/use-solana";

export interface WalletKit {
  connect: () => void;
}

const WalletKitContext = React.createContext<WalletKit | null>(null);

interface Props extends WalletKitArgs, UseSolanaArgs {
  langOption?: LangOption;
  children: React.ReactNode;
}

export const WalletKitProvider: React.FC<Props> = ({
  children,
  app,
  langOption,
  initialStep = ModalStep.Intro,
  ...solanaProviderArgs
}: Props) => {
  const [showWalletSelector, setShowWalletSelector] = useState<boolean>(false);

  const kit = useMemo(() => {
    return { connect: () => setShowWalletSelector(true) };
  }, []);

  const l: LangOption = { en: { nativeName: "Englilsh" }, ...langOption };

  return (
    <Suspense fallback="loading..">
      <I18nextProvider i18n={I18n}>
        <SolanaProvider {...solanaProviderArgs}>
          <WalletKitContext.Provider value={kit}>
            <WalletSelectorModal
              app={app}
              initialStep={initialStep}
              isOpen={showWalletSelector}
              onDismiss={() => setShowWalletSelector(false)}
              langOption={l}
            />
            {children}
          </WalletKitContext.Provider>
        </SolanaProvider>
      </I18nextProvider>
    </Suspense>
  );
};

/**
 * Returns a function which shows the wallet selector modal.
 */
export const useWalletKit = (): WalletKit => {
  const kit = useContext(WalletKitContext);
  if (!kit) {
    throw new Error("Not in WalletConnector context");
  }
  return kit;
};
