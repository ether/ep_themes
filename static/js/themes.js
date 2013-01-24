exports.themes = function(hook, context){

  if(!exports){
    var exports = {};
  }

  exports.themes = {
    init: function() {
      var themes    = exports.themes;
      var theme     = themes.getUrlVars()['theme'];
      var font      = themes.getUrlVars()['font'];
      var bg        = themes.getUrlVars()['bg'];
      var toolbar   = themes.getUrlVars()['toolbar'];
      var sidebar   = themes.getUrlVars()['sidebar'];
      var sidebarBg = themes.getUrlVars()['sidebarBg'];

      /* Themes config -- add more themes here*/
      if(theme){
        if(theme == "hack"){
          themes.setBgColor("#000");
          themes.setFontColor("#07C201");
          themes.setToolbarColor("#000");
          themes.setSideBarBgColor("#000");
          themes.setSideBarFontColor("#07C201");
        }
        if(theme == "blackAndWhite"){
          themes.setBgColor("#000");
          themes.setFontColor("#FFF");
          themes.setToolbarColor("#000");
          themes.setSideBarBgColor("#000");
          themes.setSideBarFontColor("#FFF");
        }
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
        themes.setSideBarBgColor(sidebar);
      }
      if(sidebarBg){
        themes.setSideBarFontColor(sidebarBg);
      }

    },

    setBgColor: function(color){
      $('iframe.[name="ace_outer"]').contents().find("#outerdocbody").css("background-color",color);
    },

    setFontColor: function(color){
      $('iframe.[name="ace_outer"]').contents().find('iframe').contents().find("#innerdocbody").css("color",color);
    },

    setToolbarColor: function(color){
      $('.toolbar').css("background",color);
      $('.toolbar').css("background-color",color);
    },

    setSideBarBgColor: function(color){
      $('iframe.[name="ace_outer"]').contents().find('#sidediv').css("background",color);
      $('iframe.[name="ace_outer"]').contents().find('#sidediv').css("background-color",color);
    },

    setSideBarFontColor: function(color){
      $('iframe.[name="ace_outer"]').contents().find('#sidedivinner').attr('style', 'color: '+color +' !important');
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
  exports.themes.init();
}
