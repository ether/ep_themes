var eejs = require('ep_etherpad-lite/node/eejs');
var settings = require('ep_etherpad-lite/node/utils/Settings');
//console.log("WWUUU");

/*
exports.eejsBlock_timesliderEditbarRight = function (hook_name, args, cb) { 
  // args.content = eejs.require("ep_themes/templates/themes.ejs") + args.content;
  return cb();
}

exports.eejsBlock_timesliderTop = function (hook_name, args, cb) {
  // args.content = args.content + eejs.require("ep_themes/templates/themesForm.ejs");
  return cb();
}

exports.eejsBlock_timesliderStyles = function (hook_name, args, cb) {
  args.content = args.content + "<link rel='stylesheet' href='/static/plugins/ep_themes/static/css/diffview.css' type='text/css'>";
  return cb();
}
*/

exports.eejsBlock_timesliderBody = function (hook_name, args, cb) {
  args.content = args.content + "<script>"+eejs.require("ep_themes/static/js/themes.js") + "</script>";
  return cb();
};

exports.eejsBlock_body = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_themes/templates/scripts.ejs");
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