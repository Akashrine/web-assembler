# Setup

If you're a developer or someone comfortable getting up and running from a `git clone`, this method is for you.
If you clone the GitHub repository, you will need to build a number of assets using [Gulp](http://gulpjs.com/).

`git clone git@github.com:phaneendra/web-assembler.git`

Once installed, run the following command and Gulp will build all the files you need in the target folder.

1. `npm install`
2. `bower install`
3. `gulp init` for building
4. or `gulp serve` for preview

After build, here’s what the project folder looks like:

//TODO: insert project tree hear.

## /bower_components

Contains all bower packages and third party dependencies
(HTML/CSS/JS/Images/etc)

To install dependencies, run `bower install --save package-name` to get the files, then add a `script` or `style` tag to your `index.html` or another appropriate place.

## /node_modules

If you are familiar with node, this should be straight forward, a folder containing all node package modules

## /www

All generated Site files are placed hear ready to be deployed

## [/docs](https://github.com/phaneendra/web-assembler/tree/master/docs)

Documentation on how to develop and use web-assembler.

## [/src/content](https://github.com/phaneendra/web-assembler/blob/master/src/content)

Source folder is where you can put your content. Markdown and HTML files will be processed and put into www folder, while other files will simply be copied.

## [/src/data/site.yml](https://github.com/phaneendra/web-assembler/blob/master/src/data/site.yml)

Site configuration file. You can configure most options here.

## [/src/themes](https://github.com/phaneendra/web-assembler/blob/master/src/themes)

Theme folder, files will be generated based on the theme.

## [/package.json](https://github.com/phaneendra/web-assembler/blob/master/package.json)

Global settings and configuration file for this repo.

## [/gulpfile.js](https://github.com/phaneendra/web-assembler/blob/master/gulpfile.js)

Please see our gulpfile.js for up to date information on what we support.

1. CSS Autoprefixing
2. Built-in preview server with livereload with browsersync nodemon and expressjs
3. Automatically compile less files
4. Automatically lint your scripts
5. Awesome image optimization
6. Automatically wire-up dependencies installed with Bower (when gulp watch or gulp wiredep)
//TODO: Update this list

For more information on what this generator can do for you, take a look at the gulp plugins used in our package.json.
