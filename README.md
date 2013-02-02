# Change the styling of a pad

# Available Themes:

* normal
* terminal
* hacker
* cybergal
* monokai

Available Params
```
theme     = Name of the theme IE hacker or terminal
font      = Pad font color
bg        = Pad Background Color 
toolbar   = Toolbar Background color
sidebar   = Sidebar font color
sidebarBg = Sidebar Background color
```

# USAGE
To use add the params to your Pad URL IE

?theme=terminal

http://beta.etherpad.org/p/test?theme=terminal

![Alt text](http://i.imgur.com/ktoSFGh.png)

# CONTRIBUTING
See themes.js, use github.

# INSTALL
Install via the /admin/plugins UI in Etherpad Lite.

Requires Etherpad lite >= version 1.2.5  
The following can optionally be added to your settings.json:  

    "ep_themes":{  
      "default_theme": "hacker"  
    } 

