## Dev Workflow

1. Link the `package/walletkit` using `yarn link`
2. In `package/walletkit` run `yarn build` (This will watch the ts files for changes and will also build it)
3. In `package/example` link this walletkit instead of installing it by `npm link @gokiprotocol/walletkit`
4. `yarn run` to get the example started running!
5. DEV

---

## Demo

![walletkit-multilang](https://user-images.githubusercontent.com/22261173/137582726-9e0478dd-3168-4006-b77b-bef67843a5a4.gif)


---

## TODO

1. Get a better fallback UI for suspense
2. Anything more?

---

## Source

# walletkit 🔑

[![NPM](https://img.shields.io/npm/v/@gokiprotocol/walletkit)](https://www.npmjs.com/package/@gokiprotocol/walletkit)
[![License](https://img.shields.io/npm/l/@gokiprotocol/walletkit)](/LICENSE)

WalletKit is a React library that allows a Solana dApp to display a modal for connecting wallets.

It is intended to be used with [use-solana](https://github.com/saber-hq/saber-common/tree/master/packages/use-solana).

## Installation

```bash
yarn add @gokiprotocol/walletkit
```
