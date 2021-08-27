import "./App.css";

import { css } from "@emotion/react";
import {
  ConnectWalletButton,
  WalletKitProvider,
} from "@gokiprotocol/walletkit";

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
    <div className="App">
      <header className="App-header">
        <h1
          css={css`
            font-size: 108px;
            ${breakpoints.mobile} {
              font-size: 64px;
            }
            margin: 0;
          `}
        >
          WalletKit
        </h1>
        <p
          css={css`
            margin: 0;
            margin-bottom: 48px;
          `}
        >
          A wallet connector for Solana dApps.
        </p>
        <WalletKitProvider
          app={{
            name: "My App",
          }}
        >
          <ConnectWalletButton />
        </WalletKitProvider>
        <p
          css={css`
            margin-top: 48px;
            font-size: 20px;
          `}
        >
          Powered by Goki
        </p>
      </header>
    </div>
  );
};

export default App;
