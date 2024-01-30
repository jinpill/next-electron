"use strict";

const packageJson = require("./utils/packageJson");
const alphaVariables = require("./utils/alphaVariables");

/**
 * @type {import('./BuildConfig').Processor}
 */
const preProcessor = () => {
  packageJson.set();
  alphaVariables.create();
};

module.exports = preProcessor;
