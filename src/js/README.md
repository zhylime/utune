FE Lab > JS Sources
=================

Instructions
-------------

- Do not attach plugins via class/id name, use a standard attribute like data-js-plugin-name
```
// jade
a(data-js-plugin-name="foo").btn-next

// js
$('[data-js-plugin-name]').PluginName();
```
- Use js- selector names to show that certain elements have JS behaviour attached  
``` 
// jade
a.js-btn.btn-next

// js
$('.js-btn').on('click', function(){
  console.log('Hello world.');
});
```

- Long functions should be split into bite sizes

[Documentation](https://loweproferotech.atlassian.net/wiki/display/IL/The+JavaScript+Standard)