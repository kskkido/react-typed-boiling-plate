const { compose, tap } = require('ramda');

const setup = api => {
  api.cache(true);
};

const config = _ => ({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: false,
      },
    ],
    [
      '@babel/preset-react',  
    ]
  ],
  plugins: [],
});

module.exports = compose(
  config,
  tap(setup),
);
