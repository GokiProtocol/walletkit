import type { WalletProviderInfo } from "@saberhq/use-solana";
import React from "react";
interface Props {
    info: WalletProviderInfo;
    onInstall?: (info: WalletProviderInfo) => void;
    onSelect?: () => void;
}
export declare const WalletProviderOption: React.FC<Props>;
export {};
//# sourceMappingURL=WalletProviderOption.d.ts.map