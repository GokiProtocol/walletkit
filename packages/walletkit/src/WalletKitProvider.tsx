import type { UseSolanaArgs } from "@saberhq/use-solana";
import { SolanaProvider } from "@saberhq/use-solana";
import React, { useContext, useMemo, useState } from "react";

import {
  ModalStep,
  WalletSelectorModal,
} from "./components/WalletSelectorModal";
import type { WalletKitArgs } from "./types";

export interface WalletKit {
  connect: () => void;
}

const WalletKitContext = React.createContext<WalletKit | null>(null);

interface Props extends WalletKitArgs, UseSolanaArgs {
  children: React.ReactNode;
}

export const WalletKitProvider: React.FC<Props> = ({
  children,
  app,
  initialStep = ModalStep.Intro,
  ...solanaProviderArgs
}: Props) => {
  const [showWalletSelector, setShowWalletSelector] = useState<boolean>(false);

  const kit = useMemo(() => {
    return { connect: () => setShowWalletSelector(true) };
  }, []);

  return (
    <SolanaProvider {...solanaProviderArgs}>
      <WalletKitContext.Provider value={kit}>
        <WalletSelectorModal
          app={app}
          initialStep={initialStep}
          isOpen={showWalletSelector}
          onDismiss={() => setShowWalletSelector(false)}
        />
        {children}
      </WalletKitContext.Provider>
    </SolanaProvider>
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
