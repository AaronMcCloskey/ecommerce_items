module.exports = function(grunt) {

var pkg = require('./package.json');

grunt.initConfig({

  buildcontrol: {
    options: {
      dir: 'dist',
      commit: true,
      push: true,
      message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
    },
    pages: {
      options: {
        remote: 'https://github.com/AaronMcCloskey/ecommerce_items.git',
        branch: 'gh-pages'
      }
    },
    heroku: {
      options: {
        remote: 'git@heroku.com:example-heroku-webapp-1988.git',
        branch: 'master',
        tag: pkg.version
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

    grunt.loadNpmTasks('grunt-build-control');
};