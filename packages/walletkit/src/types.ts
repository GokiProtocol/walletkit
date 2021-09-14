import type React from "react";

import type { ModalStep } from "./components/WalletSelectorModal";

export interface WalletKitArgs {
  app: {
    name: string;
    icon?: React.ReactNode;
  };
  initialStep?: ModalStep;
  onError?: (err: Error) => void;
}
