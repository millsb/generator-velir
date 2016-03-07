'use strict';

var generators = require('yeoman-generator'),
	chalk = require('chalk'),
	path = require('path'),
	_ = require('lodash'),
	radar = require('./radar');

var dest = {
	styles: 'web/Website/styles',
	js: 'web/Website/js',
	gulp: 'tools/gulp',
	vendor: 'web/Website/vendor',
	assets: 'web/Website/assets'
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
				name: 'useGulp',
				message: 'Use gulp?',
				default: true
			},
			{
				type: 'confirm',
				name: 'patternlab',
				message: 'Use Pattern Lab?',
				default: false
			},
			{
				type: 'checkbox',
				name: 'jsFrameworks',
				message: 'Choose javascript frameworks to include',
				choices: radar.choices('frameworks')
			},
			{
				type: 'checkbox',
				name: 'jsLibs',
				message: 'Choose other javascript libraries to include',
				choices: radar.choices('libs')
			}
		];

		this.prompt(prompts, function (answers) {
			this.name = answers.name;
			this.jsFrameworks = answers.jsFrameworks || [];
			this.jsLibs = answers.jsLibs;
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
				this.templatePath(topFile),
				this.destinationPath(dest.styles + '/' + this.name + '.scss'),
				{
					name: this.name,
					neat: this.jsLibs.hasOwnProperty('neat'),
					bourbon: this.jsLibs.hasOwnProperty('bourbon')
				});

			var destFolder = 'web/Website/styles/' + this.name;
			this.fs.copy(otherFiles, destFolder);
		},

		html: function () {
			this.fs.copyTpl(this.templatePath('html/index.html'),
				this.destinationPath('web/Website/html_templates/index.html'),
				this);
		},

		bower: function () {
			var bower = {
				name: this.name,
				private: true,
				dependencies: {}
			};

			this.jsFrameworks.forEach(function (lib) {
				bower.dependencies[lib] = radar.getVersion(lib);
			});

			this.jsLibs.forEach(function (lib) {
				bower.dependencies[lib] = radar.getVersion(lib);
			});

			this.fs.write('web/Website/vendor/bower.json', JSON.stringify(bower, null, 2));
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
		}
	},

	install: function () {
		var vendorDir = this.destinationPath(dest.vendor);
		this.spawnCommand('bower', ['install'], {cwd: vendorDir});
	}

});

