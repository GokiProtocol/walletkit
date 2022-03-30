const webpack = require("webpack");

module.exports = {
  babel: {
    presets: [
      [
        "@babel/preset-react",
        { runtime: "automatic", importSource: "@emotion/react" },
      ],
    ],
    plugins: ["@emotion/babel-plugin"],
  },
  eslint: {
    enable: false,
  },
  typescript: { enableTypeChecking: false },
  webpack: {
    configure: (config) => {
      config.resolve.fallback = {...config.resolve.fallback,...{
          process: require.resolve("process/browser"),
          stream: require.resolve("stream-browserify"),
        } };

      config.plugins.unshift(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        })
      );

      config.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      });

      // solana wallet adapter, ledger need to be transpiled
      config.module.rules.push({
        test: /\.js/,
        loader: require.resolve("babel-loader"),
        exclude: (file) =>
          !file.includes("@solana/wallet-adapter") &&
          !file.includes("@ledgerhq/devices") &&
          !file.includes("@saberhq/use-solana"),
      });
      console.log("CONFIG", config)
      return config;
    },
  },
};
