"use strict";

const packageJson = require("./utils/packageJson");
const alphaVariables = require("./utils/alphaVariables");

/**
 * @type {import('./BuildConfig').Processor}
 */
const postProcessor = () => {
  packageJson.reset();
  alphaVariables.remove();
};

module.exports = postProcessor;
