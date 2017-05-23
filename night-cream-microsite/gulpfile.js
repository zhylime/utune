/**
  @name FE Starter Kit
  @company MullenLowe Profero Beijing
  @author Lisa-Ann Bruney <lisa-ann.bruney@loweprofero.com>

  If this file is edited to add additional tools, 
  please make sure that the new tools do not 
  slow down the script performance for server loads, and tasks (jade, stylus, coffee etc) 
  time execution.

  Additional tools should be added as an option, as seen below beginning at ln 217
  "process.argv...". Please ask for help when unsure. See README.md for additional
  details.
**/
var express = require('express'),
app = express(),
server = null,
bs = null,
locals = {},
logger = require('morgan'),
fs = require('fs'),
path = require('path'),
gulp = require('gulp'),
babel = require('gulp-babel'),
coffee = require('gulp-coffee'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
stylus = require('gulp-stylus'),
jshint = require('gulp-jshint-classic'),
stylish = require('jshint-stylish'),
jade = require('gulp-jade'),
gutil = require('gulp-util'),
watch = require('node-watch'),
insert = require('gulp-insert'),
exec = require('child_process').exec,
rename = require('gulp-rename'),
pump = require('pump'),
changedFile = null,
featureEnabled = {},
inputArguments = [],
through = require('through2'),
imagemin = null,
sourcemaps = require('gulp-sourcemaps'),
defaultTasks = ['server', 'locale', 'watch-vendor', 'watch-all'],
spawn = require('child_process').spawn,
run = require('run-sequence'),
kouto = require('kouto-swiss'),
kss = require('gulp-kss'),
recursiveFolder = require('gulp-recursive-folder'),
packageJson = require('./package.json'),
nib = require('nib');
featureEnabled.lr = '';
featureEnabled.style = 'stylint';
featureEnabled.noserver = featureEnabled.maps = false;
featureEnabled.simpleWatch = true;

var merge = function(object1, object2) {
  for (var attrname in object2) object1[attrname] = object2[attrname];
  return object1;
};

var config = {
  styleguide: 'styleguide.html',
  home: 'index.html',
  firstPage: '404.html',
  busy: './bin/busy.json',
  language: 'en',
  build: __dirname + '/build/',
  jsFile: 'app.min.js',
  root: './',
  root2: '/',
  src: './src/',
  jsLang: 'coffee',
  host: 'http://127.0.0.1:5000',
  deployHost: '//host.uidev.proferochina.com',
  port: 5000,
  name: packageJson.name,
  header: '/* (c) '+packageJson.name+' v'+packageJson.version+' '+new Date()+' */'
};

var generateStyleguide = function() {
  changedFile = config.styleguide;
  run('sg');
};

var toggle = function(feature, featureEnabled, args) {
  if (featureEnabled) {
    if (args && args.name)
      gutil.log(gutil.colors.blue('..with ' + args.name +' enabled.'));
    return args && args.params ? feature(args.params) : feature();
  } 
  return through.obj(function(file, enc, cb) {
    cb(null, file);
  });
};

var swallowError = function(error) {
  console.log(error.toString());
  console.log("\007")
  this.emit('end');
};

var paths = {
  regex: {
    js: [config.src + 'js/helpers/_*.js', config.src + 'js/modules/_*.js'],
    coffee:
      [ config.src + 'coffee/helpers/_*.coffee', 
      config.src + 'coffee/modules/_menu.coffee', 
      config.src + 'coffee/modules/_*.coffee',
      config.src + 'coffee/modules/_doc-ready.coffee'],
    stylus: config.src + 'stylus/app*.styl',
    img: config.src + 'img/*',
    vendorJs: config.src + 'vendor/js/*.js',
    jade: config.src + 'jade/pages/**/*.jade',
    pages: config.src + 'jade/pages/*.jade'
  },
  src: {
    stylus: config.src + 'stylus/',
    coffee: config.src + 'coffee/',
    js: config.src + 'js/',
    vendorJs: config.src + 'vendor/js/',
    jade: config.src + 'jade/'
  },
  dest: {
    base: config.build,
    css: config.build + 'assets/css/',
    js: config.build + 'assets/js/',
    img: config.build + 'assets/img/',
    static: config.build + 'assets/'
  },
  pages: 'pages/',
  locale: config.src + 'locale/'+ config.language +'.json'
};

var printChanged = function(changedFile) {
  if (changedFile) {
    gutil.log(gutil.colors.blue(changedFile));
  }
};

var generalCallback = function(error, stdout, stderr) {
  printChanged(changedFile);

  if (error) {
    gutil.log(gutil.colors.red('exec error: ' + error));
  }
  if (changedFile != config.styleguide && defaultTasks.indexOf('stylint') > -1) {
    generateStyleguide(); 
  }

};

var getLocalePath = function() {
  var localePath = paths.locale;
  if (config._jadePath) {

    var fn = getSubDirectoryName(path.dirname(config._jadePath)),
    _path = config._jadePath;

    if (fn && !featureEnabled.setLang) {
      fs.stat(config.src + 'locale/'+ fn +'.json', function(err, stat) {

        if(err == null) {
    
          localePath = config.src + 'locale/'+ fn +'.json';
          
          gulp.src(_path)
            .pipe(jade({
              locals: merge({_root: config.root2}, getLocals(localePath)),
              pretty: true
            }))
            .on('error', swallowError)
            .pipe(rename(function (path) {
              path.dirname = fn;
            })).pipe(gulp.dest(paths.dest.base));
        } 
      });
    } 
  }
 
  return localePath;

};

var getLocals = function(p) {
  p = p || getLocalePath();
  locals = merge({'config': config}, require(p));
  return merge({'paths': paths}, locals);
};

var getPage = function(req){
  if (req.params[0].indexOf('home/') != -1) {
    req.params[0] = 'index';
  }
  var page = req.params[0];
  return page.replace('.html', '');
};

var contains = function(haystack, needle) {
  return haystack.indexOf(needle) > -1;
};

var stream = function(ls, task) {
  var error = false;

  ls.stdout.on('data', function (data) {
    gutil.log(''+data);
  });

  ls.stderr.on('data', function (data) {
    error = true;
    gutil.log(gutil.colors.red(''+data));
  });

  ls.on('close', function (code) {
    gutil.log(gutil.colors.yellow('Finished with code (1/error occurred, 0/no error): ' + code));
    if (!error && task) {
      ls = spawn('gulp', [task]);
      stream(ls);
    }
  });
};

process.argv.forEach(function (val, index, array) {
  var arg = '';
  switch(val) {
    case '-stylus': 
      featureEnabled.style = 'stylus';
    break;
    case '-js':
      config.jsLang = 'js';
    break;
    case '-lr':
      arg = val; 
      gutil.log('livereload/browser-sync...');
      featureEnabled.lr = 'lr';
    break;
    case '-img':
      imagemin = require('gulp-imagemin')
      arg = val; 
      defaultTasks.push('images');
    break;
    case '-maps':
      arg = val; 
      featureEnabled.maps = true;
    break;
    case '-con':
      arg = val;
      featureEnabled.noserver = true;
    break;
    case '-p':
      arg = val;
      locals.host = config.deployHost;
      featureEnabled.deploy = true;
    break;
    default:
      if (contains(val, '-f'))
        config.singleJade = true;
      if (contains(val, 'port='))
        config.port = parseInt(val.split('=')[1]);
      if (contains(val, 'lang=')) {
        featureEnabled.setLang = true;
        config.language = val.split('=')[1];
        paths.locale = config.src + 'locale/'+ config.language +'.json';

      }
    break;
  }
  if (index >= 2)
    inputArguments.push(arg);
});

gulp.task('images', function() {
  return gulp.src(paths.regex.img)
    .pipe(imagemin({optimizationLevel: 5 }))
    .pipe(gulp.dest(paths.dest.img));
});

gulp.task('stylus', function() {
    // console.time("Loading plugins"); 
    gulp.src(paths.regex.stylus)
    .pipe(stylus({
      use: [kouto()],
      // import:['nib'], // uncomment this and change above to [nib()] if prefer nib
      compress: true
    }))
    .on('error', swallowError)
    .pipe(toggle(insert.prepend, featureEnabled.deploy, {params: config.header, name: 'deploy - css header'}))
    .pipe(gulp.dest(paths.dest.css));
    // console.timeEnd("Loading plugins");
});

gulp.task('stylus-ok', function() {
  run('stylus');
  generateStyleguide();
});

gulp.task('sg', function() {
  gulp.src(paths.src.stylus + '**/*.styl')
    .pipe(kss({
      overview:  __dirname + '/src/stylus/styleguide.md',
      templateDirectory: __dirname + '/build/sg/template/'
    }))
    .pipe(gulp.dest(paths.dest.base + 'sg/'));
});

gulp.task('stylint', function() {
  ls = spawn('npm', ['run', 'stylint']);
  stream(ls, 'stylus-ok');
});

/* Jade */

var getSubDirectoryName = function(p) {
  var pos = p.indexOf(paths.pages);
  if (pos > -1) {
   p = p.substr(pos + paths.pages.length);
   gutil.log(gutil.colors.yellow(p));
   return p;
  } else {
    return false;
  }
};

var getJadePath = function() {
  var _path = config._jadePath || paths.regex.jade,
  file = process.argv[3];
  _path = config.singleJade ? paths.src.jade + paths.pages + file.split('=')[1] : _path;
  gutil.log(gutil.colors.yellow(_path));
  config._jadePath = _path;
  return _path;
};

gulp.task('jade', recursiveFolder({
  base: paths.src.jade + paths.pages 
  }, function(folderFound){
  return gulp.src(folderFound.path + '/*.jade')
    .pipe(jade({
      locals: merge({_root: config.root2}, getLocals()),
      pretty: true
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(paths.dest.base + '/' + folderFound.pathTarget));
}));

gulp.task('jade-one', function() {
  
  var _path = getJadePath(),
  directoryName = getSubDirectoryName(path.dirname(_path));

  gulp.src(_path)
    .pipe(jade({
      locals: merge({_root: config.root2}, getLocals()),
      pretty: true
    }))
    .on('error', swallowError)
    .pipe(rename(function (path) {
      if (directoryName) {
        path.dirname = directoryName;
      }
    }))
    .pipe(gulp.dest(paths.dest.base));
});

/* End Jade */

var unsetBusy = function() {
  setBusy('0');
};

var setBusy = function(busy) {
  fs.writeFile(config.busy, '{ "busy": "'+busy+'"}', function (err) {
    if (err)
      gutil.log(gutil.colors.red(err));
  });
};

var getBusy = function() {
  return require(config.busy).busy;
};

var reload = function(file) {
  if (file.indexOf('/' + config.firstPage) > -1) {
    bs.reload(paths.dest.base + config.home);
  }
  setTimeout(function() {
    if (bs && (getBusy() == '0')) {
      bs.reload(['*.css', '*.js']);
    }
    config._jadePath = null;
  }, 2000);
};

var initServerBase = function(ops) {
  ops = ops || featureEnabled;
  if (ops.lr && !bs) {
    bs = require('browser-sync')({
      logPrefix: config.name,
      logSnippet: false,
      port: 8080
    }); 
    app.use(require('connect-browser-sync')(bs));
    bs.watch(paths.dest.base + '**').on('change', reload);
    bs.reload();
  }

  app.use(logger('dev'));
  app.use(express.static(paths.dest.base));
  app.set('views', path.join(__dirname, paths.src.jade + paths.pages));
  app.set('view engine', 'jade');
  var render = function(req, res) {
    var page = getPage(req);
    var data = merge({page: page, _root: config.root2}, getLocals());
    res.render(page, data);
  };
  app.get('/*', function (req, res) {
    render(req, res);
  });
  app.post('/*', function (req, res) {
    render(req, res);
  });

  /* Handle errors */
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('index', merge(getLocals(), {
        message: err.message,
        error: err,
        _root: config.root2
    }));
  });
};

gulp.task('server', function(cb) {

  if (!featureEnabled.noserver) {

    gutil.log(gutil.colors.yellow('Starting server...'));
    config.port = process.env.PORT || config.port;

    var portOps = 'PORT=' + config.port, ls = null,
    spawnOps = [portOps, './node_modules/.bin/nodemon', './bin/www', '--ignore', 'build/', '--ignore', 'node_modules',  '--ignore', 'src/', featureEnabled.lr];

    if (config.port == 80) {
      ls = spawn('sudo', spawnOps);
    } else {
      process.env.PORT = config.port;
      ls = spawn('./node_modules/.bin/nodemon', spawnOps.slice(2));
    }
    stream(ls);
  } else {
    initServerBase();
  }

});

gulp.task('coffee', function() {
  return gulp.src(paths.regex.coffee) /* Use an array of files instead if need to concat in order. e.g gulp.src(['_file1.coffee', '_file2.coffee']) */
    .pipe(toggle(sourcemaps.init, featureEnabled.maps))
      .pipe(coffee({ bare: true })
        .on('error', swallowError))
      .pipe(toggle(uglify, featureEnabled.deploy, {name: 'deploy - uglifyjs'}))
      .pipe(concat(config.jsFile))
      .pipe(toggle(insert.prepend, featureEnabled.deploy, {params: config.header + '\n(function(){"use strict";', name: 'deploy - wrap prepend'}))
      .pipe(toggle(insert.append, featureEnabled.deploy, {params: '\n})();', name: 'deploy - wrap append'}))
    .pipe(toggle(sourcemaps.write, featureEnabled.maps, {params: '../maps', name: 'source maps'}))
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('js', function() {
  return gulp.src(paths.regex.js)
    .pipe(toggle(sourcemaps.init, featureEnabled.maps))
    .pipe(jshint({ 
      unused: true, 
      camelcase: true,
      esnext: true,
      indent: 2, 
      globals: ['$']
    }))
    .pipe(jshint.reporter(stylish))
    // .pipe(jshint.reporter('fail'))
    .on('error', swallowError)
    .pipe(babel({
      presets: ['es2015']
    }))
    .on('error', gutil.log)
    .pipe(toggle(uglify, featureEnabled.deploy, {name: 'deploy - uglifyjs'}))
    .pipe(concat(config.jsFile))
    .pipe(toggle(insert.prepend, featureEnabled.deploy, {params: config.header + '\n(function(){"use strict";', name: 'deploy - wrap prepend'}))
    .pipe(toggle(insert.append, featureEnabled.deploy, {params: '\n})();', name: 'deploy - wrap append'}))
    .pipe(toggle(sourcemaps.write, featureEnabled.maps, {params: '../maps', name: 'source maps'}))
    .pipe(gulp.dest(paths.dest.js));
});

gulp.task('vendor-js', function (cb) {
  pump([
    gulp.src(paths.regex.vendorJs),
    concat('vendor.min.js'),
    uglify(),
    gulp.dest(paths.dest.js)], cb
  );
});

gulp.task('watch-vendor', function() {
  watch(paths.src.vendorJs, function(file) {
    changedFile = file;
    unsetBusy();
    gulp.start('vendor-js');
  });
});

gulp.task('watch-all', function() {
  watch(paths.src.jade, function(file) {
    printChanged(file);
    var task = 'jade';
    if (file.match('/_')) {
      setBusy('1');
      config._jadePath = paths.regex.jade;
    } else {
      unsetBusy();
      task = 'jade-one';
      config._jadePath = config.root + file;
    }
    gulp.start(task);
  });
  watch(paths.src.stylus, function(file) {
    printChanged(file);
    unsetBusy();
    gulp.start([featureEnabled.style]);
  });
  watch(paths.src[config.jsLang], function(file) {
    changedFile = file;
    unsetBusy();
    gulp.start([config.jsLang]);
  });
});

gulp.task('locale', function() {
  watch(paths.locale, function(file) {
    printChanged(file);
    ls = spawn('gulp', ['jade']);
    stream(ls);
  });
});

gulp.task('default', defaultTasks);

unsetBusy();

app.init = initServerBase;
module.exports = app;