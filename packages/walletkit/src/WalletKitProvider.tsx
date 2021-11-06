import type { UseSolanaArgs } from "@saberhq/use-solana";
import { SolanaProvider } from "@saberhq/use-solana";
import i18next from "i18next";
import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { I18nextProvider } from "react-i18next";

import {
  ModalStep,
  WalletSelectorModal,
} from "./components/WalletSelectorModal";
import { initI18n } from "./i18n";
import type { Locales, WalletKitArgs } from "./types";

export { useConnectedWallet, useSolana, useWallet } from "@saberhq/use-solana";

export interface WalletKit {
  connect: () => void;
}

const WalletKitContext = React.createContext<WalletKit | null>(null);

interface Props extends Omit<WalletKitArgs, "locales">, UseSolanaArgs {
  additionalLocales?: Locales<string>;
  children: React.ReactNode;
}

export const DEFAULT_LOCALES = {
  en: { nativeName: "English" },
};

export const WalletKitProvider: React.FC<Props> = ({
  children,
  app,
  additionalLocales,
  initialStep = ModalStep.Intro,
  ...solanaProviderArgs
}: Props) => {
  const [showWalletSelector, setShowWalletSelector] = useState<boolean>(false);

  const kit = useMemo(() => {
    return { connect: () => setShowWalletSelector(true) };
  }, []);

  const locales = {
    ...DEFAULT_LOCALES,
    ...additionalLocales,
  };

  useEffect(() => {
    void initI18n();
  });

  return (
    <Suspense fallback="loading..">
      <I18nextProvider i18n={i18next}>
        <SolanaProvider {...solanaProviderArgs}>
          <WalletKitContext.Provider value={kit}>
            <WalletSelectorModal
              app={app}
              initialStep={initialStep}
              isOpen={showWalletSelector}
              onDismiss={() => setShowWalletSelector(false)}
              locales={locales}
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
