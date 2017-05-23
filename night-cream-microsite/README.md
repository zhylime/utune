Night Cream Microsite
=================
This repositiory is to be used as starter kit for FE projects, so coding standards, workflow, and codebase is as normalized as possible.

Global Dev Requirements
-------------
  * npm (http://nodejs.org/)
  * gulp
  * uglifyjs
  * stylint
  * nodemon

Install
-------------
First install all global requirements if not already on system

```
npm install -g gulp uglifyjs stylint
cd night-cream-microsite
npm install
npm install nodemon@1.3.7
```

Run
-------------

```
cd night-cream-microsite

gulp # defaults with port 5000
```

Options
-------------
There are some options that can be enabled when running `gulp`:  
- `-lr`   # to enable live reloading with browser-sync  
- `-img`  # enable `gulp-imagemin`; The source images will then be loaded from the directory `src\img`. So make sure you have created that directory if you enable this option.  
- `-maps` # enable sourcemaps    
- `-port=#` # change the server port #; default is 5000    
- `-p`    # app js will not be minified by default, add this option for production/live env  
- `-js`   # Use this option if you are importing an old project for which classic JS (src/js) is used instead of CoffeeScript. For the sake of organisation, a project cannot use both JS and CoffeeScript. If this is a new project, please only use CoffeeScript (src/coffee).

Examples
```
gulp -maps
gulp -lr -img
gulp coffee -p # minifiy the JS build for production
```

Deploy
-------------
You can deploy this to http://loweproferotech.bitbucket.org/bb-felab/ by running:
```
npm run deploy
```
You must set up (_)deploy.sh from the https://bitbucket.org/loweproferotech/loweproferotech.bitbucket.org repo.  
If you downloaded _deploy.sh, change vars to:
```
projectName=bb-felab
repo=https://{username}@bitbucket.org/loweproferotech/loweproferotech.bitbucket.org.git
## set username OR use git@bitbucket.org:loweproferotech/loweproferotech.bitbucket.org.git as repo url
```

HTTPS
-------------
SSL is available. Start the project on PORT 80 with:
```
npm start # enter your password and browse https://localhost
```

Styleguide
-------------
Stylus files need to be documented so that the style guide can be automatically generated. 
```
gulp sg # generates updated style guide
```

Git Standards
--------------
- Please use proper commit message being consistent with either the present or past tense. You may use the continuous tense in cases where you are committing to an unfinished feature.  
- A proper commit message must have a noun and a verb. A commit like "update" is not good. Instead "Update _carousel.styl header"  
- Fixed issues should have issue # in commit message  
- Do NOT merge anything to `master`  
  
Coding Standards
--------------
- Before you do anything else, please make sure you have read this document: [Design Pattern Overview](https://loweproferotech.atlassian.net/wiki/display/IL/Design+Pattern+Overview)  
- Use BEM for Stylus  
- 2 spaces as a tab for JS, CSS, CoffeeScript, Stylus, Jade  
- camelCase JS variable/function names  
- Utilize the DRY principle in your code; do not repeat the same code in multiple areas; use stylus & jade mixins, JS functions etc to keep code dry  
- CSS class/id names with dashed format: eg. .c-carousel, .ic-logo, #unique-element
- If the project must be ADA compliant, make sure that you set up landmarks from the very start    
- Do NOT use browserify and shim in the project. See vendor/README.md for details  
- Stylus files need to be documented so that the style guide can be automatically generated   
- Build reusable blocks and utilities; keep the markup meaningful  
```
<body>
  <div class="c-header">
    <div class="c-hero">...</div>
    <div class="c-nav" role="navigation" aria-label="Main navigation">
      <ul class="c-horizontal-list"></ul>
    </div>
  <div>
  <div class="c-main" role="main">
  <section class="c-article" aria-label="Article">
    <section class="c-breadcrumbs" aria-label="Breadcrumbs">
      <span class="l-inl-block ic-bread">
      <span class="l-inl-block meta">Home > Rules</span>
    </section>
    <section class="c-article-main" aria-label="Article main">...</section>
    <section class="c-article-footer" aria-label="Article footer">...</section>
  </section>
  </div>
  <div class="c-footer">
    <section class="c-footer-nav" role="navigation" aria-label="Footer Navigation"></section>
    <section class="c-copyright" role="contentinfo">....</section>
  </div>
</body>
```

Linters
------------
- Stylint: To enforce the best practices in CSS and stylus, stylint is used. See the rules in bin/config.stylintrc file. Find out what these options mean at [stylint github](https://github.com/rossPatton/stylint): 

Docs
------------
For details visit [FE Lab](https://loweproferotech.atlassian.net/wiki/display/IL/FE+Lab).
