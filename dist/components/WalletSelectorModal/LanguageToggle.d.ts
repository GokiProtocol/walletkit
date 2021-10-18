import React from "react";
import type { LangOption } from "../../types";
interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    langOption?: LangOption;
}
export declare const LanguageToggle: React.FC<Props>;
export declare const BottomArea: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export {};
//# sourceMappingURL=LanguageToggle.d.ts.map