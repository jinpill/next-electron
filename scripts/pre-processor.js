"use strict";

const packageJson = require("./utils/packageJson");
const stagingVariables = require("./utils/stagingVariables");

/**
 * @type {import('./BuildConfig').Processor}
 */
const preProcessor = () => {
  packageJson.set();
  stagingVariables.create();
};

module.exports = preProcessor;
