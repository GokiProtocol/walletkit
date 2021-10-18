import React from "react";
import type { WalletKitArgs } from "../../types";
import type { ModalProps } from "../Modal";
declare type Props = Omit<ModalProps, "children"> & WalletKitArgs;
export declare enum ModalStep {
    Intro = "intro",
    Select = "select",
    Redirect = "redirect",
    Connecting = "connecting",
    LedgerAdvanced = "ledger-advanced"
}
export declare const WalletSelectorModal: React.FC<Props>;
export {};
//# sourceMappingURL=index.d.ts.map