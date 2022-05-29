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
            src="https://goki.so/assets/android-chrome-256x256.png"
            alt="icon"
          />
        ),
      }}
      debugMode={true} // you may want to set this in REACT_APP_DEBUG_MODE
    >
      <Body />
    </WalletKitProvider>
  );
};

export default App;
