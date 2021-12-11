const { setup: setupDevServer } = require('jest-dev-server')

module.exports = async function globalSetup() {
  await setupDevServer({
    command: `yarn serve --listen 3024 ./.storybook/assets`,
    protocol: 'http',
    port: 3024,
  })
  // Your global setup
}