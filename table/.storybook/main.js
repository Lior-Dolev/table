const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../src/**/*.story.tsx'],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.(ts|tsx)$/,
        use: [{ loader: require.resolve('awesome-typescript-loader') }],
      },
      {
        test: /\.js?$/,
        use: [{ loader: require.resolve('babel-loader') }],
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'less-loader',
        ],
      },
    );

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    );

    config.resolve.extensions.push('.ts', '.tsx', '.js');

    return config;
  },
};
