'use strict';
/* global themes */
exports.aceInitialized = (hook, context) => {
  themes.init();
};

// Apply the saved theme to the timeslider too. Without this hook the
// theme dropdown's selection persists in the cookie but /p/foo/timeslider
// always loads with the default theme (issue #68).
exports.postTimesliderInit = (hook, context) => {
  themes.init();
};
