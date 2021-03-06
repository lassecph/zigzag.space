// Configuration for Wiredep task(s)
// Injects Bower packages into your source code.
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('wiredep', {
    app: {
      options: {
        ignorePath: /client\/|\.\.\//g,
        // Make sure everything has an absolute path (starts with '/')
        fileTypes: {
          swig: {
            block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
            detect: {
              js: /<script.*src=['"]([^'"]+)/gi,
              css: /<link.*href=['"]([^'"]+)/gi
            },
            replace: {
              js: '<script src="/{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/{{filePath}}" />'
            }
          }
        },
        // packages to ignore
        exclude: [
          'client',
          'server',
          'dist',
        ],
        overrides: {
        }
      },
      src: [
        // '<%= yeogurt.server %>/templates/layouts/base.swig'
      ]
    },
    styles: {
      src: ['<%= yeogurt.client %>/styles/**/*.{scss,sass}'],
      ignorePath: /client/g,
    }
  });

};

module.exports = taskConfig;
