# `@gokiprotocol/walletkit`

WalletKit is a React library that allows a Solana dApp to display a modal for connecting wallets.

## Common questions

### My modal is behind something else. How do I fix this?

You can change the z-index of the modal like so:

```
[data-reach-dialog-overlay] {
  z-index: 9999999;
}
```
