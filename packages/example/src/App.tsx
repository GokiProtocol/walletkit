import logo from "./logo.svg";
import "./App.css";
import {
  ConnectWalletButton,
  WalletKitProvider,
} from "@gokiprotocol/walletkit";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <WalletKitProvider
          app={{
            name: "My App",
          }}
        >
          <ConnectWalletButton />
        </WalletKitProvider>
      </header>
    </div>
  );
}

export default App;
