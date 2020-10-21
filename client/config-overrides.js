// take a look at this link https://dev.to/aryclenio/part-3-setting-up-a-template-with-react-app-rewired-3e9j
// It explains the use and importance of react-app-rewired
// config-overrides.js exports the settings in which will be overwritten.
const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewirePolyfills = require('react-app-rewire-polyfills');

module.exports = compose(rewirePolyfills, rewireEslint);
