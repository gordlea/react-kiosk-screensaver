module.exports = {
  "stories": [
    "../src/**/*.stories.js",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules[0].use.push({
      loader: require.resolve('@linaria/webpack4-loader'),
      options: {
        sourceMap: configType !== 'production',
      },
    })

    // Return the altered config
    return config;
  }
}
