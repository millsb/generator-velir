'use strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash'),
    mkdirp = require('mkdirp'),
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

        html: function () {
            this.composeWith('velir:html', {
                options: {
                    name: this.name,
                    libs: this.libs,
                    frameworks: this.frameworks,
                    destPath: dest.html
                }
            });
        },

        assets: function() {
            var destFolder = this.destinationPath(dest.assets);
            mkdirp(path.join(destFolder, '/img'));
        },

        styles: function() {
            this.composeWith('velir:styles', {
                options: {
                    name: this.name,
                    libs: this.libs,
                    destPath: dest.styles
                }
            })
        },

        js: function() {
            this.composeWith('velir:js', {
                options: {
                    destPath: dest.js
                }
            });
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
                    name: this.name,
                    tasks: this.tasks,
                    dest: dest.patternlab
                }});
            }
        }
    }
});
