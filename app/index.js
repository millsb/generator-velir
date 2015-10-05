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
				name: 'patternlibrary',
				message: 'Use the Velir Pattern Library?',
				default: false
			},
			{
				when: function(response) {
					return !response.patternlibrary;
				},
				type: 'confirm',
				name: 'patternlab',
				message: 'Use an empty Pattern Lab?',
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
			this.patternlibrary = answers.patternlibrary;

			done();

		}.bind(this));
	},

	writing: {
		styles: function () {
			var topFile;
			var otherFiles;

			if (this.patternlibrary) {
				topFile = this.templatePath('patternlibrary/styles/patternlibrary.scss');
				otherFiles = this.templatePath('patternlibrary/styles/patternlibrary/**/*.scss');
			} else  {
				topFile = this.templatePath('styles/project.scss');
				otherFiles = this.templatePath('styles/project/**/*.scss');
			}

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

		patternLibrary: function() {
			if (this.patternlibrary) {
				this.fs.copy(this.templatePath('patternlibrary/**/*'),
					this.destinationPath('web/Website/html_templates/lab'));
			}
		},

		patternLab: function() {
			if (!this.patternlibrary && this.patternlab) {
				this.fs.copy(this.templatePath('patternlab/**/*'),
					this.destinationPath('web/Website/html_templates/lab'));
			}
		},


		gulp: function () {
			// copy config template
			this.fs.copyTpl(this.templatePath('gulp/local.js'),
				this.destinationPath('tools/gulp/local.js'),
				{ projectName: this.name});

			// copy normal files
			this.fs.copy(this.templatePath('gulp/**/*'),
				this.destinationPath('tools/gulp'), { ignore: '_local.js'});

			// copy dotfiles
			this.fs.copy(this.templatePath('gulp/**/.*'),
				this.destinationPath('tools/gulp'));

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
		}
	},

	install: function () {
		//this.bowerInstall();
	},

	end: function () {
		// do an npm install in the gulp dir
		//var gulpDir = path.join(__dirname, "tools/gulp");
		//this.spawnCommand('npm', ['install'], {cwd: gulpDir});
	}
});

