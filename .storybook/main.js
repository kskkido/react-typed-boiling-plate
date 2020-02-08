const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../app/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
        tsDocgenLoaderOptions: {
          tsconfigPath: path.resolve(__dirname, './tsconfig.json'),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false, // disables built-in colors in logger messages
        },
        include: [path.resolve(__dirname, '../app')],
      },
    },
  ],
  webpackFinal: async config => {
    // do mutation to the config
    config.module.rules.find(
      rule => rule.test.toString() === '/\\.css$/',
    ).exclude = path.resolve(__dirname, '../app');
  
    config.module.rules.push({
      test: /\.css$/,
      include: path.resolve(__dirname, '../app'),
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: true,
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
      ],
    });

    config.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }));

    config.resolve.modules.push('app');
    return config;
  },
};
