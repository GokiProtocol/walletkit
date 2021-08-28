import type React from "react";

export interface WalletKitArgs {
  app: {
    name: string;
    icon?: React.ReactNode;
  };
  onError?: (err: Error) => void;
}
