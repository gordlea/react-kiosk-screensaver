/* eslint-disable func-names */
// console.log('loaded:', __filename);
module.exports = {
  babelrcRoots: [
    // Keep the root as a root
    ".",
],
  plugins: [
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      [
          '@babel/plugin-transform-runtime',
          {
              corejs: 3,
          }
      ],
  ],
  presets: [
      [ '@babel/preset-react', { development: true }],
      [ '@babel/preset-env', { modules: false, useBuiltIns: false }],
      "@linaria/babel-preset",
  ],
  env: {
      test: {
          presets: [
              [ '@babel/preset-env', {
                  modules: 'commonjs',
              }],
          ]
      },
      production: {
        presets: [
          ['@babel/preset-react', { development: false }]
        ]
      }
  }
};

