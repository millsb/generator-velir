'use strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash'),
    radar = require('./radar'),
    tasks = require('./tasks');

var dest = {
    styles: 'web/Website/styles',
    js: 'web/Website/js',
    gulp: 'tools/gulp',
    vendor: 'web/Website/vendor',
    assets: 'web/Website/assets',
    html: 'web/Website/html_templates',
    patternlab: 'web/Website/html_templates/lab'
};

module.exports = generators.Base.extend({

    initializing: {},

    prompting: function () {
        var done = this.async();

        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project?',
                default: 'velirapp'
            },
            {
                type: 'confirm',
                name: 'patternlab',
                message: 'Use Pattern Lab?',
                default: false
            },
            {
                type: 'checkbox',
                name: 'frameworks',
                message: 'Choose javascript frameworks to include',
                choices: radar.choices('frameworks')
            },
            {
                type: 'checkbox',
                name: 'libs',
                message: 'Choose other javascript libraries to include',
                choices: radar.choices('libs')
            },
            {
                type: 'checkbox',
                name: 'tasks',
                message: 'Which gulp tasks would you like to install?',
                choices: tasks
            }
        ];

        this.prompt(prompts, function (answers) {
            this.name = answers.name;
            this.patternlab = answers.patternlab;
            this.gulp = answers.gulp;
            this.libs = answers.libs;
            this.frameworks = answers.frameworks;
            this.tasks = answers.tasks;

            done();

        }.bind(this));
    },

    writing: {
        styles: function () {
            var topFile = this.templatePath('styles/project.scss');
            var otherFiles = this.templatePath('styles/project/**/*.scss');
            var destFolder = dest.styles + "/" +  this.name;

            this.fs.copyTpl(
                topFile,
                this.destinationPath(destFolder + "/" + this.name + '.scss'),
                {
                    name: this.name,
                    libs: this.libs
                });

            this.fs.copy(otherFiles, destFolder);
        },

        html: function () {
            this.fs.copyTpl(this.templatePath('html/index.html'),
                            this.destinationPath(dest.html + '/index.html'),
                            {name: this.name, libs: this.libs, frameworks: this.frameworks });
        },

        js: function() {
            this.fs.copyTpl(this.templatePath('js/main.js'),
                            this.destinationPath('web/Website/js/main.js'), {});
        },

        bower: function() {
            this.composeWith('velir:bower', {
                options: {
                    name: this.name,
                    libs: this.libs,
                    frameworks: this.frameworks,
                    destPath: dest.vendor
                }}
             );
        },

        settings: function () {
            this.copy('gitignore', '.gitignore');
            this.copy('bowerrc', '.bowerrc');
            this.copy('js/jshintrc', 'web/Website/js/.jshintrc');
        },

        gulp: function() {
            this.composeWith('velir:gulp', {
                options: {
                    name: this.name,
                    destPath: dest.gulp,
                    tasks: this.tasks
                }
            });
        },

        patternlab: function() {
            if (this.patternlab) {
                this.composeWith('velir:patternlab', { options: {
                    tasks: this.tasks,
                    dest: dest.patternlab
                }});
            }
        }
    }
});
