import type { WalletProviderInfo } from "@saberhq/use-solana";
import { WalletType } from "@saberhq/use-solana";
import React from "react";
export interface ProviderInfo {
    type: WalletType;
    info: WalletProviderInfo;
    mustInstall: boolean;
}
interface Props {
    onSelect?: (info: ProviderInfo) => void;
    onInstall?: (info: WalletProviderInfo) => void;
}
export declare const WalletStepSelect: React.FC<Props>;
export {};
//# sourceMappingURL=index.d.ts.map