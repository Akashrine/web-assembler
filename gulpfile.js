'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var del = require('del');
var _ = require('lodash');
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');
var wiredep = require('wiredep').stream;

// Load build configuration
//var config = _.merge(
//  yaml.load('src/config/assets.yml')
//  yaml.load('src/config/site.yml')
//);

var assets = require('src/config/assets.json');
var site = require('src/config/site.json');
var config = _.merge( assets, site );

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var THEME = config.themesPath + "/" + config.theme + "/";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Set NODE_ENV to 'test'
gulp.task('env:test', function () {
  process.env.NODE_ENV = 'test';
});

// Set NODE_ENV to 'development'
gulp.task('env:dev', function () {
  process.env.NODE_ENV = 'development';
});

// Set NODE_ENV to 'production'
gulp.task('env:prod', function () {
  process.env.NODE_ENV = 'production';
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Clean Output Directory
gulp.task('clean', del.bind(null, ['*', '!.git'], {dot: true, cwd: config.dist}));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('browser-sync', function () {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // watch the following files; changes will be injected (css & images) or cause browser to refresh
    files: [config.dist + '/**/*.*'],

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google chrome']
  });
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Copy all bower files preserving folder structure
gulp.task('bowercopy', function () {
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
  .pipe(gulp.dest(config.dist + "/assets/lib"));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// inject bower components
gulp.task('wiredep', function () {

  gulp.src(config.client.views, {base: THEME, cwd: THEME})
  .pipe(wiredep({
    ignorePath: /^(.*)\/bower_components\//,
    fileTypes: {
      hbs: {
        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
        detect: {
          js: /<script.*src=['"]([^'"]+)/gi,
          css: /<link.*href=['"]([^'"]+)/gi
        },
        replace: {
          js: '<script src="assets/lib/{{filePath}}"></script>',
          css: '<link rel="stylesheet" href="assets/lib/{{filePath}}" />'
        }
      },
      html: {
        replace: {
          js: '<script src="assets/lib/{{filePath}}"></script>',
          css: '<link rel="stylesheet" href="assets/lib/{{filePath}}" />'
        }
      }
    }
  }))
  .pipe(gulp.dest(THEME));

  gulp.src(config.server.views, {base: config.modulesPath})
  .pipe(wiredep({
    ignorePath: /^(.*)\/bower_components\//,
    fileTypes: {
      hbs: {
        block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
        detect: {
          js: /<script.*src=['"]([^'"]+)/gi,
          css: /<link.*href=['"]([^'"]+)/gi
        },
        replace: {
          js: '<script src="assets/lib/{{filePath}}"></script>',
          css: '<link rel="stylesheet" href="assets/lib/{{filePath}}" />'
        }
      },
      html: {
        replace: {
          js: '<script src="assets/lib/{{filePath}}"></script>',
          css: '<link rel="stylesheet" href="assets/lib/{{filePath}}" />'
        }
      }
    }
  }))
  .pipe(gulp.dest(config.modulesPath));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Copy all theme assets
gulp.task('copy-theme', function () {
  return gulp.src(config.client.assets, { dot: true, base: THEME, cwd: THEME})
  .pipe(gulp.dest(config.dist))
  .pipe($.size({title: 'copy-theme'}));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Copy all app assets
gulp.task('copy', function () {
  return gulp.src(config.server.assets, { dot: true, base: config.modulesPath})
  .pipe(gulp.dest(config.dist + "/app"))
  .pipe($.size({title: 'copy'}));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// CSS linting for theme task
gulp.task('csslint-theme', function (done) {
  return gulp.src(config.client.css, { dot: true, base: THEME, cwd: THEME })
  .pipe(browserSync.reload({stream: true, once: true}))
  .pipe($.csslint('.csslintrc'))
  .pipe($.csslint.reporter());
});

// CSS linting app task
gulp.task('csslint', function (done) {
  return gulp.src(config.server.css, { dot: true, base: config.modulesPath })
  .pipe(browserSync.reload({stream: true, once: true}))
  .pipe($.csslint('.csslintrc'))
  .pipe($.csslint.reporter());
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// JS linting theme task
gulp.task('jshint-theme', function () {
  return gulp.src(config.client.js, { dot: true, base: THEME, cwd: THEME })
  .pipe(browserSync.reload({stream: true, once: true}))
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// JS linting app task
gulp.task('jshint', function () {
  return gulp.src(config.server.serverjs, { dot: true, base: config.modulesPath })
  .pipe(browserSync.reload({stream: true, once: true}))
  .pipe($.jshint())
  .pipe($.jshint.reporter('jshint-stylish'))
  .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Sass task
gulp.task('sass-theme', function () {
  return gulp.src(config.client.sass, { dot: true, base: THEME, cwd: THEME })
  .pipe($.sass())
  .pipe($.rename(function (path) {
    path.dirname = path.dirname.replace('/scss', '/css');
  }))
  .pipe(gulp.dest(config.dist + "/assets/"));
});

gulp.task('sass', function () {
  return gulp.src(config.server.sass, { dot: true, base: config.modulesPath })
  .pipe($.sass())
  .pipe($.rename(function (path) {
    path.dirname = path.dirname.replace('/scss', '/css');
  }))
  .pipe(gulp.dest(config.dist + "/app/"));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Less task
gulp.task('less-theme', function () {
  return gulp.src(config.client.less, { dot: true, base: THEME, cwd: THEME })
  .pipe($.debug({verbose:true}))
  .pipe($.less({
    paths: ['assets/less']
  }))
  .pipe($.rename(function (path) {
    path.dirname = path.dirname.replace('/less', '/css');
  }))
  .pipe($.debug({verbose:true}))
  .pipe(gulp.dest(config.dist));
});

// Less task
gulp.task('less', function () {
  return gulp.src(config.server.less, { dot: true, base: config.modulesPath })
  .pipe($.less({
    paths: ['assets/less']
  }))
  .pipe($.rename(function (path) {
    path.dirname = path.dirname.replace('/less', '/css');
  }))
  .pipe(gulp.dest(config.dist + "/app/"));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  return gulp.src(config.dist)
  .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
  // Minify Styles
  .pipe($.if('*.css', $.csso()))
  .pipe(gulp.dest(config.dist))
  .pipe($.size({title: 'styles'}));
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

gulp.task('nodemon', function (cb) {
  var called = false;
  return $.nodemon({
    // nodemon our expressjs server
    script: 'server.js',
    // watch core server file(s) that require server restart on change
    ext: 'js,html',
    watch: _.union(config.server.views, config.server.serverjs)
  })
  .on('start', function onStart() {
    // ensure start only got called once
    if (!called) { cb(); }
    called = true;
  })
  .on('restart', function onRestart() {
    // reload connected browsers after a slight delay
    setTimeout(function reload() {
      browserSync.reload({
        stream: false   //
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

// Run the project in development mode
gulp.task('default', ['clean'], function(done) {
  runSequence(
    'wiredep',
    'csslint-theme',
    'csslint',
    'jshint-theme',
    'jshint',
    'sass-theme',
    'sass',
    'less-theme',
    'less',
    'bowercopy',
    'copy-theme',
    'copy',
    'styles',
    done
  );
});
