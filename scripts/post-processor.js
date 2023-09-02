"use strict";

const packageJson = require("./utils/packageJson");
const stagingVariables = require("./utils/stagingVariables");

/**
 * @type {import('./BuildConfig').Processor}
 */
const postProcessor = () => {
  packageJson.reset();
  stagingVariables.remove();
};

module.exports = postProcessor;
