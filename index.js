'use strict';

const eejs = require('ep_etherpad-lite/node/eejs');
const settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_scripts = (hookName, args, cb) => {
  // `defer` so the script runs after the DOM has been parsed — themes.js
  // reads `document.body` at its top level, and without `defer` that's
  // `null` (scripts in <head> execute synchronously before <body> is
  // constructed), which threw `TypeError: Cannot read properties of null`
  // and prevented the pad editor iframe from ever initialising. See #93.
  args.content = `
      <script defer src="../static/plugins/ep_themes/static/js/themes.js"></script>${args.content}`;
  cb();
};

// Inject the same script into the timeslider page so themes apply there too.
// Without this, /p/foo/timeslider always renders with the default theme even
// if the pad is set to (and persists) a different one (issue #68).
exports.eejsBlock_timesliderScripts = (hookName, args, cb) => {
  args.content = `
      <script defer src="../../static/plugins/ep_themes/static/js/themes.js"></script>${args.content}`;
  cb();
};

exports.eejsBlock_mySettings_dropdowns = (hookName, args, cb) => {
  args.content += eejs.require('ep_themes/templates/themesMenu.ejs');
  cb();
};

exports.clientVars = (hook, context, callback) => {
  let defaultTheme;
  try {
    if (settings.ep_themes.default_theme) {
      defaultTheme = settings.ep_themes.default_theme;
    }
  } catch (e) {
    console.warn('ep_themes: a default theme can be set in settings.json');
    defaultTheme = '';
  }
  callback({theme_default: defaultTheme});
};
