import type React from "react";

import type { ModalStep } from "./components/WalletSelectorModal";

export interface WalletKitArgs {
  /**
   * Information about the current application.
   */
  app: {
    /**
     * The name of the application.
     */
    name: string;
    /**
     * The icon of the application.
     */
    icon?: React.ReactNode;
  };
  /**
   * The initial step to display in the wallet connector modal.
   *
   * If you do not want to show the intro screen, use ModalStep.Select.
   */
  initialStep?: ModalStep;
  /**
   * Called when an error occurs.
   */
  onWalletKitError?: (err: Error) => void;
}
