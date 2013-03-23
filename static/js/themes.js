var themes = {
  init: function() {
    var theme     = themes.getUrlVars()['theme'];
    var font      = themes.getUrlVars()['font'];
    var bg        = themes.getUrlVars()['bg'];
    var toolbar   = themes.getUrlVars()['toolbar'];
    var sidebar   = themes.getUrlVars()['sidebar'];
    var sidebarBg = themes.getUrlVars()['sidebarBg'];

    var padcookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;

    if(!theme){
      /* Set theme from cookie if it exists */
      if (padcookie.getPref('themeName')) {
        theme = padcookie.getPref('themeName');
      } else {
        /* Set default theme if it exists */
        if (clientVars.theme_default) {
          theme = clientVars.theme_default;
        }
      }
    }

    /* Themes config -- add more themes here*/
    if(theme){
      if(theme == "normal"){
        themes.setBgColor("#FFF");
        themes.setFontColor("#000");
        themes.setToolbarColor("#F7F7F7");
        themes.setSideBarBgColor("#F7F7F7");
        themes.setSideBarFontColor("#888");
      }
       if(theme == "hacker"){
        themes.setBgColor("#000");
        themes.setFontColor("#07C201");
        themes.setToolbarColor("#000");
        themes.setSideBarBgColor("#000");
        themes.setSideBarFontColor("#07C201");
      }
      if(theme == "terminal"){
        themes.setBgColor("#000");
        themes.setFontColor("#FFF");
        themes.setToolbarColor("#000");
        themes.setSideBarBgColor("#000");
        themes.setSideBarFontColor("#FFF");
      }
      if(theme == "cybergal"){
        themes.setBgColor("#000");
        themes.setFontColor("#FF1493");
        themes.setToolbarColor("#000");
        themes.setSideBarBgColor("#000");
        themes.setSideBarFontColor("#FF1493");
      }
      if(theme == "monokai"){
        themes.setBgColor("#272822");
        themes.setFontColor("#FFF");
        themes.setToolbarColor("#272822");
        themes.setSideBarBgColor("#272822");
        themes.setSideBarFontColor("#FFF");
      }
      padcookie.setPref('themeName', theme);
    }
    if(font){
      themes.setFontColor(font);
    }
    if(bg){
      themes.setBgColor(bg);
    }
    if(toolbar){
      themes.setToolbarColor(toolbar);
    }
    if(sidebar){
      themes.setSideBarFontColor(sidebar);
    }
    if(sidebarBg){
      themes.setSideBarBgColor(sidebarBg);
    }

  },

  setBgColor: function(color){
    $('iframe[name="ace_outer"]').contents().find("#outerdocbody").css("background-color",color);
  },

  setFontColor: function(color){
    $('iframe[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").css("color",color);
  },

  setToolbarColor: function(color){
    $('.toolbar').css("background",color);
    $('.toolbar').css("background-color",color);
  },

  setSideBarBgColor: function(color){
    $('iframe[name="ace_outer"]').contents().find('#sidediv').css("background",color);
    $('iframe[name="ace_outer"]').contents().find('#sidediv').css("background-color",color);
  },

  setSideBarFontColor: function(color){
    $('iframe[name="ace_outer"]').contents().find('#sidedivinner').attr('style', 'color: '+color +' !important');
  },

  // Read a page's GET URL variables and return them as an associative array.
  getUrlVars: function() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }
}
