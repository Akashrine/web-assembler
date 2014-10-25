/*
 * Generated on 2014-09-13
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bower', 'wiredep']
      },
      styles: {
        files: ['<%= config.src %>/assets/less/**/*.less'],
        tasks: ['less:dist']
      },
      js: {
        files: ['<%= config.src %>/assets/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/**/*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.dist %>'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.src %>/assets/**/*.js'
      ]
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/assets/css',
          src: '**/*.css',
          dest: '<%= config.dist %>/assets/css'
        }]
      }
    },

    less: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/assets/less/',
          src: ['importer.less'],
          dest: '<%= config.dist %>/assets/css/',
          ext: '.css'
        }]
      }
    },

    assemble: {
      options: {
        flatten: true,
        expand: true,

        // Templates and data
        layoutdir: '<%= config.src %>/templates/layouts',
        layout: 'default.hbs',
        data: '<%= config.src %>/data/*.{json,yml}',
        partials: '<%= config.src %>/templates/partials/*.hbs',

        // Site variables
        assets: '<%= config.dist %>/assets',
        collections: [{
          name: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }]
      },

      // Generate posts by forcing Handlebars
      // to recognize `.md` files as templates.
      posts: {
        options: {
          flatten: false,
          engine: 'handlebars',
          layout: 'blog.hbs',
        },
        files: [{
          expand: true,
          cwd: '<%= config.src %>/content/',
          ext: '.html',
          src: '**/*.md',
          dest: '<%= config.dist %>/'
        },{
          expand: true,
          cwd: '<%= config.src %>/templates/pages',
          ext: '.html',
          src: '**/*.hbs',
          dest: '<%= config.dist %>/'
        }]
      }
    },

    bower: {
      install: {
        options: {
          targetDir: '<%= config.dist %>/assets/lib',
          layout: function(type, component, source) {
            var re = new RegExp("(.*)\\\/"+component +"\\\/(.*)");
            var newpath = source.replace(re, "$2");
            newpath = newpath.substring(0, newpath.lastIndexOf('/'));
            return path.join(component, newpath);
          },
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },

    wiredep: {
      app: {
        ignorePath: /^<%= config.app %>\/|\.\.\/\.\.\/\.\.\/bower_components\//,
        src: ['<%= assemble.options.layoutdir %>/*.hbs'],
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
          }
        }
      }
    },

    copy: {
      dist: {
        expand: true,
        cwd: '<%= config.src %>/assets/',
        src: ['**/*.!(coffee|less)'],
        dest: '<%= config.dist %>/assets'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:<%= pkg.author.name %>/phaneendra.github.com.git',
          branch: 'master'
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      }
    }

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('serve', [
    'build',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'buildcontrol:pages'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'less',
    'wiredep',
    'bower:install',
    'newer:copy:dist',
    'autoprefixer',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

};
