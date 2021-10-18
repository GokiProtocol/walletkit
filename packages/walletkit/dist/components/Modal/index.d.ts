import React from "react";
export interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onDismiss: () => void;
    darkenOverlay?: boolean;
    onBack?: () => void;
    hideCloseButton?: boolean;
    hideSolanaLogo?: boolean;
}
export declare const Modal: React.FC<ModalProps>;
//# sourceMappingURL=index.d.ts.map