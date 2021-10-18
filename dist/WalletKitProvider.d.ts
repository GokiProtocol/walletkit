import type { UseSolanaArgs } from "@saberhq/use-solana";
import React from "react";
import type { LangOption, WalletKitArgs } from "./types";
export interface WalletKit {
    connect: () => void;
}
interface Props extends WalletKitArgs, UseSolanaArgs {
    langOption?: LangOption;
    children: React.ReactNode;
}
export declare const WalletKitProvider: React.FC<Props>;
/**
 * Returns a function which shows the wallet selector modal.
 */
export declare const useWalletKit: () => WalletKit;
export {};
//# sourceMappingURL=WalletKitProvider.d.ts.map