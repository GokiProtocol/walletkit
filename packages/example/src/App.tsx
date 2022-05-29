import { css } from "@emotion/react";
import { WalletKitProvider } from "@gokiprotocol/walletkit";

import { Body } from "./Body";

export const BREAKPOINT_SIZES = [576, 780, 992, 1200] as const;

const maxMediaQueries = BREAKPOINT_SIZES.map(
  (bp) => `@media (max-width: ${bp}px)`
);

export const breakpoints = {
  mobile: maxMediaQueries[0],
  tablet: maxMediaQueries[1],
  medium: maxMediaQueries[2],
};

const App: React.FC = () => {
  return (
    <WalletKitProvider
      defaultNetwork="devnet"
      app={{
        name: "My App",
        icon: (
          <img
            css={css`
              width: 48px;
              height: 48px;
            `}
            src="https://goki.so/assets/android-chrome-256x256.png"
            alt="icon"
          />
        ),
      }}
      debugMode={false} // you may want to set this in REACT_APP_DEBUG_MODE
    >
      <Body />
    </WalletKitProvider>
  );
};

export default App;
