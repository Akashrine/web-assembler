# Build Process

Optimizing your website assets and testing your design across different browsers is certainly not the most fun part of the design process. Luckily, it consists of repetitive tasks that can be automated with the right tools to improve your efficiency.

Every site should have a development version and a production version.

The development version has all the HTML, CSS, JS and image files that make up your site in a clean format that you are happy to work on.

A production version will take these files, minify them, concatenate / merge them and optimise files like images.

Before you start coding, you need to consider how to optimise and build the production version of your site. Setting up this workflow from the start prevents any nasty surprises at the end of the project and you can add tools into your workflow that speed up your development, doing the monotonous tasks for you.

The most popular tools for implementing a build process are [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/), both of which are command line tools.

## Gulp

Gulp is a build system that can improve how you develop websites by automating common tasks, such as compiling preprocessed CSS, minifying JavaScript and reloading the browser. Gulp is a fast and intuitive streaming build tool built on Node.js, its use of streams and code-over-configuration makes for a simpler and more intuitive build. . Check out their [website](http://gulpjs.com/) and [docs](https://github.com/gulpjs/gulp/tree/master/docs) to get started. If you're familiar with Grunt, it's similar, but has some advantages.

A basic gulp task might look like this.

```
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');

gulp.task('images', function(){
  return gulp.src('./src/images/**')
  .pipe(imagemin())
  .pipe(gulp.dest('./www/images'));
});

```

First, `gulp.src` sucks in a stream of files and gets them ready to be piped through whatever tasks made available. In this instance, gulp task run's all the files through `gulp-imagemin`, then outputting them to `www/images` folder using `gulp.dest`. To add additional processing (renaming, resizing, liveReloading, etc.), just tack on more pipes with tasks to run.

# Development Phases

During development, there are 3 particular commands that you'll use on a regular basis:

1. `gulp serve`,
2. `gulp build`,
3. and `gulp`.

## Phase 1 : Start a Local Preview Server

On the surface, this task starts a local HTTP server so you can view your site in a browser, but behind the scenes there are some extra tools at work.

### Live Reload

Live reload eliminates the traditional refresh dance of making a change in the editor, switching to the browser, hitting CTRL-R, and then waiting for the page to reload.
With Live Reload, you can make changes in your editor and see them take effect immediately in any browser with your site open.


### CSS Auto Prefixing

When targeting a range of browsers, you’ll need to use vendor prefixes to ensure you can use features in each of them. The build process runs the CSS through the autoprefixer which produces the final output

### Javascript Linting

### Compile CSS (Less/Sass)

## Phase 2 : Build a production version

You can build a production ready version of your site with the simple gulp command. This command runs some of the tasks we’ve seen already, with additional tasks aimed at making your site load faster and more efficiently.

### Copy dependencies

Use [main-bower-files](https://github.com/ck86/main-bower-files)

It grabs all production (main) files of your Bower packages defined in your project's bower.json and use them as your gulp src for your task.

`var mainBowerFiles = require('main-bower-files');`

This task grabs all production files, filters css/js/fonts and outputs them in the public folder `/www/` in their respective subfolders (css/js/fonts).

### Inject Bower Dependencies

Use [wiredep](https://github.com/taptapship/wiredep) is a neat little Node package that does one pretty awesome thing: it automatically wires up your Bower components to your HTML/(S)CSS based on dependencies (i.e. it automatically includes them in the correct order!).

```
var wiredep = require('wiredep');

gulp.task('bower', function () {
  wiredep({
    src: './src/footer.html',
    directory: './bower_componets/',
    bowerJson: require('./bower.json'),
  });
});
```

### Transforms



## Phase 3 : Test Web Site

### Testing accross Devices

Browser Sync helps you test your site across multiple devices. Any scrolls, taps, or keyboard presses will be shared across any connected browser.

BrowserSync also synchronizes clicks, form actions and your scroll position between browsers. You could open a couple of browsers on your desktop and another on an iPhone and then navigate the website. The links would be followed on all of them, and as you scroll down the page, the pages on all of the devices would scroll down (usually smoothly, too!). When you input text in a form, it would be entered in every window. And when you don’t want this behavior, you can turn it off.

## Phase 4 : Deploy Web Site
