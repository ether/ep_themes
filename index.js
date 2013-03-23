var eejs = require('ep_etherpad-lite/node/eejs');
var settings = require('ep_etherpad-lite/node/utils/Settings');

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content = '<script src="../static/plugins/ep_themes/static/js/themes.js"></script>' + args.content;
  return cb();
};

exports.eejsBlock_mySettings_dropdowns = function(hook_name, args, cb){
  args.content = args.content + eejs.require("ep_themes/templates/themesMenu.ejs");
  return cb();
};

exports.clientVars = function(hook, context, callback){
  var defaultTheme;
  try {
    if (settings.ep_themes.default_theme){
        defaultTheme = settings.ep_themes.default_theme;
    }
  } catch (e){
    console.warn("ep_themes: a default theme can be set in settings.json");
    defaultTheme = "";
  }
  return callback({ "theme_default": defaultTheme });
};
