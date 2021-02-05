# Change the styling of a pad by clicking in Settings and selecting a style

# Available Themes:

* normal
* terminal
* hacker
* cybergal
* monokai
* ... Please add more! :)

## Available URL Params
```
theme     = Name of the theme IE hacker or terminal IE ?theme=hacker
```

# Usage
To use add the params to your Pad URL IE

``?theme=terminal``

http://beta.etherpad.org/p/test?theme=terminal

![Screenshot](https://user-images.githubusercontent.com/220864/107029089-61ebaf80-67a6-11eb-8802-382e7588a10f.PNG)

# CONTRIBUTING
To add more themes send a pull request with your deisgns.  Examples for how to do this are in themes.js and it should be easy to test with
```
themes.setTheme('#000', '#07C201', '#07C201', '#07C201', '#07C201', '#000', '#000');
// replace with your colors :)
```

# INSTALL
Install via the /admin/plugins UI in Etherpad.

Requires Etherpad >= version 1.7.6
The following can optionally be added to your settings.json:  

    "ep_themes":{  
      "default_theme": "hacker"  
    } 

