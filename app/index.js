'use strict';

var yeoman  = require('yeoman-generator'),
    chalk   = require('chalk'),
    path    = require('path'),
    _       = require('lodash'),
    radar   = require('./radar');

var generator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },

  initializing: {
  },

  prompting: function() {
    var done = this.async();

    var prompts = [
      {
        type    : 'input',
        name    : 'name',
        message : 'What is the name of your project?',
        default : 'velirapp'
      },
      {
        type    : 'confirm',
        name    : 'sitecore',
        message : 'Is this a Sitecore project?'
      },
      {
        type    : 'list',
        name    : 'buildTool',
        message : 'Choose a build tool',
        choices : radar.build
      },
      {
        type    : 'list',
        name    : 'jsModules',
        message : 'Choose a module system',
        choices : radar.modules
      },
      {
        type    : 'checkbox',
        name    : 'jsFrameworks',
        message : 'Choose javascript frameworks to include',
        choices : radar.frameworks
      },
      {
        type    : 'checkbox',
        name    : 'jsLibs',
        message : 'Choose other javascript libraries to include',
        choices : radar.libs
      },
      {
        type: 'confirm',
        name: 'jsTests',
        message: 'Include JS unit testing?'
      }
    ];

    this.prompt(prompts, function(answers) {
      this.name = answers.name;
      this.sitecore = answers.sitecore;
      this.buildTool = answers.buildTool;
      this.jsModules = answers.jsModules;
      this.jsFrameworks = answers.jsFrameworks;
      this.jsLibs = answers.jsLibs;
      this.jsTests = answers.jsTests;

      if (this.sitecore) {
        this.webRoot = function(path) {
          return this.destinationPath("/web/Website/" + path);
        }.bind(this);
      } else {
        this.webRoot = function(path) {
          return this.desintationPath(path);
        }.bind(this);
      }

      done();

    }.bind(this));
  },

  writing: {
     stylesheets: function() {
        this.fs.copyTpl(this.templatePath('project.scss'), this._webRoot('styles/scss/project.scss'));
      },

      bower: function() {
        var bower = {
          name: this.name,
          private: true,
          dependencies: {}
        };

        if (this.jsModules == 'requirejs') {
          bower.dependencies.requirejs = radar.getVersion('requirejs');
        }

        this.jsFrameworks.forEach(function(lib) {
          bower.dependencies[lib] = radar.getVersion(lib);
        });

        this.jsLibs.forEach(function(lib) {
          bower.dependencies[lib] = radar.getVersion(lib);
        });

        this.fs.write(this.webRoot('bower.json'), JSON.stringify(bower, null, 2));
      }
  },

  install: {
    deps: function() {
      // change working directory in order to install deps
      var oldDir = process.cwd();
      var newDir = path.join(this._webRoot(''));
      process.chdir(newDir);

      this.bowerInstall(null, { verbose: true }, function() {
        // change it back
        process.chdir(oldDir);
      });

    }
  },


  _webRoot: function(path) {
    if (this.sitecore) {
      path = "/web/Website/" + path;
    }

    return this.destinationPath(path);
  }

}).bind(this);

module.exports = generator;

