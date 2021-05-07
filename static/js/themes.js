'use strict';

const bodyStyles = window.getComputedStyle(document.body);
const normal = {};
normal.lightcolor = bodyStyles.getPropertyValue('--light-color');
normal.superdarkcolor = bodyStyles.getPropertyValue('--super-dark-color');
normal.darkcolor = bodyStyles.getPropertyValue('--dark-color');
normal.primarycolor = bodyStyles.getPropertyValue('--primary-color');
normal.middlecolor = bodyStyles.getPropertyValue('--middle-color');
normal.superlightcolor = bodyStyles.getPropertyValue('--super-light-color');
normal.textcolor = bodyStyles.getPropertyValue('--text-color');

const themes = {
  change: () => {
    themes.setThemeByName($('#themesmenu').val());
    const padcookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;
    padcookie.setPref('themeName', $('#themesmenu').val());
  },
  setTheme: (light, superDark, dark, primary, middle, text, superLight) => {
    document.body.style.setProperty('--light-color', light);
    document.body.style.setProperty('--super-dark-color', superDark);
    document.body.style.setProperty('--dark-color', dark);
    document.body.style.setProperty('--primary-color', primary);
    document.body.style.setProperty('--middle-color', middle);
    document.body.style.setProperty('--text-color', text);
    document.body.style.setProperty('--super-light-color', superLight);
    const $outerStyle = $('iframe[name="ace_outer"]').contents().find('body').get(0).style;
    $outerStyle.setProperty('--super-light-color', superLight);
    $outerStyle.setProperty('--super-dark-color', superDark);
    $outerStyle.setProperty('--light-color', light);
    $outerStyle.setProperty('--dark-color', dark);
    // $outerStyle.setProperty('--scrollbar-bg', superDark);
    // $outerStyle.setProperty('--scrollbar-bg', textcolor);
    const $innerStyle = $('iframe[name="ace_outer"]').contents().find('iframe')
        .contents().find('body').get(0).style;
    $innerStyle.setProperty('--super-dark-color', superDark);
  },
  init: () => {
    const padcookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;
    let theme = themes.getUrlVars().theme;

    if (!theme) {
      /* Set theme from cookie if it exists */
      if (padcookie.getPref('themeName')) {
        theme = padcookie.getPref('themeName');
      }
      /* Set default theme if it exists */
      if (!theme && clientVars.theme_default) {
        theme = clientVars.theme_default;
      }
    }

    /* Themes config -- add more themes here*/
    if (theme) {
      themes.setThemeByName(theme);
    }
  },
  setThemeByName: (theme) => {
    if (theme === 'normal') {
      themes.setTheme(
          normal.lightcolor,
          normal.superdarkcolor,
          normal.darkcolor,
          normal.primarycolor,
          normal.middlecolor,
          normal.textcolor,
          normal.superlightcolor
      );
    }
    if (theme === 'highcontrast') {
      themes.setTheme('#000', '#FFF', '#FFF', '#FFF', '#FFF', '#000', '#000');
    }
    if (theme === 'hacker') {
      themes.setTheme('#000', '#07C201', '#07C201', '#07C201', '#07C201', '#000', '#000');
    }
    if (theme === 'terminal') {
      themes.setTheme(
          '#272822', '#07C201', '#07C201', '#07C201', '#07C201', '#272822', '#272822');
    }
    if (theme === 'cybergal') {
      themes.setTheme('#000', '#FF1493', '#FF1493', '#FF1493', '#FF1493', '#000', '#000');
    }
    if (theme === 'monokai') {
      themes.setTheme('#272822', '#FFF', '#FFF', '#FFF', '#FFF', '#272822', '#272822');
    }
    if (theme === 'unicorn') {
      themes.setTheme('#8C1A6A', '#AAFFE5', '#5AFF15', '#A657AE', '#A657AE', '#9D75CB', '#8C1A6A');
    }
  },
  // Read a page's GET URL variables and return them as an associative array.
  getUrlVars: () => {
    const vars = []; let
      hash;
    const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (let i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
};
