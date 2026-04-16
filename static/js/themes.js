'use strict';

// Read/write the same cookie that ep_etherpad-lite's pad_cookie module manages.
// We can't `require('ep_etherpad-lite/static/js/pad_cookie')` from the plugin
// any more — Etherpad 2.x bundles its frontend with esbuild and no longer
// exposes a global `require()` in the page. So we talk to the cookie directly
// using the same name and JSON encoding that pad_cookie uses, which keeps the
// theme preference in sync with the rest of Etherpad's per-pad prefs.
const padPrefs = {
  cookieName_: () => {
    const prefix = (window.clientVars && window.clientVars.cookiePrefix) || '';
    return prefix + (window.location.protocol === 'https:' ? 'prefs' : 'prefsHttp');
  },
  read_: () => {
    try {
      const name = padPrefs.cookieName_();
      const raw = (document.cookie || '').split('; ')
          .find((row) => row.startsWith(`${name}=`));
      if (!raw) return {};
      const json = decodeURIComponent(raw.slice(name.length + 1));
      return JSON.parse(json) || {};
    } catch (e) {
      return {};
    }
  },
  write_: (prefs) => {
    const name = padPrefs.cookieName_();
    const value = encodeURIComponent(JSON.stringify(prefs));
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    const secure = window.location.protocol === 'https:' ? '; secure' : '';
    document.cookie = `${name}=${value}; expires=${expires}; path=/; samesite=lax${secure}`;
  },
  getPref: (key) => padPrefs.read_()[key],
  setPref: (key, value) => {
    const prefs = padPrefs.read_();
    prefs[key] = value;
    padPrefs.write_(prefs);
  },
};

// Captured lazily on first read so that loading themes.js from a <head>
// script (the timeslider page does this) doesn't crash on a missing
// document.body. The plugin's hooks fire after the editor is ready, so by
// the time we actually need these values the body exists.
let normal = null;
const captureNormal = () => {
  if (normal) return normal;
  if (!document.body) return null;
  const bodyStyles = window.getComputedStyle(document.body);
  normal = {
    lightcolor: bodyStyles.getPropertyValue('--light-color'),
    superdarkcolor: bodyStyles.getPropertyValue('--super-dark-color'),
    darkcolor: bodyStyles.getPropertyValue('--dark-color'),
    primarycolor: bodyStyles.getPropertyValue('--primary-color'),
    middlecolor: bodyStyles.getPropertyValue('--middle-color'),
    superlightcolor: bodyStyles.getPropertyValue('--super-light-color'),
    textcolor: bodyStyles.getPropertyValue('--text-color'),
  };
  return normal;
};

const themes = {
  change: () => {
    const value = $('#themesmenu').val();
    themes.setThemeByName(value);
    padPrefs.setPref('themeName', value);
  },
  setTheme: (light, superDark, dark, primary, middle, text, superLight) => {
    document.body.style.setProperty('--light-color', light);
    document.body.style.setProperty('--super-dark-color', superDark);
    document.body.style.setProperty('--dark-color', dark);
    document.body.style.setProperty('--primary-color', primary);
    document.body.style.setProperty('--middle-color', middle);
    document.body.style.setProperty('--text-color', text);
    document.body.style.setProperty('--super-light-color', superLight);
    // The pad page nests the editor in two iframes (ace_outer > ace_inner)
    // and we need to apply the colour vars in each so styled regions inside
    // the editor pick them up. Timeslider has no iframes at all — render
    // happens directly in the body — so guard each access.
    const outerBody = $('iframe[name="ace_outer"]').contents().find('body').get(0);
    if (outerBody) {
      const $outerStyle = outerBody.style;
      $outerStyle.setProperty('--primary-color', primary);
      $outerStyle.setProperty('--super-light-color', superLight);
      $outerStyle.setProperty('--super-dark-color', superDark);
      $outerStyle.setProperty('--light-color', light);
      $outerStyle.setProperty('--dark-color', dark);
    }
    const innerBody = $('iframe[name="ace_outer"]').contents().find('iframe')
        .contents().find('body').get(0);
    if (innerBody) {
      const $innerStyle = innerBody.style;
      $innerStyle.setProperty('--super-dark-color', superDark);
      $innerStyle.setProperty('--primary-color', primary);
    }
  },
  init: () => {
    let theme = themes.getUrlVars().theme;

    if (!theme) {
      /* Set theme from cookie if it exists */
      const stored = padPrefs.getPref('themeName');
      if (stored) {
        theme = stored;
      }
      /* Set default theme if it exists */
      if (!theme && window.clientVars && window.clientVars.theme_default) {
        theme = window.clientVars.theme_default;
      }
    }

    /* Themes config -- add more themes here*/
    if (theme) {
      themes.setThemeByName(theme);
    }
  },
  setThemeByName: (theme) => {
    if (theme === 'normal') {
      const n = captureNormal();
      if (!n) return;
      themes.setTheme(
          n.lightcolor,
          n.superdarkcolor,
          n.darkcolor,
          n.primarycolor,
          n.middlecolor,
          n.textcolor,
          n.superlightcolor
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
    if (theme === 'toothwhite') {
      themes.setTheme('#FFF', '#000', '#000', '#000', '#000', '#FFF', '#FFF');
    }
    if (theme === 'yellow') {
      themes.setTheme('#000', '#FFF000', '#FFF000', '#F00', '#FFF000', '#000', '#000');
    }
    if (theme === 'bloody') {
      themes.setTheme('#000', '#F00', '#F00', '#F00', '#F00', '#000', '#000');
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

// In Etherpad 2.x the client_hooks dispatch path is broken (it uses a
// dynamic require which the bundled output doesn't support), so the
// aceInitialized / postTimesliderInit hooks in init.js never fire. We
// instead self-init from this script: wait until the DOM is ready, then
// for the regular pad, also wait until the editor iframes are mounted so
// setTheme has somewhere to apply the inner colour vars.
const themesAutoInit = () => {
  // Timeslider page has no ace_outer iframe — just init immediately.
  if (!document.querySelector('iframe[name="ace_outer"]')) {
    themes.init();
    return;
  }
  // Pad page — wait for the inner editor iframe to be loaded so the
  // outer/inner CSS-var assignments in setTheme actually land.
  let attempts = 0;
  const tick = () => {
    const outer = document.querySelector('iframe[name="ace_outer"]');
    const inner = outer && outer.contentDocument &&
        outer.contentDocument.querySelector('iframe');
    const innerBody = inner && inner.contentDocument && inner.contentDocument.body;
    if (innerBody || attempts++ > 100) {
      themes.init();
      return;
    }
    setTimeout(tick, 100);
  };
  tick();
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', themesAutoInit);
} else {
  themesAutoInit();
}
