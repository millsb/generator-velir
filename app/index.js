'use strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash'),
    radar = require('./../bower/radar');

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
                type: 'confirm',
                name: 'neat',
                message: 'Use Bourbon/Neat for grids?',
                default: false
            }
        ];

        this.prompt(prompts, function (answers) {
            this.name = answers.name;
            this.neat = answers.neat;
            this.patternlab = answers.patternlab;
            this.useGulp = answers.useGulp;

            done();

        }.bind(this));
    },

    writing: {
        styles: function () {
            var topFile = this.templatePath('styles/project.scss');
            var otherFiles = this.templatePath('styles/project/**/*.scss');

            this.fs.copyTpl(
                topFile,
                this.destinationPath(dest.styles + '/' + this.name + '.scss'),
                {
                    name: this.name,
                    bourbon: this.neat,
                    neat: this.neat,
                });

            var destFolder = dest.styles + "/" +  this.name;
            this.fs.copy(otherFiles, destFolder);
        },

        html: function () {
            this.fs.copyTpl(this.templatePath('html/index.html'),
                            this.destinationPath(dest.html + '/index.html'),
                            {name: this.name, jsLibs: { modernizr: false }});
        },

        js: function() {
            this.fs.copyTpl(this.templatePath('js/main.js'),
                            this.destinationPath('web/Website/js/main.js'), {});
        },

        bower: function() {
            this.composeWith('velir:bower', { options: {
                name: this.name,
                vendorDir: this.destinationPath(dest.vendor)
            }} );
        },

        settings: function () {
            this.copy('gitignore', '.gitignore');
            this.copy('bowerrc', '.bowerrc');
            this.copy('js/jshintrc', 'web/Website/js/.jshintrc');
        },

        gulp: function() {
            this.composeWith('velir:gulp', { options: {
                dest: dest.gulp,
                projectName: this.name
            }});
        },

        patternlab: function() {
            this.composeWith('velir:patternlab', { options: {
                dest: dest.patternlab,
                name: this.name
            }});
        }
    }
});
