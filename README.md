# walletkit 🔑

[![NPM](https://img.shields.io/npm/v/@gokiprotocol/walletkit)](https://www.npmjs.com/package/@gokiprotocol/walletkit)
[![License](https://img.shields.io/npm/l/@gokiprotocol/walletkit)](/LICENSE)

![Banner](/images/banner.png)

WalletKit is a React library that allows a Solana dApp to display a modal for connecting wallets.

It is intended to be used with [use-solana](https://github.com/saber-hq/saber-common/tree/master/packages/use-solana).

## Developing

### Adding a Wallet

To add a wallet, please add it to [use-solana](https://github.com/saber-hq/saber-common/tree/master/packages/use-solana).

`use-solana` supports wallet adapters from the official Solana wallet adapter library, so it may be as easy as adding a wallet to an array.

## Installation

```bash
yarn add @gokiprotocol/walletkit
```

## Usage

Check out the [example app](/packages/example) to understand how to use this library.

## Publishing

```
yarn lerna version --force-publish --no-git-tag-version

# This is important for updating yarn.lock!
yarn install

git tag vx.x.x
git push origin HEAD
git push origin vx.x.x
```

## License

GPL v3
