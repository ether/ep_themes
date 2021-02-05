'use strict';

const eejs = require('ep_etherpad-lite/node/eejs');
const settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_scripts = (hookName, args, cb) => {
  args.content = `
      <script src="../static/plugins/ep_themes/static/js/themes.js"></script>${args.content}`;
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
